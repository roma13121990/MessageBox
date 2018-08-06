import { NAVIGATION_POSITION } from "../actions/navigation/position"

export default (state = "all", { type, payload } = {}) => {
  switch (type) {
    case NAVIGATION_POSITION:
      return payload

    default:
      return state
  }
}
