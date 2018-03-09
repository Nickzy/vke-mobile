import React from 'react';
import { Tag, Flex} from 'antd-mobile';
import './style.less';

export default function SelfCard () {
    const ll = true;
    return (
        <div>
            <div className='course-card_content'>
                <Flex>
                    <Flex.Item>
                        <div className='course-card_picture'>
                            <span>正在直播</span>
                        </div>
                    </Flex.Item>
                    <Flex.Item>
                        <div className='course-card_intro'>
                            <h2>想要What to? 这样表达法真的得体吗？在这个公</h2>
                            <div>
                                <Tag data-seed="logId">音标</Tag>
                                <Tag data-seed="logId">入门</Tag>
                            </div>
                            <div>
                                <span className='course-card_lecturer'>
                                        沙包老师
                                </span>
                                <span className='course-card_price'>
                                    {
                                        ll ? `互动¥${10}/旁听${null || '免费'}` : '免费'
                                    }
                                </span>
                            </div>
                        </div>
                    </Flex.Item>
                </Flex>
            </div>
        </div>
    );
}
