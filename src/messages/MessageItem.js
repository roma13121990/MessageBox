import React, { PureComponent } from "react"
import { connect } from "react-redux"

import getMessage from "../actions/messages/get"
import toggleModal from "../actions/navigation/messageDetailsPopUp"

export class MessageItem extends PureComponent {
  renderModal() {
    const { message, currentUser } = this.props
    this.props.toggleModal(true)
    this.props.getMessage(message.id, currentUser.apiKey)
  }

  render() {
    const { message } = this.props
    const { totalCount, totalDeliveredCount, items } = message.recipients
    const isMultipleMessages = totalCount > 1

    const date =
      message.direction === "mo"
        ? new Date(message.createdDatetime.toString())
        : new Date(items[0].statusDatetime.toString())

    const today = new Date()
    const isToday = date.toDateString() === today.toDateString()

    const MyTimeString = `${date.getHours()}:${date.getMinutes()}`

    const MyDateString =
      ("0" + date.getDate()).slice(-2) +
      "-" +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      date.getFullYear()

    return (
      <tr key={message.id}>
        <td id="type">
          <div href="#">
            {this.props.children}
          </div>
        </td>
        <td id="recipient">
          {isMultipleMessages ? `${totalCount} recipients` : items[0].recipient}
        </td>
        <td id="originator">
          {message.originator}
        </td>
        <td id="message">
          {message.body}
        </td>
        <td id="status">
          {isMultipleMessages
            ? `groups message
            ${(totalDeliveredCount / totalCount * 100).toFixed(1)}% delivered`
            : items[0].status}
        </td>
        <td id="date" className="text-right">
          {isToday ? MyTimeString : MyDateString}
        </td>
        <td id="read" className="text-center">
          <button
            className="btn-primary btn btn-sm"
            onClick={() => this.renderModal()}
          >
            <i className="fa fa-file-text-o" />
          </button>
        </td>
      </tr>
    )
  }
}

const mapStateToProps = ({ currentMessage, currentUser }) => ({
  currentMessage,
  currentUser,
  toggleModal
})

export default connect(mapStateToProps, {
  getMessage,
  toggleModal
})(MessageItem)
