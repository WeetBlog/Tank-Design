import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import 'antd/dist/antd.css'

ReactDOM.render(<App />,document.getElementById('root'));

//离线访问
serviceWorker.register();
