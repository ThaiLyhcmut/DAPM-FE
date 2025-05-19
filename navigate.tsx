// App.tsx hoặc file navigation chính
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import type { RootState } from './reducers';

// Import các màn hình
import HomeScreen from './src/pages/home/home'; 
import PlaceScreen from './src/pages/place/place'; // Sử dụng plcae2.tsx thay vì place.tsx
import CartScreen from './src/pages/cart/cart';
import HistoryScreen from './src/pages/history/history';
import HistoryDetailScreen from './src/pages/history/detail';
import ProfileScreen from './src/pages/auth/profile';
import LoginScreen from './src/pages/auth/login'; 
import ForgotScreen from './src/pages/auth/forgot'; 
import CreateAccountScreen from './src/pages/auth/create'; 
import { ConfirmScreen } from './src/pages/auth/comfirm'; 
import { OTPScreen } from './src/pages/auth/otp'; 
import EditProfileScreen from './src/pages/auth/editProfile'; 
import PaymentScreen from './src/pages/payment/payment'; 
import CategoriesListScreen from './src/pages/categories/listDetail'; 
import CategoryDetailScreen from './src/pages/categories/detail'; 

type RootStackParamList = {
  Main: undefined;
  Payment: undefined;
  EditProfile: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Create: undefined;
  Forgot: undefined;
  Confirm: undefined;
  OTP: {
    phone: string
  };
};

export type HomeStackParamList = {
  HomeMain: undefined;
  CategoryList: undefined;
  CategoryDetail: {
    item: {
      image: string;
      name: string;
      time: string;
      rating: string;
      price: string;
    }
  };
};

type PlaceStackParamList = {
  PlaceSelection: undefined;
};

type HistoryStackParamList = {
  HistoryList: undefined;
  HistoryDetail: undefined;
};

type TabParamList = {
  Home: undefined;
  Place: undefined;
  Cart: undefined;
  History: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createStackNavigator<RootStackParamList>();
const AuthStack = createStackNavigator<AuthStackParamList>();
const HomeStack = createStackNavigator<HomeStackParamList>();
const PlaceStack = createStackNavigator<PlaceStackParamList>();
const HistoryStack = createStackNavigator<HistoryStackParamList>();

// Stack cho xác thực
function AuthStackScreen() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Create" component={CreateAccountScreen} />
      <AuthStack.Screen name="Forgot" component={ForgotScreen} />
      <AuthStack.Screen name="Confirm" component={ConfirmScreen} />
      <AuthStack.Screen name="OTP" component={OTPScreen} initialParams={{
        phone: ''
      }} />
    </AuthStack.Navigator>
  );
}

// Stack cho trang chủ
function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="HomeMain" component={HomeScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="CategoryList" component={CategoriesListScreen} />
      <HomeStack.Screen name="CategoryDetail" component={CategoryDetailScreen} />
    </HomeStack.Navigator>
  );
}

// Stack cho place
function PlaceStackScreen() {
  return (
    <PlaceStack.Navigator>
      <PlaceStack.Screen name="PlaceSelection" component={PlaceScreen} options={{ headerShown: false }} />
    </PlaceStack.Navigator>
  );
}

// Stack cho lịch sử
function HistoryStackScreen() {
  return (
    <HistoryStack.Navigator>
      <HistoryStack.Screen name="HistoryList" component={HistoryScreen} options={{ headerShown: false }} />
      <HistoryStack.Screen name="HistoryDetail" component={HistoryDetailScreen} />
    </HistoryStack.Navigator>
  );
}

// Stack chính của ứng dụng
export default function MainStack() {
  const isSignedIn = useSelector((state: RootState) => state.auth.isSignedIn);

  return (
    <>
      {isSignedIn ? (
        <Stack.Navigator>
          <Stack.Screen 
            name="Main" 
            component={MainTabs} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen name="Payment" component={PaymentScreen} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        </Stack.Navigator>
      ) : (
        <AuthStackScreen />
      )}
    </>
  );
}

// Tab bar chính
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = 'home-outline';

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Place') {
            iconName = focused ? 'location' : 'location-outline';
          } else if (route.name === 'Cart') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'History') {
            iconName = focused ? 'time' : 'time-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeStackScreen} 
        options={{ tabBarLabel: 'Trang chủ' }}
      />
      <Tab.Screen 
        name="Place" 
        component={PlaceStackScreen} 
        options={{ tabBarLabel: 'Khu vực' }}
      />
      <Tab.Screen 
        name="Cart" 
        component={CartScreen} 
        options={{ tabBarLabel: 'Giỏ hàng' }}
      />
      <Tab.Screen 
        name="History" 
        component={HistoryStackScreen} 
        options={{ tabBarLabel: 'Lịch sử' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ tabBarLabel: 'Tài khoản' }}
      />
    </Tab.Navigator>
  );
}
