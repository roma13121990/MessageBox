import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from "../loading"

export const GOT_MESSAGE = "GOT_MESSAGE"

export default (messageId, apiKey) => {
  return dispatch => {
    dispatch({ type: APP_LOADING })
    dispatch({ type: LOAD_SUCCESS })

    const MessageBird = require("messagebird")(apiKey)

    MessageBird.messages.read(messageId, function(err, response) {
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
        type: GOT_MESSAGE,
        payload: response
      })
    })
  }
}
