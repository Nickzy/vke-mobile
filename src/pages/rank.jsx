import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import AnswerResult from '../containers/AnswerResult';
import store from '../store';

ReactDOM.render(
    <Provider store={store}>
        <AnswerResult/>
    </Provider>
    ,
    document.getElementById('app')
);
