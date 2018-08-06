import React, { PureComponent } from "react"
import { connect } from "react-redux"
import toggleModal from "../actions/navigation/messageDetailsPopUp"

import "./MessageModalContainer.css"

class MessageModalContainer extends PureComponent {
  renderMessage(item, index) {
    const { currentMessage } = this.props
    const date =
      currentMessage.direction === "mo"
        ? new Date(currentMessage.createdDatetime.toString())
        : new Date(item.statusDatetime.toString())

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
      <tr key={index}>
        <td>
          {currentMessage.direction === "mo" ? "Incoming SMS" : "Outgoing SMS"}
        </td>
        <td>
          {item.recipient}
        </td>
        <td>
          {currentMessage.originator}
        </td>
        <td>
          {item.status}
        </td>
        <td>
          {isToday ? MyTimeString : MyDateString}
        </td>
      </tr>
    )
  }

  render() {
    const { toggleModal, currentMessage } = this.props
    if (!toggleModal || !currentMessage) return null

    const {
      totalCount,
      totalDeliveryFailedCount,
      totalDeliveredCount,
      totalSentCount,
      items
    } = currentMessage.recipients

    const date =
      currentMessage.direction === "mo"
        ? new Date(currentMessage.createdDatetime.toString())
        : new Date(items[0].statusDatetime.toString())

    const MyTimeString = `${date.getHours()}:${date.getMinutes()}`
    const MyDateString =
      ("0" + date.getDate()).slice(-2) +
      "-" +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      date.getFullYear()

    return (
      <div className="modal in" id="show-modal" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                onClick={() => this.props.toggleModal(false)}
              >
                <span aria-hidden="true">×</span>
              </button>
              <h2 className="modal-title">Message information</h2>
            </div>
            <div className="modal-body">
              <table className="table horizontal">
                <tbody>
                  <tr>
                    <th>ID</th>
                    <td>
                      {currentMessage.id}
                    </td>
                  </tr>
                  <tr>
                    <th>Originator</th>
                    <td>
                      {currentMessage.originator}
                    </td>
                  </tr>
                  <tr>
                    <th>Send time</th>
                    <td>
                      {MyDateString} {MyTimeString}
                    </td>
                  </tr>
                  <tr>
                    <th>Message</th>
                    <td>
                      {currentMessage.body}
                    </td>
                  </tr>
                  <tr>
                    <th>Summary</th>
                    <td>
                      <table className="message-stats">
                        <tbody>
                          <tr>
                            <td style={{ whiteSpace: "nowrap" }}>
                              Delivered:{" "}
                            </td>
                            <td className="text-right">
                              {totalDeliveredCount}
                            </td>
                            <td>
                              ({(totalDeliveredCount /
                                totalCount *
                                100).toFixed(1)}%)
                            </td>
                          </tr>
                          <tr>
                            <td style={{ whiteSpace: "nowrap" }}>Buffered: </td>
                            <td className="text-right">
                              {totalSentCount - totalDeliveredCount}
                            </td>
                            <td>
                              ({((totalSentCount -
                                totalDeliveredCount -
                                totalDeliveryFailedCount) /
                                totalCount *
                                100).toFixed(1)}%)
                            </td>
                          </tr>
                          <tr>
                            <td style={{ whiteSpace: "nowrap" }}>
                              Not delivered:{" "}
                            </td>
                            <td className="text-right">
                              {totalDeliveryFailedCount}
                            </td>
                            <td>
                              ({(totalDeliveryFailedCount /
                                totalCount *
                                100).toFixed(1)}%)
                            </td>
                          </tr>
                          <tr className="totals">
                            <td style={{ whiteSpace: "nowrap" }}>
                              Total messages sent:{" "}
                            </td>
                            <td className="text-right">
                              {totalSentCount}
                            </td>
                            <td />
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="row">
                <div className="col-md-12" />
              </div>

              <table className="table table-vertical-borders table-no-border-bottom">
                <thead>
                  <tr>
                    <th id="type">Type</th>
                    <th id="recipient">Recipient</th>
                    <th id="originator">Originator</th>
                    <th id="status">Status</th>
                    <th id="create_datetime">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map(this.renderMessage.bind(this))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ currentMessage, toggleModal }) => ({
  currentMessage,
  toggleModal
})

export default connect(mapStateToProps, {
  toggleModal
})(MessageModalContainer)
