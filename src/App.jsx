import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Home from './components/Home/home'
import Main from './components/Main'
import Login from './pages/Login'
import "./assets/css/reset.css";
import PropTypes from 'prop-types'

export default class App extends Component {
  static propTypes = {
    store: PropTypes.object
  }

  componentDidMount() {
    // 通过store.subscribe对状态数据变化进行监听，并更新当前组件
    // 返回的是解绑监听的函数
    this.unSubscribe = this.props.store.subscribe(() => {
      this.setState({})
    })
  }
  componentWillUnmount() {
    // 组件卸载前解绑监听
    this.unSubscribe()
  }
  render() {
    console.log(this.props.store.getState());
    
    return this.props.store.getState() ?
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
