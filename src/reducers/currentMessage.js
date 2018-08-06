import { GOT_MESSAGE } from "../actions/messages/get"

export default (state = null, { type, payload } = {}) => {
  switch (type) {
    case GOT_MESSAGE:
      return payload

    default:
      return state
  }
}
