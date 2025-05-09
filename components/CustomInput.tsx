import React from 'react';
import { TextInput, StyleSheet, ViewStyle, TextStyle } from 'react-native';

type CustomInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: 'default' | 'email-address' | 'phone-pad';
  style?: ViewStyle | TextStyle;
  secureTextEntry?: boolean;
};

const CustomInput = ({ value, onChangeText, placeholder, keyboardType = 'default', style, secureTextEntry }: CustomInputProps) => (
  <TextInput
    style={[styles.input, style]}
    value={value}
    onChangeText={onChangeText}
    placeholder={placeholder}
    keyboardType={keyboardType}
    autoCapitalize="none"
    secureTextEntry={secureTextEntry}
  />
);

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    backgroundColor: '#fafafa',
    fontSize: 16,
  },
});

export default CustomInput; 