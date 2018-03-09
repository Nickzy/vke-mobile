import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import TestEveryday from '../containers/TestEveryday';
import AnswerResult from '../containers/AnswerResult';
import store from '../store';

function isShared () {
    let shareId = location.href.split('shareId=')[1];
    return !!shareId;
}

ReactDOM.render(
    <Provider store={store}>
        {
            isShared() ? <AnswerResult/> : <TestEveryday/>
        }
    </Provider>
    ,
    document.getElementById('app')
);
