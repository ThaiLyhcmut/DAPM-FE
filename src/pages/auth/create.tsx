import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { FullWindowOverlay } from 'react-native-screens';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Header } from '../../components/intro/header'; 
import { introStyles } from '../../styles/intro';
import { Input, Password } from '../../components/intro/input';
import { useApiClient } from '../../repositories/service';
import { useNavigation } from '@react-navigation/native';

export default function CreateAccountScreen() {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const api = useApiClient()
  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      const response = await api.post('/api/auth/register', {
        name: email.split('@')[0], // Use email prefix as name
        email,
        password,
        phone,
        address,
        avatar: "<default_avatar_url>"
      });
      alert('Registration successful!');
      navigation.goBack();
    } catch (error) {
      console.error('Registration error:', error);
    }
  }
  return (
    <SafeAreaView style={introStyles.container}>
      <View style={introStyles.Box}>
        {/* Header */}

        <View style={introStyles.main}>
          {/* Email */}
          <Input text='Email' placeholder='melissa@gmail.com' keyboardType='email-address' setText={setEmail} value={email}/>

          {/* Password */}
          <Password text='Password' setText={setPassword} value={password}/>

          {/* Password Confirm */}
          <Password text='Password confirm' setText={setConfirmPassword} value={confirmPassword}/>

          {/* Phone Number */}
          <Input text='Phone number' placeholder='0123456789' keyboardType='phone-pad' setText={setPhone} value={phone}/>

          {/* Address */}
          <Input text='Address' placeholder='Thu duc, TP Ho Chi Minh, Viet Nam' keyboardType={undefined} setText={setAddress} value={address  }/>

          {/* Continue Button */}
          <TouchableOpacity style={introStyles.Button} onPress={handleRegister}>
            <Text style={introStyles.ButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
