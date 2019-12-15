import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation'

import LoginScreen from '../Containers/LoginScreen'
import HomeScreen from '../Containers/HomeScreen'

const MainStack = createStackNavigator(
  {
    HomeScreen: { screen: HomeScreen }
  },
  {
    initialRouteName: 'HomeScreen'
  }
)

const RootStack = createSwitchNavigator(
  {
    LoginScreen: { screen: LoginScreen },
    Main: { screen: HomeScreen }
  },
  {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'Main'
  }
)

export default createAppContainer(RootStack)
