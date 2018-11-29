import { from, of } from "rxjs"
import { filter, switchMap, flatMap, catchError } from "rxjs/operators"

// api
import { sendToken } from "../services/api"

export const initialState = {
  loading: false,
  error: null,
}

export const onTokenRequest = () => ({
  type: "ON_SEND_AUTH_TOKEN",
})
export const onTokenSuccess = movies => ({
  type: "ON_SEND_AUTH_TOKEN_SUCCESS",
  movies,
})
export const onTokenFail = error => ({
  type: "ON_SEND_AUTH_TOKEN_FAIL",
  error,
})

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ON_SEND_AUTH_TOKEN":
      return {
        ...state,
        loading: true,
      }
    case "ON_SEND_AUTH_TOKEN_SUCCESS":
      return {
        ...state,
        loading: false,
      }
    case "ON_SEND_AUTH_TOKEN_FAIL":
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    default:
      return state
  }
}

export const sendAuthTokenEpic = action$ =>
  action$.pipe(
    filter(action => action.type === "ON_SEND_AUTH_TOKEN"),
    switchMap(() =>
      from(sendToken()).pipe(
        flatMap(response => from([onTokenSuccess(response.data)])),
        catchError(e => of(onTokenFail(e))),
      ),
    ),
  )
