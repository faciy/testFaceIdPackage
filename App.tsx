import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';

const App = () => {
  const [biometryType, setBiometryType] = useState<string | null>(null);
  const rnBiometrics = new ReactNativeBiometrics();

  useEffect(() => {
    const checkBiometrics = async () => {
      try {
        const { biometryType } = await rnBiometrics.isSensorAvailable();
        setBiometryType(biometryType || null);
      } catch (error) {
        console.error('Error checking biometrics:', error);
      }
    };

    checkBiometrics();
  }, []);

  const handleAuthenticate = async () => {
    try {
      const { success } = await rnBiometrics.simplePrompt({
        promptMessage: 'Confirmez votre identité',
        cancelButtonText: 'Annuler'
      });
      
      if (success) {
        Alert.alert('Succès', 'Authentification réussie !');
      }
    } catch (error) {
      Alert.alert('Erreur', 'Échec de l\'authentification');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ marginBottom: 20 }}>
        {biometryType === BiometryTypes.FaceID 
          ? 'Face ID est disponible'
          : 'Face ID n\'est pas disponible'}
      </Text>
      
      {biometryType && (
        <TouchableOpacity 
          style={{ 
            backgroundColor: '#007AFF', 
            padding: 15, 
            borderRadius: 8 
          }}
          onPress={handleAuthenticate}
        >
          <Text style={{ color: 'white', fontSize: 16 }}>
            S'authentifier avec Face ID
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default App;
