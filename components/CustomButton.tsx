import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

type CustomButtonProps = {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  children?: React.ReactNode;
};

const CustomButton = ({ title, onPress, style, textStyle, children }: CustomButtonProps) => (
  <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
    {children ? children : <Text style={[styles.text, textStyle]}>{title}</Text>}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FFC107',
    borderRadius: 32,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 18,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
});

export default CustomButton; 