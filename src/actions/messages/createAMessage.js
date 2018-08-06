import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from "../loading"

export const CREATE_MESSAGE = "CREATE_MESSAGE"

const MessageBird = window.MessageBird

export default (originator, message, recipient, apiKey) => {
  const mb = new MessageBird(apiKey)

  return dispatch => {
    dispatch({ type: APP_LOADING })

    mb
      .createMessage(originator, message, recipient)
      .then(response => {
        dispatch({ type: LOAD_SUCCESS })
        dispatch({ type: APP_DONE_LOADING })
        dispatch({
          type: CREATE_MESSAGE,
          payload: response
        })
      })
      .catch(err => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({
          type: LOAD_ERROR,
          payload: err
        })
        console.log(err)
      })
  }
}
