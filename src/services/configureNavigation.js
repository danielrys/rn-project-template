import { createStackNavigator } from "react-navigation"
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
  createNavigationReducer,
} from "react-navigation-redux-helpers"
import { connect } from "react-redux"

// screens
import LoginScreen from "../screens/LoginScreen"

const AppRouteConfigs = {
  Login: {
    screen: LoginScreen,
  },
}

const AppNavigator = createStackNavigator(AppRouteConfigs)

export const navReducer = createNavigationReducer(AppNavigator)
export const navMiddleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav,
)
const App = reduxifyNavigator(AppNavigator, "root")
const mapStateToProps = state => ({
  state: state.nav,
})

const AppWithNavigationState = connect(mapStateToProps)(App)

export default AppWithNavigationState
