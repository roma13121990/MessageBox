// src/messages/MessageItem.test.js
import React from "react"
import chai, { expect } from "chai"
import { shallow } from "enzyme"
import chaiEnzyme from "chai-enzyme"
import { MessageItem } from "./MessageItem"
import spies from "chai-spies"

chai.use(chaiEnzyme())
chai.use(spies)

const today = new Date()
const MyTimeString = `${today.getHours()}:${today.getMinutes()}`

const currentUser = { apiKey: "ABCD" }
const singleMessage = {
  id: "2",
  direction: "mo",
  createdDatetime: today,
  recipients: {
    totalCount: 1,
    totalSentCount: 1,
    totalDeliveredCount: 1,
    totalDeliveryFailedCount: 1,
    items: [
      {
        recipient: 31642670097,
        status: "delivered",
        statusDatetime: today
      }
    ]
  }
}

const multiMessage = {
  id: "1",
  direction: "mt",
  type: "sms",
  originator: "Messagbird",
  body: "This is a message",
  createdDatetime: "2017-08-08T20:21:20+00:00",
  recipients: {
    totalCount: 2,
    totalSentCount: 2,
    totalDeliveredCount: 1,
    totalDeliveryFailedCount: 1,
    items: [
      {
        recipient: 31642670097,
        status: "delivered",
        statusDatetime: "2017-08-08T20:21:25+00:00"
      },
      {
        recipient: 31646713801,
        status: "failed",
        statusDatetime: "2017-08-08T20:21:25+00:00"
      }
    ]
  }
}

describe("<MessageItem />", () => {
  const getMessage = chai.spy()
  const toggleModal = chai.spy()

  const container = shallow(
    <MessageItem
      currentUser={currentUser}
      getMessage={getMessage}
      toggleModal={toggleModal}
      message={multiMessage}
    />
  )
  const container2 = shallow(<MessageItem message={singleMessage} />)

  it("calls getMessage is not called on mount", () => {
    expect(getMessage).to.have.not.been.called()
  })

  it("calls getMessage and toggleModal on click of read button", () => {
    container.find("#read").childAt(0).simulate("click")
    expect(getMessage).to.have.been.called.exactly.once()
    expect(toggleModal).to.have.been.called.exactly.once()
  })

  it("Multiple messages contain correct data for recipient and status", () => {
    expect(container.find("#recipient")).to.have.text("2 recipients")
    expect(container.find("#status")).to.include.text("groups message")
    expect(container.find("#status")).to.include.text("50.0% delivered")
  })

  it("Single Message contain correct data for recipient and status", () => {
    expect(container2.find("#recipient")).to.have.text("31642670097")
    expect(container2.find("#status")).to.have.text("delivered")
  })

  it("Message delivered on todays date shows the time and not date", () => {
    expect(container2.find("#date")).to.have.text(MyTimeString)
  })

  it("Message contains a button which links to modal element", () => {
    expect(container.find("#read")).to.contain.html(
      '<button class="btn-primary btn btn-sm"><i class="fa fa-file-text-o"></i></button>'
    )
  })
})
