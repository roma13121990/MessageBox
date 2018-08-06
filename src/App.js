import React, { Component } from "react"
import Navigation from "./components/Navigation"
import LoadError from "./components/LoadError"

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <LoadError />
        {this.props.children}
        <footer />
      </div>
    )
  }
}

export default App
