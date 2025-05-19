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
import { Input, Otp } from '../../components/intro/input';
import { ScrollView } from 'react-native-gesture-handler';

export default function ForgotScreen() {
  const [otp, setOtp] = useState(['', '', '', '']);

  return (
    <SafeAreaView style={introStyles.container}>
      <View style={introStyles.Box}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <Header text='Forget Password' />

          <View style={introStyles.main}>
            {/* Email */}
            <Input text='Email' placeholder='melissa@gmail.com' keyboardType='email-address' />

            {/* Phone Number */}
            <Input text='Phone number' placeholder='0123456789' keyboardType='phone-pad' />

            <Otp />
            

            {/* Resend Link */}
            <Text style={introStyles.resendText}>Resend</Text>

            {/* Continue Button */}
            <TouchableOpacity style={introStyles.Button}>
              <Text style={introStyles.ButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
