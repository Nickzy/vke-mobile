import React from 'react';
import { Tag, Flex} from 'antd-mobile';
import './style.less';
import {imgUrl, apiUrl} from '../../config/urls';
function Tags (props) {
    let data = props.data || [];
    return data.map((item, index) => (
        <Tag small key={index}>{item}</Tag>
    ));
}
export default function CourseCard (props) {
    let {course} = props || {};

    return (
        <div className='course-card_wrap' onClick={() => location.href = `${apiUrl}/client/course/detail/${course.courseIdStr}`}>
            <div className='course-card_content'>
                <div className='course-card_picture'>
                    <span style={{background: course.status === '正在直播' && '#00A854' || course.status === '报名中' && '#FFBF00' || '#25D8EF'}}>
                        {course.status === '已经结束' && '可回看' || course.status}
                    </span>
                    <img src={`${imgUrl}/${course.avatar}`} alt=""/>
                </div>
                <div className='course-card_intro'>
                    <h2>{course.name}</h2>
                    <div style={{height: '28px'}}>
                        <Tags data={course.tags}/>
                    </div>
                    <div className='course-card_price_lec'>
                        <span className='course-card_lecturer'>
                            {course.lecturerName}
                        </span>
                        <span className='course-card_price'>
                            {
                                course.interactPrice ? `互动¥${10}/旁听${course.auditPrice && '¥' + course.auditPrice || '免费'}` : '免费'
                            }
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
