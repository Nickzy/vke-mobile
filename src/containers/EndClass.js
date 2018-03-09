import EndClassContainers from '../components/Modal/EndClass';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
    endCourse: state.course,
});
export default connect(mapStateToProps)(EndClassContainers);
