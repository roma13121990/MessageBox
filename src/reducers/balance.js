import { FETCHED_BALANCE } from "../actions/messages/viewbalance"

export default (state = null, { type, payload } = {}) => {
  switch (type) {
    case FETCHED_BALANCE:
      return payload

    default:
      return state
  }
}
