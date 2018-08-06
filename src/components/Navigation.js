// src/components/Navigation.js
import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { push } from "react-router-redux"
import { Link } from "react-router"
import navPosition from "../actions/navigation/position"
import signOut from "../actions/users/logout"

import logo from "../images/glyph.svg"

import "./Navigation.css"

export class Navigation extends PureComponent {
  getCurrencySymbol(type) {
    switch (type) {
      case "euros":
        return " \u20AC"
      case "dollars":
        return " \u0024"
      case "pounds":
        return " \u00A3"
      case "credits":
        return " credits"
      default:
        return " \u0024"
    }
  }

  render() {
    const { balance, signedIn, navPosition, position } = this.props
    return (
      <header className="nav-header container clearfix">
        <img className="logo" src={logo} height="30" alt="logo" />

        <div className="context-menu-container">
          <ul className="navbar-nav tab-menu nav">
            <li className={position === "all" ? "active" : ""}>
              <Link to="/" onClick={() => navPosition("all")}>
                All messages
              </Link>
            </li>
            <li className={position === "received" ? "active" : ""}>
              <Link to="/" onClick={() => navPosition("received")}>
                Received
              </Link>
            </li>
            <li className={position === "sent" ? "active" : ""}>
              <Link to="/" onClick={() => navPosition("sent")}>
                Sent
              </Link>
            </li>
            <li className={position === "send" ? "active" : ""}>
              <Link to="/send">Send a Message</Link>
            </li>
          </ul>
        </div>

        <div className="sign-in-nav">
          <ul className="navbar-nav tab-menu nav">
            {signedIn && balance
              ? <li className="balance">
                  <span>
                    balance
                    {this.getCurrencySymbol(balance.type)}
                    {balance.amount}
                  </span>
                </li>
              : <li />}
            <li className="login">
              {signedIn
                ? <Link
                    to="/sign-in"
                    onClick={() => {
                      this.props.signOut()
                    }}
                  >
                    Sign Out
                  </Link>
                : <Link
                    to="/sign-in"
                    className={position === "sign-in" ? "active" : ""}
                  >
                    Sign In
                  </Link>}
            </li>
          </ul>
        </div>
      </header>
    )
  }
}

const mapStateToProps = ({ currentUser, balance, position }) => ({
  signedIn: !!currentUser && !!currentUser.apiKey,
  balance,
  currentUser,
  position
})

export default connect(mapStateToProps, {
  push,
  signOut,
  navPosition
})(Navigation)
