import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from "../loading"

export const FETCHED_MESSAGES = "FETCHED_MESSAGES"

const MessageBird = window.MessageBird

export default apiKey => {
  return dispatch => {
    dispatch({ type: APP_LOADING })
    dispatch({ type: LOAD_SUCCESS })

    const mb = new MessageBird(apiKey)

    mb.receiveMessages((err, res) => {
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
        type: FETCHED_MESSAGES,
        payload: res.items
      })
    })
  }
}
