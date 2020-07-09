import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import {Provider} from 'react-redux'
import store from './redux/store'
import 'antd/dist/antd.css'

ReactDOM.render(
    <App  store={store}/>
,document.getElementById('root'));

//离线访问
serviceWorker.register();
