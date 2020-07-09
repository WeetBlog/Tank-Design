import React, { Component, Suspense } from 'react'
import { Route, Redirect, Switch } from "react-router-dom"
import Card from 'antd/es/card';
import Breadcrumb from 'antd/es/breadcrumb';
import User from '../../pages/User'
import Blog from '../../pages/Blog'
import './index.css'

export default class Main extends Component {
    render() {
        return (
            <div className="main">
                <header>
                    <Card title="Default size card" extra={
                        <div onClick={this.renderRouteTags}>管理员 ： Tank</div>
                    } >
                        <Breadcrumb>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>ABC</Breadcrumb.Item>
                            <Breadcrumb.Item>BCD</Breadcrumb.Item>
                        </Breadcrumb>
                        <p className="title">123</p>
                    </Card>
                </header>
                <main className="main-content">
                    <Suspense>
                        <Switch>
                            <Route path="/user" component={User} />
                            <Route path="/blog" component={Blog} />
                            <Redirect to="/user" />
                        </Switch>
                    </Suspense>
                </main>
                



            </div>
        )
    }
}
