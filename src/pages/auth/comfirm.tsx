import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { introStyles } from '../../styles/intro';
import { Header } from '../../components/intro/header';
import { Otp, Password } from '../../components/intro/input';

export const ConfirmScreen = () => {
  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfimPassword] = useState<string>("")
  return (
    <SafeAreaView style={introStyles.container}>
      <View style={introStyles.Box}>
        {/* Header */}
        <Header text='Create account'/>

        <View style={introStyles.mainOtp}>
          {/* Instruction Text */}
          
          <Password text='Password ' setText={setPassword} value={password}/>

          <Password text='Password confirm  ' setText={setConfimPassword} value={confirmPassword}/>
 
          {/* Sign Up Button */}
          <TouchableOpacity style={introStyles.signUpButton}>
            <Text style={introStyles.signUpButtonText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
