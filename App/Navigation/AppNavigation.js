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
    Main: { screen: MainStack }
  },
  {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'LoginScreen'
  }
)

export default createAppContainer(RootStack)
