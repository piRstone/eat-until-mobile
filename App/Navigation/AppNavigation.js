import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer,
} from 'react-navigation';

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
  },
  {
    initialRouteName: 'ListsScreen',
    headerMode: 'none',
  },
);

const AuthenticationStack = createStackNavigator(
  {
    LoginScreen: { screen: LoginScreen },
    RegisterScreen: { screen: RegisterScreen },
    RegisterSuccessScreen: {
      screen: RegisterSuccessScreen,
      navigationOptions: { gesturesEnabled: false },
    },
    ForgotPasswordScreen: { screen: ForgotPasswordScreen },
    EULAScreen: { screen: EULAScreen },
    ActivationScreen: { screen: ActivationScreen, path: 'activation' },
  },
  {
    initialRouteName: 'LoginScreen',
    headerMode: 'none',
  },
);

const RootStack = createSwitchNavigator(
  {
    AuthStack: { screen: AuthenticationStack },
    Main: { screen: MainStack },
  },
  {
    headerMode: 'none',
    initialRouteName: 'Main',
  },
);

export default createAppContainer(RootStack);
