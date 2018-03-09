import React from 'react';
import ReactDOM from 'react-dom';
import {uploadVoice} from '../utils/api/uploadVoice';
import AudioRecorder from '../components/AudioRecorder';

const recorderCallback = (localId, time) => {
    alert(`LocalId:${localId},Time:${time}`);
    uploadVoice(localId, time, 'tempId');
};
const unauthCallback = () => {
    alert('授权失败');
};

const App = () => (
    <AudioRecorder duration={59} unauthCallback={unauthCallback} recorderCallback={recorderCallback}/>
);

ReactDOM.render(
    <App />,
    document.getElementById('app')
);
