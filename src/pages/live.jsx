import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { HashRouter as Router, Route, Link } from 'react-router-dom';

import Live from '../containers/Live';
import store from '../store';


ReactDOM.render(
    <Provider store={store}>
        <Live/>
    </Provider>
    ,
    document.getElementById('app')
);
