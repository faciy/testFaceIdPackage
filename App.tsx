import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, TextInput, StyleSheet } from 'react-native';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';
import * as Keychain from 'react-native-keychain';

const App = () => {
  const [biometryType, setBiometryType] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const rnBiometrics = new ReactNativeBiometrics();

  // Vérifier si l'utilisateur a déjà enregistré ses identifiants pour Face ID
  const checkBiometricCredentials = async () => {
    try {
      const credentials = await Keychain.getGenericPassword('userCredentials');
      if (credentials) {
        return JSON.parse(credentials.password);
      }
      return null;
    } catch (error) {
      console.error('Erreur lors de la vérification des identifiants:', error);
      return null;
    }
  };

  // Authentification avec Face ID
  const handleBiometricAuth = async () => {
    try {
      const { success } = await rnBiometrics.simplePrompt({
        promptMessage: 'Confirmez votre identité',
        cancelButtonText: 'Annuler'
      });

      if (success) {
        const savedCredentials = await checkBiometricCredentials();
        if (savedCredentials) {
          // Authentification avec les identifiants sauvegardés
          const response = await loginUser(savedCredentials.email, savedCredentials.password);
          if (response.token) {
            await Keychain.setGenericPassword('authToken', response.token);
            setIsAuthenticated(true);
          }
        } else {
          Alert.alert('Erreur', 'Aucun identifiant enregistré pour Face ID');
          setShowLoginForm(true);
        }
      }
    } catch (error) {
      Alert.alert('Erreur', 'Échec de l\'authentification biométrique');
      setShowLoginForm(true);
    }
  };

  // Authentification classique
  const handleLogin = async () => {
    try {
      const response = await loginUser(email, password);
      if (response.token) {
        await Keychain.setGenericPassword('authToken', response.token);
        setIsAuthenticated(true);

        // Demander à l'utilisateur s'il veut enregistrer ses identifiants pour Face ID
        if (biometryType) {
          Alert.alert(
            'Face ID',
            'Voulez-vous enregistrer vos identifiants pour Face ID ?',
            [
              {
                text: 'Non',
                style: 'cancel'
              },
              {
                text: 'Oui',
                onPress: async () => {
                  await Keychain.setGenericPassword(
                    'userCredentials',
                    JSON.stringify({ email, password }),
                    {
                      accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY,
                      accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED
                    }
                  );
                  Alert.alert('Succès', 'Identifiants enregistrés pour Face ID');
                }
              }
            ]
          );
        }
      }
    } catch (error) {
      Alert.alert('Erreur', 'Échec de la connexion');
    }
  };

  // Fonction de connexion à l'API
  const loginUser = async (email: string, password: string) => {
    try {
      const response = await fetch('VOTRE_URL_API/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      return await response.json();
    } catch (error) {
      throw new Error('Erreur de connexion');
    }
  };

  useEffect(() => {
    const checkBiometrics = async () => {
      try {
        const { biometryType } = await rnBiometrics.isSensorAvailable();
        setBiometryType(biometryType || null);
        
        // Vérifier si l'utilisateur a déjà un token
        const token = await Keychain.getGenericPassword('authToken');
        if (!token) {
          // Si pas de token, proposer Face ID si disponible
          if (biometryType) {
            handleBiometricAuth();
          } else {
            setShowLoginForm(true);
          }
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Erreur lors de la vérification biométrique:', error);
        setShowLoginForm(true);
      }
    };

    checkBiometrics();
  }, []);

  if (isAuthenticated) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Bienvenue !</Text>
        <TouchableOpacity 
          style={styles.button}
          onPress={async () => {
            await Keychain.resetGenericPassword();
            setIsAuthenticated(false);
            setShowLoginForm(true);
          }}
        >
          <Text style={styles.buttonText}>Déconnexion</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!showLoginForm) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Authentification</Text>
        <TouchableOpacity 
          style={styles.button}
          onPress={handleBiometricAuth}
        >
          <Text style={styles.buttonText}>
            S'authentifier avec Face ID
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, styles.secondaryButton]}
          onPress={() => setShowLoginForm(true)}
        >
          <Text style={styles.buttonText}>
            Se connecter avec identifiants
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity 
        style={styles.button}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>
      {biometryType && (
        <TouchableOpacity 
          style={[styles.button, styles.secondaryButton]}
          onPress={() => setShowLoginForm(false)}
        >
          <Text style={styles.buttonText}>
            Utiliser Face ID
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    marginBottom: 10,
  },
  secondaryButton: {
    backgroundColor: '#5856D6',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default App;
