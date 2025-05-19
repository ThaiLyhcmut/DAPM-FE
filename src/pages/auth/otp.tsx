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
import { Otp } from '../../components/intro/input';

interface OtpProps {
  phone: string //+994 (50) **** 67 
}

export const OTPScreen = ({phone}: OtpProps) => {
  return (
    <SafeAreaView style={introStyles.container}>
      <View style={introStyles.Box}>
        {/* Header */}
        <Header text='Create account'/>

        <View style={introStyles.mainOtp}>
          {/* Instruction Text */}
          <Text style={introStyles.instructionText}>
            Please, enter the OTP code sent to
          </Text>
          <Text style={introStyles.phoneText}>{phone}</Text>

          <Otp/>

          {/* Resend Link */}
          <Text style={introStyles.resendText}>Resend</Text>

          {/* Sign Up Button */}
          <TouchableOpacity style={introStyles.signUpButton}>
            <Text style={introStyles.signUpButtonText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
