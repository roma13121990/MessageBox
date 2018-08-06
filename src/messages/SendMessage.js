import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { push } from "react-router-redux"
import createMessage from "../actions/messages/createAMessage"
import navPosition from "../actions/navigation/position"
import fetchBalance from "../actions/messages/viewbalance"

import "./SendMessage.css"

class SendMessage extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      recipientValue: "",
      originatorValue: "",
      messageValue: "",
      recipientError: "",
      originatorError: "",
      messageError: ""
    }
  }

  componentWillMount() {
    if (this.props.signedIn)
      this.props.fetchBalance(this.props.currentUser.apiKey)
    else this.props.push("/sign-in")
    this.props.navPosition("send")
  }

  handleRecipientChange(event) {
    this.setState({ recipientValue: event.target.value })
  }

  handleOriginatorChange(event) {
    this.setState({ originatorValue: event.target.value })
  }

  handleMessageChange(event) {
    this.setState({ messageValue: event.target.value })
  }

  submitForm(event) {
    event.preventDefault()

    const { recipientValue, originatorValue, messageValue } = this.state
    this.setState({ messageError: "", recipientError: "", originatorError: "" })
    if (!originatorValue)
      this.setState({ originatorError: "Originator Cannot be Blank!" })
    if (recipientValue.length < 8)
      this.setState({
        recipientError: "Ah, that's a bit too short for a phone number."
      })
    if (!recipientValue)
      this.setState({ recipientError: "Recipient Cannot be Blank!" })
    if (!messageValue)
      this.setState({ messageError: "Message Cannot be Blank!" })

    if (!originatorValue || !recipientValue || !messageValue) return null

    this.props.createMessage(
      this.state.originatorValue,
      this.state.messageValue,
      this.state.recipientValue.split(/\W+/),
      this.props.currentUser.apiKey
    )
  }

  render() {
    const {
      messageValue,
      originatorValue,
      recipientValue,
      recipientError,
      originatorError,
      messageError
    } = this.state
    return (
      <div className="container">
        <div className="messages row">
          <h1>Quickly Send SMS</h1>
          <form onSubmit={this.submitForm.bind(this)}>
            <div className="row">
              <div className="col-md-6">
                <div
                  className={recipientError ? "form-group error" : "form-group"}
                >
                  <input
                    type="number"
                    ref="recipient"
                    onBlur={() => {
                      this.setState({ recipientError: "" })
                      if (recipientValue.length < 8)
                        this.setState({
                          recipientError:
                            "Ah, that's a bit too short for a phone number."
                        })
                      if (!recipientValue)
                        this.setState({
                          recipientError: "Recipient Cannot be Blank!"
                        })
                    }}
                    value={recipientValue}
                    onChange={this.handleRecipientChange.bind(this)}
                    id="simplemessage-recipient"
                    className="form-control"
                    name="recipient"
                    placeholder="Recipient"
                  />
                  <span className="error-msg">
                    {recipientError}
                  </span>
                </div>
              </div>

              <div className="col-md-6">
                <div
                  className={
                    originatorError ? "form-group error" : "form-group"
                  }
                >
                  <input
                    type="text"
                    ref="originator"
                    onBlur={() => {
                      this.setState({ originatorError: "" })
                      if (!originatorValue)
                        this.setState({
                          originatorError: "Originator Cannot be Blank!"
                        })
                    }}
                    value={originatorValue}
                    onChange={this.handleOriginatorChange.bind(this)}
                    id="simplemessage-originator"
                    className="form-control"
                    name="originator"
                    placeholder="Originator"
                  />
                  <span className="error-msg">
                    {originatorError}
                  </span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div
                  className={
                    messageError
                      ? "form-group textarea error"
                      : "textarea form-group"
                  }
                >
                  <textarea
                    id="editor"
                    ref="message"
                    className="edit-box"
                    onBlur={() => {
                      this.setState({ messageError: "" })
                      if (!messageValue)
                        this.setState({
                          messageError: "Message Cannot be Blank!"
                        })
                    }}
                    value={messageValue}
                    onChange={this.handleMessageChange.bind(this)}
                    placeholder="Message"
                  />

                  <div className="pull-right textarea-tooltip">
                    <span>
                      {messageValue.length}/1377,{" "}
                      {messageValue.length === 0
                        ? " 0"
                        : Math.floor(messageValue.length / 160 + 1)}{" "}
                      SMS
                    </span>
                  </div>
                </div>

                <span className="error-msg">
                  {messageError}
                </span>
              </div>
            </div>

            <div className="row">
              <div className="col-md-3 pull-right">
                <button
                  type="submit"
                  className="text-left pull-right btn-primary btn"
                >
                  <i className="fa fa-comment" /> Send SMS
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ messages, currentUser }) => ({
  messages,
  signedIn: !!currentUser && !!currentUser.apiKey,
  currentUser
})

export default connect(mapStateToProps, {
  createMessage,
  push,
  fetchBalance,
  navPosition
})(SendMessage)
