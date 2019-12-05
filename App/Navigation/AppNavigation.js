import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import LoginScreen from '../Containers/LoginScreen'

const RootStack = createSwitchNavigator(
  {
    LoginScreen: { screen: LoginScreen }
  },
  {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'LoginScreen'
  }
)

export default createAppContainer(RootStack)
