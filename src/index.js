import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { Router, Route, IndexRoute } from "react-router"
import store, { history } from "./store"
import registerServiceWorker from "./registerServiceWorker"

import "bootstrap/dist/css/bootstrap.css"
import "./index.css"

import App from "./App"
import MessagesContainer from "./messages/MessagesContainer"
import SendMessage from "./messages/SendMessage"
import SignIn from "./users/Login"

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={MessagesContainer} />
        <Route path="/send" component={SendMessage} />
        <Route path="/sign-in" component={SignIn} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById("root")
)

registerServiceWorker()
