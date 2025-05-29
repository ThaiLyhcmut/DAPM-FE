import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { introStyles } from '../../styles/intro';
import { Header } from '../../components/intro/header'; 
import { Input, Password } from '../../components/intro/input';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFail } from '../../../actions/authActions';
import { useApiClient } from '../../repositories/service';

export default function LoginScreen() {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const api = useApiClient();
  const handleLogin = async () => {
    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      // Here you would typically make an API call
      // For now, we'll simulate a successful login
      const response:any = await api.post('/api/auth/login', { email, password });
      console.log('Login response:', response);
      dispatch(loginSuccess({ 
        ...response.data.user, 
        token: response.data.token // Assuming response.data contains user data
        // Add other user data as needed
      }));
    } catch (err: any) {
      dispatch(loginFail(err.message));
      setError('Login failed. Please try again.');
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate('Forgot');
  };

  const handleSignUp = () => {
    navigation.navigate('Create');
  };

  return (
    <SafeAreaView style={introStyles.container}>
      <View style={introStyles.Box}>
        <View style={introStyles.main}>
          <Input 
            text={"Email"} 
            placeholder={"melissa@gmail.com"} 
            keyboardType={"email-address"}
            setText={setEmail} 
            value={email}
          />
          <Password 
            text='Password'
            setText={setPassword}
            value={password}
          />
          {error ? <Text style={introStyles.errorText}>{error}</Text> : null}
          <Text 
            style={introStyles.forgotPassword}
            onPress={handleForgotPassword}
          >
            Forgot password ?
          </Text>
          <Text style={introStyles.signupText}>
            Don't you have an account?{' '}
            <Text 
              style={introStyles.signupLink}
              onPress={handleSignUp}
            >
              Sign up
            </Text>
          </Text>
          <TouchableOpacity style={introStyles.Button} onPress={handleLogin}>
            <Text style={introStyles.ButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

