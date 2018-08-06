// src/components/navigation.test.js
import React from "react"
import chai, { expect } from "chai"
import { shallow } from "enzyme"
import chaiEnzyme from "chai-enzyme"
import spies from "chai-spies"
import { Navigation } from "./Navigation"

chai.use(chaiEnzyme())
chai.use(spies)

const balance = {
  type: "euros",
  amount: 6.65
}

describe("<Navigation />", () => {
  const container = shallow(
    <Navigation balance={balance} signedIn={true} position="all" />
  )

  it('is wrapped in a div with class name "messages"', () => {
    expect(container).to.have.className("nav-header")
  })

  it("is shows Sign Out button when signed in", () => {
    expect(container.find(".login")).to.contain("Sign Out")
    expect(container.find(".login")).to.not.contain("Sign In")
  })

  it("is shows the balance and correct currency symbol", () => {
    expect(container.find(".balance")).to.include.text("balance €6.65")
  })

  it("is shows the balance and correct currency symbol", () => {
    container.setProps({ balance: { type: "pounds", amount: 11.75 } })
    expect(container.find(".balance")).to.include.text("balance £11.75")
  })

  it("Shows balance when signed in but no if signed out", () => {
    container.setProps({ signedIn: true })
    expect(container.find(".balance").exists()).to.be.equal(true)
    container.setProps({ signedIn: false })
    expect(container.find(".balance").exists()).to.be.equal(false)
  })

  it("is shows Sign In button when signed out", () => {
    container.setProps({ signedIn: false })
    expect(container.find(".login")).to.contain("Sign In")
    expect(container.find(".login")).to.not.contain("Sign Out")
  })
})
