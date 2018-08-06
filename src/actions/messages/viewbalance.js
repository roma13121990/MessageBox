import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from "../loading"

export const FETCHED_BALANCE = "FETCHED_BALANCE"

export default apiKey => {
  return dispatch => {
    dispatch({ type: APP_LOADING })
    dispatch({ type: LOAD_SUCCESS })

    const MessageBird = require("messagebird")(apiKey)

    MessageBird.balance.read(function(err, data) {
      if (err) {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({
          type: LOAD_ERROR,
          payload: err
        })
        return
      }
      dispatch({ type: APP_DONE_LOADING })
      dispatch({ type: LOAD_SUCCESS })
      dispatch({
        type: FETCHED_BALANCE,
        payload: data
      })
    })
  }
}
