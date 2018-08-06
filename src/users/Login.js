import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { push } from "react-router-redux"
import signIn from "../actions/users/login"
import navPosition from "../actions/navigation/position"

import "./Login.css"

export class SignIn extends PureComponent {
  componentWillMount() {
    if (this.props.currentUser) this.props.push("/")
    this.props.navPosition("sign-in")
  }

  componentWillReceiveProps(nextProps) {
    this.props.navPosition("all")
    this.props.push("/")
  }

  submitForm(event) {
    event.preventDefault()
    const user = {
      apiKey: this.refs.text.value
    }
    this.props.signIn(user)
  }

  render() {
    return (
      <div className="container">
        <div className="sign-in row">
          <form onSubmit={this.submitForm.bind(this)}>
            <div className="col-md-offset-2 col-md-8">
              <h2 className="text-center">Input API Key to Sign In</h2>
              <input
                className="api-input"
                ref="text"
                type="raw"
                placeholder="API Key"
              />
              <input type="submit" className="btn btn-primary submit" />
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  currentUser
})

export default connect(mapStateToProps, {
  signIn,
  push,
  navPosition
})(SignIn)
