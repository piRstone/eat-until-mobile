import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation'

import LoginScreen from '../Containers/LoginScreen'
import HomeScreen from '../Containers/HomeScreen'

const MainStack = createStackNavigator({
  HomeScreen: { screen: HomeScreen }
}, {
  initialRouteName: 'HomeScreen',
  headerMode: 'none'
})

const RootStack = createSwitchNavigator({
  LoginScreen: { screen: LoginScreen },
  Main: { screen: MainStack }
}, {
  headerMode: 'none',
  initialRouteName: 'Main'
})

export default createAppContainer(RootStack)
