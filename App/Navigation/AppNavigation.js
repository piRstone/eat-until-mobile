import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation'

import LoginScreen from '../Containers/LoginScreen'
import ListsScreen from '../Containers/ListsScreen'
import ProductsScreen from '../Containers/ProductsScreen'

const MainStack = createStackNavigator({
  ListsScreen: { screen: ListsScreen },
  ProductsScreen: { screen: ProductsScreen }
}, {
  initialRouteName: 'ListsScreen',
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
