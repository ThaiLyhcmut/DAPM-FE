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

export default function CreateAccountScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  return (
    <SafeAreaView style={introStyles.container}>
      <View style={introStyles.Box}>
        {/* Header */}
        <Header text='Create account'/>

        <View style={introStyles.main}>
          {/* Email */}
          <Input text='Email' placeholder='melissa@gmail.com' keyboardType='email-address'/>

          {/* Password */}
          <Password text='Password'/>

          {/* Password Confirm */}
          <Password text='Password confirm'/>

          {/* Phone Number */}
          <Input text='Phone number' placeholder='0123456789' keyboardType='phone-pad'/>


          {/* Address */}
          <Input text='Address' placeholder='Thu duc, TP Ho Chi Minh, Viet Nam' keyboardType={undefined}/>

          {/* Continue Button */}
          <TouchableOpacity style={introStyles.Button}>
            <Text style={introStyles.ButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
