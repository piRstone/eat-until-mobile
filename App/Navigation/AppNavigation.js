import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from '../Containers/SplashScreen';
import Onboarding from '../Containers/Onboarding';
import LoginScreen from '../Containers/LoginScreen';
import ListsScreen from '../Containers/ListsScreen';
import ProductsScreen from '../Containers/ProductsScreen';
import ForgotPasswordScreen from '../Containers/ForgotPasswordScreen';
import CameraScreen from '../Containers/CameraScreen';
import ProfileScreen from '../Containers/ProfileScreen';
import ProfileFormScreen from '../Containers/ProfileFormScreen';
import RegisterScreen from '../Containers/RegisterScreen';
import RegisterSuccessScreen from '../Containers/RegisterSuccessScreen';
import EULAScreen from '../Containers/EULAScreen';
import ActivationScreen from '../Containers/ActivationScreen';

const Stack = createStackNavigator();

export const SplashScreenStack = () => (
  <Stack.Navigator
    initialRouteName="SplashScreen"
    screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SplashScreen" component={SplashScreen} />
  </Stack.Navigator>
);

export const OnboardingStack = () => (
  <Stack.Navigator
    initialRouteName="Onboarding"
    screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Onboarding" component={Onboarding} />
  </Stack.Navigator>
);

export const MainStack = () => (
  <Stack.Navigator
    initialRouteName="ListsScreen"
    screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ListsScreen" component={ListsScreen} />
    <Stack.Screen name="ProductsScreen" component={ProductsScreen} />
    <Stack.Screen name="CameraScreen" component={CameraScreen} />
    <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    <Stack.Screen name="ProfileFormScreen" component={ProfileFormScreen} />
    <Stack.Screen name="EULAScreen" component={EULAScreen} />
  </Stack.Navigator>
);

const RegisterStack = () => (
  <Stack.Navigator
    initialRouteName="RegisterScreen"
    screenOptions={{ headerShown: false }}>
    <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
    <Stack.Screen
      name="RegisterSuccessScreen"
      component={RegisterSuccessScreen}
    />
  </Stack.Navigator>
);

export const AuthenticationStack = () => (
  <Stack.Navigator
    initialRouteName="LoginScreen"
    screenOptions={{ headerShown: false }}>
    <Stack.Screen name="LoginScreen" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterStack} />
    <Stack.Screen
      name="ForgotPasswordScreen"
      component={ForgotPasswordScreen}
    />
    <Stack.Screen name="AuthEULAScreen" component={EULAScreen} />
    <Stack.Screen name="ActivationScreen" component={ActivationScreen} />
  </Stack.Navigator>
);
