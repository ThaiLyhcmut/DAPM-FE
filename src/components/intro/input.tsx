import { KeyboardTypeOptions, Text, TextInput, TouchableOpacity, View } from "react-native";
import { introStyles } from "../../styles/intro";
import { useState } from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';

interface InputProps {
  text: string;
  placeholder: string,
  keyboardType: KeyboardTypeOptions | undefined,
  setText: (text: string) => void
  value: any
}

export const Input = ({ text, placeholder, keyboardType, setText, value }: InputProps) => {
  return (
    <>
      <Text style={introStyles.label}>{text}</Text>
      <TextInput
        style={introStyles.input}
        placeholder={placeholder}
        keyboardType={keyboardType}
        onChangeText={(e: any) => setText(e)}
        placeholderTextColor="#9CA3AF"
        value={value}
      />
    </>
  )
}


interface PasswordProps {
  text: string;
  setText: (text: string) => void;
  value: string;
}

export const Password = ({ text, setText, value }: PasswordProps) => {
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
          onChangeText={(text) => setText(text)}
          value={value}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={20} color="#4B5563" />
        </TouchableOpacity>
      </View>
    </>
  )
}

interface OtpProps {
  onComplete?: (otp: string) => void;
}

export const Otp = ({ onComplete }: OtpProps) => {
  const [otp, setOtp] = useState(['', '', '', '']);

  const handleNumberPress = (number: string) => {
    const newOtp = [...otp];
    const emptyIndex = newOtp.findIndex((digit) => digit === '');
    if (emptyIndex !== -1) {
      newOtp[emptyIndex] = number;
      setOtp(newOtp);
      
      // Check if OTP is complete
      if (emptyIndex === 3 && onComplete) {
        const fullOtp = newOtp.join('');
        onComplete(fullOtp);
      }
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