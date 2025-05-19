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

export const Comfirm = () => {
  return (
    <SafeAreaView style={introStyles.container}>
      <View style={introStyles.Box}>
        {/* Header */}
        <Header text='Create account'/>

        <View style={introStyles.mainOtp}>
          {/* Instruction Text */}
          
          <Password text='Password '/>

          <Password text='Password confirm  '/>

          {/* Sign Up Button */}
          <TouchableOpacity style={introStyles.signUpButton}>
            <Text style={introStyles.signUpButtonText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
