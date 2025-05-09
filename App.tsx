import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CustomButton from './components/CustomButton';
import CustomInput from './components/CustomInput';
import SocialButton from './components/SocialButton';
import { useForm, Controller } from 'react-hook-form';

const App = () => {
  const [tab, setTab] = useState<'email' | 'phone'>('email');
  const [showReferral, setShowReferral] = useState(false);

  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      email: '',
      phone: '',
      referral: '',
    },
  });

  const onSubmit = (data: any) => {
    // Traitement des données du formulaire
    console.log(data);
    reset();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <TouchableOpacity style={styles.closeBtn}>
        <Text style={{ fontSize: 28 }}>×</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Créer un compte</Text>
      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity onPress={() => setTab('email')} style={[styles.tab, tab === 'email' && styles.tabActive]}>
          <Text style={[styles.tabText, tab === 'email' && styles.tabTextActive]}>Adresse email</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTab('phone')} style={[styles.tab, tab === 'phone' && styles.tabActive]}>
          <Text style={[styles.tabText, tab === 'phone' && styles.tabTextActive]}>Numéro de téléphone</Text>
        </TouchableOpacity>
      </View>
      {/* Input */}
      {tab === 'email' ? (
        <>
          <Controller
            control={control}
            name="email"
            rules={{
              required: 'Email requis',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Format email invalide',
              },
            }}
            render={({ field: { onChange, value } }) => (
              <CustomInput
                placeholder="Saisisser votre email"
                value={value}
                onChangeText={onChange}
                keyboardType="email-address"
              />
            )}
          />
          {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
        </>
      ) : (
        <>
          <Controller
            control={control}
            name="phone"
            rules={{
              required: 'Numéro requis',
              pattern: {
                value: /^\+?\d{7,15}$/,
                message: 'Format numéro invalide',
              },
            }}
            render={({ field: { onChange, value } }) => (
              <CustomInput
                placeholder="Saisisser votre numéro"
                value={value}
                onChangeText={onChange}
                keyboardType="phone-pad"
              />
            )}
          />
          {errors.phone && <Text style={styles.error}>{errors.phone.message}</Text>}
        </>
      )}
      {/* Parrainage */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <Text>Avez vous un code de parrainage ? </Text>
        {!showReferral ? (
          <TouchableOpacity onPress={() => setShowReferral(true)}>
            <Text style={{ color: '#FFC107', fontWeight: 'bold' }}>Ajouter le code</Text>
          </TouchableOpacity>
        ) : (
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Controller
              control={control}
              name="referral"
              render={({ field: { onChange, value } }) => (
                <CustomInput
                  placeholder="Code de parrainage"
                  value={value}
                  onChangeText={onChange}
                  style={{ height: 35 }}
                />
              )}
            />
          </View>
        )}
      </View>
      {/* Conditions */}
      <Text style={styles.conditions}>
        En appuyant sur continuer vous acceptez les <Text style={styles.bold}>Conditions d'Utilisation</Text> et la <Text style={styles.bold}>Politique de Confidentialité.</Text>
      </Text>
      {/* Continuer */}
      <CustomButton title="Continuer" onPress={handleSubmit(onSubmit)} />
      {/* Ou avec */}
      <View style={styles.orContainer}>
        <View style={styles.line} />
        <Text style={{ marginHorizontal: 10, color: '#888' }}>ou avec</Text>
        <View style={styles.line} />
      </View>
      {/* Social Buttons */}
      <View style={styles.socialContainer}>
        <SocialButton
          icon={<Text style={styles.socialText}>G</Text>}
          label="Google"
          onPress={() => {}}
        />
        <SocialButton
          icon={<Text style={styles.socialText}></Text>}
          label="Apple"
          onPress={() => {}}
        />
      </View>
      {/* Bas */}
      <View style={styles.bottomText}>
        <Text>Vous avez un compte ? </Text>
        <TouchableOpacity>
          <Text style={{ color: '#FFC107', fontWeight: 'bold' }}>Connectez vous</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingTop: 48,
  },
  closeBtn: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 24,
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tab: {
    marginRight: 24,
    paddingBottom: 6,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: '#FFC107',
  },
  tabText: {
    fontSize: 16,
    color: '#222',
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#222',
    fontWeight: 'bold',
  },
  conditions: {
    fontSize: 13,
    color: '#222',
    marginBottom: 18,
  },
  bold: {
    fontWeight: 'bold',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#eee',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  socialText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  bottomText: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 24,
  },
  error: {
    color: 'red',
    fontSize: 13,
    marginBottom: 8,
    marginLeft: 2,
  },
});

export default App;
