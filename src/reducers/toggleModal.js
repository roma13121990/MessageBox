import { MODAL_TOGGLED } from "../actions/navigation/messageDetailsPopUp"

export default (state = false, { type, payload } = {}) => {
  switch (type) {
    case MODAL_TOGGLED:
      return payload

    default:
      return state
  }
}
