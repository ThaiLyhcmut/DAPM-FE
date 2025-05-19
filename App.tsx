import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import LoginScreen from './src/pages/auth/login';
import ForgetPasswordScreen from './src/pages/auth/forgot';
import CreateAccountScreen from './src/pages/auth/create';
import { OTPScreen } from './src/pages/auth/otp';
import Home from './src/pages/home/home';
import FoodList from './src/pages/categories/listDetail';
import Cart from './src/pages/cart/cart';
import PlaceOrder from './src/pages/place/place';
import Place from './src/pages/place/plcae2';
import PaymentScreen from './src/pages/payment/payment';
import HistoryScreen from './src/pages/history/history';
import DetailScreen from './src/pages/history/detail';

const Stack = createStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        {/* <OTPScreen phone='+994 (50) **** 67' /> */}
        {/* <Home/> */}
        {/* <FoodList/> */}
        {/* <Cart/> */}
        {/* <PlaceOrder/> */}
        {/* <Place/> */}
        {/* <PaymentScreen/> */}
        {/* <HistoryScreen/> */}
        <DetailScreen/>
      </NavigationContainer>
    </GestureHandlerRootView>
  )
}