import React from 'react';
import CourseCard from './CourseCard';
import Advice from './Advice';
export default class CourseList extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            dataSource: props.courseList,
        };
    }
    render () {
        let {courseList, sliderList, category} = this.props;
        return (
            <div onScroll={(e) => e.preventDefault()}>
                {
                    category === '推荐' && <Advice sliderList={sliderList}/>
                }
                {
                    courseList.map((item, index) =>
                        (<CourseCard key={index} course={item}/>))
                }
            </div>
        );
    }
}
