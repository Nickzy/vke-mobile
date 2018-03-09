import React from 'react';
import {lecturerList} from '../../utils/api';
import {connect} from 'react-redux';
import './style';
import LecturerCard from './LecturerCard';
class LecturerCenter extends React.Component {
    componentDidMount () {
        lecturerList();
    }
    render () {
        let {lecList} = this.props;
        let height = window.innerHeight + 'px';
        return (
            <div style={{height: height}}>
                {
                    lecList.map((item, index) => (<LecturerCard key={index} lecturer={item}/>))
                }
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    lecList: state.lecturers,
});
export default connect(mapStateToProps)(LecturerCenter);
