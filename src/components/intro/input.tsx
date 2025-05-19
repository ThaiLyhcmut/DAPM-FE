import { KeyboardTypeOptions, Text, TextInput, TouchableOpacity, View } from "react-native"
import { introStyles } from "../../styles/intro"

interface InputProps {
  text: string;
  placeholder: string,
  keyboardType: KeyboardTypeOptions | undefined
}

export const Input = ({ text, placeholder, keyboardType }: InputProps) => {
  return (
    <>
      <Text style={introStyles.label}>{text}</Text>
      <TextInput
        style={introStyles.input}
        placeholder={placeholder}
        keyboardType={keyboardType}
        placeholderTextColor="#9CA3AF"
      />
    </>
  )
}

import Ionicons from 'react-native-vector-icons/Ionicons';
import { useState } from "react";
interface PasswordProps {
  text: string;
}

export const Password = ({ text }: PasswordProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <Text style={introStyles.label}>{text}</Text>
      <View style={introStyles.passwordContainer}>
        <TextInput
          style={introStyles.passwordInput}
          placeholder="********"
          secureTextEntry={!showPassword}
          placeholderTextColor="#9CA3AF"
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={20} color="#4B5563" />
        </TouchableOpacity>
      </View>
    </>
  )
}

export const Otp = () => {
  const [otp, setOtp] = useState(['', '', '', '']);

  const handleNumberPress = (number: string) => {
    const newOtp = [...otp];
    const emptyIndex = newOtp.findIndex((digit) => digit === '');
    if (emptyIndex !== -1) {
      newOtp[emptyIndex] = number;
      setOtp(newOtp);
    }
  };

  const handleDeletePress = () => {
    const newOtp = [...otp];
    const lastFilledIndex = newOtp.slice().reverse().findIndex((digit) => digit !== '');
    const indexToClear = lastFilledIndex !== -1 ? 3 - lastFilledIndex : -1;
    if (indexToClear !== -1) {
      newOtp[indexToClear] = '';
      setOtp(newOtp);
    }
  };

  return (
    <>
      <View style={introStyles.otpContainer}>
        {otp.map((digit, index) => (
          <View key={index} style={introStyles.Box}>
            <Text style={introStyles.otpText}>{digit}</Text>
          </View>
        ))}
      </View>

      {/* Number Pad */}
      <View style={introStyles.numberPad}>
        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].map((number) => (
          <TouchableOpacity
            key={number}
            style={introStyles.numberButton}
            onPress={() => handleNumberPress(number)}
          >
            <Text style={introStyles.numberText}>{number}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={introStyles.numberButton} onPress={handleDeletePress}>
          <Text style={introStyles.numberText}>⌫</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};