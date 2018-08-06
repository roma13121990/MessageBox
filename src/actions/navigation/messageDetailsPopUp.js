export const MODAL_TOGGLED = "MODAL_TOGGLED"

export default isOpen => {
  return {
    type: MODAL_TOGGLED,
    payload: isOpen
  }
}
