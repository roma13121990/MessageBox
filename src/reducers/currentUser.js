import { USER_SIGNED_IN } from "../actions/users/login"
import { USER_SIGNED_OUT } from "../actions/users/logout"

const currentUserKey = "MessageBird-API"

const currentUserFromLocalStorage = JSON.parse(
  window.localStorage.getItem(currentUserKey) || "null"
)

export default (
  state = currentUserFromLocalStorage,
  { type, payload } = {}
) => {
  switch (type) {
    case USER_SIGNED_IN:
      const userKey = { ...payload }
      window.localStorage.setItem(currentUserKey, JSON.stringify(userKey))
      return userKey

    case USER_SIGNED_OUT:
      window.localStorage.removeItem(currentUserKey)
      return null

    default:
      return state
  }
}
