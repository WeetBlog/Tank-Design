import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import reducer from './reducers/index'
const store = createStore(
    reducer,
    process.env.NODE_ENV === "development" ? composeWithDevTools(applyMiddleware(thunk)) : applyMiddleware(thunk)
)

export default store