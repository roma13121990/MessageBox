// src/messages/MessagesContainer.test.js
import React from "react"
import chai, { expect } from "chai"
import { shallow } from "enzyme"
import chaiEnzyme from "chai-enzyme"
import spies from "chai-spies"
import { MessagesContainer } from "./MessagesContainer"
import MessageItem from "./MessageItem"
import messages from "../FetchMessage/messages"

chai.use(chaiEnzyme())
chai.use(spies)

const currentUser = { apiKey: "ABCD" }

describe("<MessagesContainer />", () => {
  const fetchMessages = chai.spy()
  const fetchBalance = chai.spy()
  const push = chai.spy()

  const container = shallow(
    <MessagesContainer
      fetchMessages={fetchMessages}
      fetchBalance={fetchBalance}
      messages={messages}
      currentUser={currentUser}
      signedIn={true}
      push={push}
      position="all"
    />
  )
  it("calls fetch messages and fetch balance", () => {
    expect(fetchMessages).to.have.been.called.exactly.once()
    expect(fetchBalance).to.have.been.called.exactly.once()
  })

  it('is wrapped in a div with class name "messages"', () => {
    expect(container).to.have.className("container")
  })

  it("renders all messages as a MessageItem", () => {
    expect(container).to.have.exactly(6).descendants(MessageItem)
  })

  it("renders all received messages when position is received as a MessageItem", () => {
    container.setProps({ position: "received" })
    expect(container).to.have.exactly(1).descendants(MessageItem)
  })

  it("renders all sent messages when position is sent as a MessageItem", () => {
    container.setProps({ position: "sent" })
    expect(container).to.have.exactly(5).descendants(MessageItem)
  })
})
