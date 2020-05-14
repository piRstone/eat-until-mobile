import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

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

const MainStack = createStackNavigator(
  {
    ListsScreen: { screen: ListsScreen },
    ProductsScreen: { screen: ProductsScreen },
    CameraScreen: { screen: CameraScreen },
    ProfileScreen: { screen: ProfileScreen },
    ProfileFormScreen: { screen: ProfileFormScreen },
    EULAScreen: { screen: EULAScreen },
  },
  {
    initialRouteName: 'ListsScreen',
    headerMode: 'none',
  },
);

const RegisterStack = createSwitchNavigator(
  {
    RegisterScreen: { screen: RegisterScreen },
    RegisterSuccessScreen: { screen: RegisterSuccessScreen },
  },
  {
    headerMode: 'none',
    initialRouteName: 'RegisterScreen',
  },
);

const AuthenticationStack = createStackNavigator(
  {
    LoginScreen: { screen: LoginScreen },
    Register: { screen: RegisterStack },
    ForgotPasswordScreen: { screen: ForgotPasswordScreen },
    AuthEULAScreen: { screen: EULAScreen },
    ActivationScreen: { screen: ActivationScreen, path: 'activation' },
  },
  {
    initialRouteName: 'LoginScreen',
    headerMode: 'none',
  },
);

const RootStack = createSwitchNavigator(
  {
    SplashScreen: { screen: SplashScreen },
    Onboarding: { screen: Onboarding },
    AuthStack: { screen: AuthenticationStack },
    Main: { screen: MainStack },
  },
  {
    headerMode: 'none',
    initialRouteName: 'SplashScreen',
  },
);

export default createAppContainer(RootStack);
