import React, { Component, Suspense } from 'react'
import { Route, Redirect, Switch } from "react-router-dom"
import './index.css'
import Card from 'antd/es/card';
import Breadcrumb from 'antd/es/breadcrumb';
import { withRouter } from 'react-router-dom'

import User from '../../pages/User'
import Blog from '../../pages/Blog'
import Backend from '../../pages/Backend'

import { Button } from 'antd';
import {connect} from "react-redux"
import {quitLogin} from '../../redux/actions/login'
import {getComponentName} from './redux/actions'
import PubSub from 'pubsub-js'

@connect(
    (state)=>({
        uname : state.user.uname,
        componentName : state.componentName
    }),
    {quitLogin,getComponentName}
)
class Main extends Component {
    
    quit = ()=>{
        this.props.quitLogin("token")
    }
    
    componentDidMount(){
        PubSub.subscribe('changeComponent' , (msgName , data ) => {
            this.props.getComponentName(data.componentName)
            this.props.history.push(data.address)
        })
    }

    render() {
        return (
            <div className="main">
                <header>
                    <Card title="后台管理站" extra={
                        <div>
                            管理员 ： {this.props.uname || "????"}

                            <Button type="link"  onClick={this.quit}>退出</Button>
                        </div>
                    } >
                        <Breadcrumb>
                            <Breadcrumb.Item>{this.props.componentName.firstName}</Breadcrumb.Item>
                            <Breadcrumb.Item>{this.props.componentName.secondName}</Breadcrumb.Item>
                            <Breadcrumb.Item>{this.props.componentName.lastName}</Breadcrumb.Item>
                        </Breadcrumb>
                        {
                        this.props.componentName.lastName ? 
                        <p className="title">{this.props.componentName.lastName}</p> : this.props.componentName.secondName ? 
                        <p className="title">{this.props.componentName.secondName}</p> : this.props.componentName.firstName ?
                        <p className="title">{this.props.componentName.firstName}</p> : ""
                         
                        }
                    </Card>
                </header>
                <main className="main-content">
                    <Suspense fallback={<div>loading......</div>}>
                        <Switch>
                            <Route path="/backend" component={Backend} />
                            <Route path="/user" component={User} />
                            <Route path="/blog" component={Blog} />
                            <Redirect to="/backend" />
                        </Switch>
                    </Suspense>
                </main>
                



            </div>
        )
    }
}
export default withRouter(Main)