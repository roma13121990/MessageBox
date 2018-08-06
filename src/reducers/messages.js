import { FETCHED_MESSAGES } from "../actions/messages/fetchAMessage"
import { CREATE_MESSAGE } from "../actions/messages/createAMessage"

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case FETCHED_MESSAGES:
      return [...payload];

    case CREATE_MESSAGE:
        console.log(payload,"Payload")
      return state.concat({ ...payload })

    default:
      return state
  }
}
