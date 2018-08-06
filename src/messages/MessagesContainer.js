import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { push } from "react-router-redux"
import fetchMessages from "../actions/messages/fetchAMessage"
import fetchBalance from "../actions/messages/viewbalance"

import MessageItem from "./MessageItem"
import MessageModalContainer from "./MessageModalContainer"

import "./MessagesContainer.css"

export class MessagesContainer extends PureComponent {
  componentWillMount() {
    if (this.props.signedIn) {
      this.props.fetchMessages(this.props.currentUser.apiKey)
      this.props.fetchBalance(this.props.currentUser.apiKey)
    } else this.props.push("/sign-in")
  }

  renderMessage(message) {
    return (
      <MessageItem key={message.id} message={message}>
        "HELLO"
      </MessageItem>
    )
  }

  render() {
    const { messages, position, toggleModal } = this.props
    if (!messages && !position) return null

    const outgoingMessages = messages.filter(
      message => message.direction === "mt"
    )
    const incomingMessages = messages.filter(
      message => message.direction === "mo"
    )

    return (
      <div className="container">
        {toggleModal ? <MessageModalContainer /> : null}
        <div className="messages row ">
          <h1>Messages Overview</h1>

          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Recipient</th>
                  <th>Originator</th>
                  <th>Message</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Read</th>
                </tr>
              </thead>
              <tbody>
                {position === "all"
                  ? messages.map(this.renderMessage.bind(this))
                  : null}

                {position === "sent"
                  ? outgoingMessages.map(this.renderMessage.bind(this))
                  : null}

                {position === "received"
                  ? incomingMessages.map(this.renderMessage.bind(this))
                  : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ messages, currentUser, position, toggleModal }) => ({
  signedIn: !!currentUser && !!currentUser.apiKey,
  messages,
  currentUser,
  position,
  toggleModal
})

export default connect(mapStateToProps, {
  fetchMessages,
  fetchBalance,
  push
})(MessagesContainer)
