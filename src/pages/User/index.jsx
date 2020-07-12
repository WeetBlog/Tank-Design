import React, { Component, Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'

import SetUser from './components/SetUser'
import Notice from './components/Notice'

export default class User extends Component {
    render() {
        return (
            <>
                <Suspense fallback={<div>Loading...</div>}>
                    <Switch>
                        <Route path="/user/setuser" component={SetUser} />
                        <Route path="/user/notice" component={Notice} />
                    </Switch>
                </Suspense>
            </>
        )
    }
}
