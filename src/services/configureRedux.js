// @flow
import { createStore, applyMiddleware, combineReducers } from "redux"
import { combineEpics, createEpicMiddleware } from "redux-observable"
import { createLogger } from "redux-logger"

// navigation
import { navReducer, navMiddleware } from "./configureNavigation"

// reducers & epics
import { reducer as authReducer, sendAuthTokenEpic } from "../redux/AuthRedux"

const epics = [sendAuthTokenEpic]

const reducers = {
  auth: authReducer,
  nav: navReducer,
}

export default () => {
  const logger = createLogger({ collapsed: true })
  const middleware = []

  const epicMiddleware = createEpicMiddleware({
    dependencies: {},
  })
  middleware.push(epicMiddleware)
  middleware.push(logger)
  middleware.push(navMiddleware)

  const store = createStore(
    combineReducers(reducers),
    {},
    applyMiddleware(...middleware),
  )
  epicMiddleware.run(combineEpics(...epics))

  return store
}
