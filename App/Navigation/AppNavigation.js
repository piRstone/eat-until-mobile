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

const MainStack = createStackNavigator(
  {
    ListsScreen: { screen: ListsScreen },
    ProductsScreen: { screen: ProductsScreen },
    CameraScreen: { screen: CameraScreen },
  },
  {
    initialRouteName: 'ListsScreen',
    headerMode: 'none',
  },
);

const AuthenticationStack = createStackNavigator(
  {
    LoginScreen: { screen: LoginScreen },
    ForgotPasswordScreen: { screen: ForgotPasswordScreen },
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
