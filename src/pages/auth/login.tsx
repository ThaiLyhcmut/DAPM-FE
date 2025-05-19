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
import { introStyles } from '../../styles/intro';
import { Header } from '../../components/intro/header'; 
import { Input, Password } from '../../components/intro/input';

export default function LoginScreen() {


  return (
    <SafeAreaView style={introStyles.container}>
      <View style={introStyles.Box}>
        <Header text={"login"} />

        <View style={introStyles.main}>
          <Input text={"Email"} placeholder={"melissa@gmail.com"} keyboardType={"email-address"} />
          <Password text='Password' />
          <Text style={introStyles.forgotPassword}>Forgot password ?</Text>
          <Text style={introStyles.signupText}>
            Don’t you have an account?{' '}
            <Text style={introStyles.signupLink}>Sign up</Text>
          </Text>
          <TouchableOpacity style={introStyles.Button}>
            <Text style={introStyles.ButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

