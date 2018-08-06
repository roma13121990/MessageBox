import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from "../loading"

export const USER_SIGNED_IN = "USER_SIGNED_IN"

export default userKey => {
  return dispatch => {
    dispatch({ type: APP_LOADING })

    var messagebird = require("messagebird")(userKey.apiKey)

    //If the balance can be read then the User has input a valid APIKEY
    messagebird.balance.read(function(err, response) {
      if (err) {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({
          type: LOAD_ERROR,
          payload: "Please input a valid API Key"
        })
        return
      }
      dispatch({ type: APP_DONE_LOADING })
      dispatch({ type: LOAD_SUCCESS })
      dispatch({
        type: USER_SIGNED_IN,
        payload: userKey
      })
    })
  }
}
