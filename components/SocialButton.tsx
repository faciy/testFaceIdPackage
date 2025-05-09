import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

type SocialButtonProps = {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
};

const SocialButton = ({ icon, label, onPress, style, textStyle }: SocialButtonProps) => (
  <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
    {icon}
    <Text style={[styles.text, textStyle, { marginLeft: 8 }]}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#fafafa',
    flex: 1,
    marginHorizontal: 4,
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: '#222',
  },
});

export default SocialButton; 