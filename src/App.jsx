import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Home from './components/Home/home'
import Main from './components/Main'
import Login from './pages/Login'
import "./assets/css/reset.css";
import {connect} from "react-redux"

@connect(
  (state)=>({
    user : state.login
  }),
  null
)
class App extends Component {

  render() {
    return sessionStorage.getItem("token") ?
      <>
        <BrowserRouter>
          <Home />
          <Main />
        </BrowserRouter>
      </>
      :
      <Login store={this.props.store}/>
  }
}
export default  App