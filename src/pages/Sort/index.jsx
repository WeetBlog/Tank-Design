import React, { Component, Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'
import ClassifyManagement from './components/ClassifyManagement'
import ClassifyInfo from './components/ClassifyInfo'



class Sort extends Component {
    render() {
        return (
            <>
                <Suspense fallback={<div>Loading...</div>}>
                    <Switch>
                        <Route path="/sort/classifymanagement" component={ClassifyManagement}/>
                        <Route path="/sort/classifyinfo" component={ClassifyInfo}/>
                    </Switch>
                </Suspense>
            </>
        )
    }
}
export default Sort
