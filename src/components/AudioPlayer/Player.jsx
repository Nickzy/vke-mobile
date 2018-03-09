import React from 'react';
import PropTypes from 'prop-types';
import Timeline from './Timeline';
import Controls from './Controls';
import Time from './Time';
import TimeFormat from '../TimeFormat';

class Player extends React.PureComponent {

    constructor (props) {
        super(props);
    }

    render () {
        const {
            controlStates,
            controlCallbacks,
            timelineStates,
            timelineCallbacks,
        } = this.props;

        return (

            <div className="audioPlayer">
                <Controls {...controlStates} {...controlCallbacks} />
                <div className="timeShow">
                    <span className="progress_time">
                        <Time time={timelineStates.progress} />
                        <span>{'/'}</span>
                    </span>
                    <Time time={timelineStates.duration} />
                    <span className="timeLeave">
                        <TimeFormat time={parseInt(timelineStates.duration) - parseInt(timelineStates.progress)}/>
                    </span>
                </div>

                <Timeline {...timelineStates} {...timelineCallbacks} />
            </div>
        );
    }
}

Player.propTypes = {
    controlStates: PropTypes.shape({
        loading: PropTypes.bool,
        playing: PropTypes.bool,
        played: PropTypes.bool,
    }),
    controlCallbacks: PropTypes.shape({
        togglePlayPause: PropTypes.func,
    }),
    timelineStates: PropTypes.shape({
        loading: PropTypes.bool,
        progress: PropTypes.number,
        duration: PropTypes.number,
    }),
    timelineCallbacks: PropTypes.shape({
        setProgress: PropTypes.func,
    }),
};

export default Player;
