import React from 'react';
import ReactDOM from 'react-dom';
import store from '../store';
import {Provider} from 'react-redux';
import {
    HashRouter as Router,
    Route,
    Link,
} from 'react-router-dom';
import Home from '../components/Home';
ReactDOM.render(
    <Provider store={store}>
        <Home/>
    </Provider>
    ,
    document.getElementById('app')