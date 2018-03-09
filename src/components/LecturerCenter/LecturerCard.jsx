import React from 'react';
import {imgUrl} from '../../config/urls';
export default function LecturerCard (props) {
    console.log('讲师卡片', props);
    let {lecturer} = props;
    return (
        <div className='lecturer-card'>
            <div className='lecturer-card_content'>
                <div>
                    <img src={`${imgUrl}/${lecturer && lecturer.avatar || 0}`} alt=""/>
                </div>
                <div>
                    <h2>{lecturer && lecturer.name || ''}</h2>
                    <p>
                        {lecturer && lecturer.intro || ''}
                    </p>
                    <span>
                        <span>{`${lecturer && lecturer.courseCount || 0}个课程`}</span>
                        <span> | </span>
                        <span>{`${lecturer && lecturer.subCount || 0}个人订阅`}</span>
                    </span>
                </div>
            </div>
        </div>
    );

}
