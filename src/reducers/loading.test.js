// src/reducers/loading.test.js

import { expect } from "chai"
import loading from "./loading"

import { APP_LOADING, APP_DONE_LOADING } from "../actions/loading"

describe("loading reducer", () => {
  const reducer = loading
  const initialState = false

  it("returns `false` for the initial state", () => {
    expect(reducer()).to.eql(initialState)
  })

  it("returns true when we are APP_LOADING", () => {
    expect(reducer(false, { type: APP_LOADING })).to.eq(true)
  })

  it("returns false when we are APP_DONE_LOADING", () => {
    expect(reducer(true, { type: APP_DONE_LOADING })).to.eq(false)
  })
})
