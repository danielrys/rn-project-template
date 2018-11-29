// @flow
import "rxjs"
import React from "react"
// eslint-disable-next-line
import Expo from "expo"
import { Provider } from "react-redux"

// initialization
import configureLocalization from "./src/services/configureLocalization"
import initStore from "./src/services/configureRedux"
import AppWithNavigationState from "./src/services/configureNavigation"

configureLocalization()

const store = initStore()

export default class App extends React.PureComponent<null> {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    )
  }
}
