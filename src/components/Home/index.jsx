import React from 'react';
import { TabBar } from 'antd-mobile';
import Homeview from './Home';
import LecturerCenter from '../LecturerCenter';
import {apiUrl} from '../../config/urls';
export default class Home extends React.Component {
    constructor () {
        super();
        this.state = {
            tabSelect: 'home',
        };
    }
    handleMe () {
        this.setState({tabSelect: 'me'});
        location.href = 'http://h52.zhishimao.cn/client/me';
    }
    render () {
        let {tabSelect} = this.state;
        return (
            <div className='footer_public'>
                <div className='footer-bluer'></div>
                <TabBar tintColor='#25d8ef' unselectedTintColor='#919191' barTintColor='rgba(255,255,255,0.70)'>
                    <TabBar.Item
                        icon={<i className='iconfont icon-home'></i>}
                        selectedIcon={<i className='iconfont icon-home'></i>}
                        selected={tabSelect === 'home'}
                        title="首页"
                        key="my"
                        onPress={() => this.setState({tabSelect: 'home'})}
                    >
                        <Homeview/>
                    </TabBar.Item>
                    <TabBar.Item
                        icon={<i className='iconfont icon-CombinedShape1'></i>}
                        selectedIcon={<i className='iconfont icon-CombinedShape1'></i>}
                        selected={tabSelect === 'lecturer'}
                        onPress={() => this.setState({tabSelect: 'lecturer'})}
                        title="讲师"
                        key="lecturer"
                    >
                        <LecturerCenter/>
                    </TabBar.Item>
                    <TabBar.Item
                        icon={<i className='iconfont icon-me'></i>}
                        selectedIcon={<i className='iconfont icon-me'></i>}
                        selected={tabSelect === 'me'}
                        onPress={this.handleMe.bind(this) }
                        title="我的"
                        key="me"
                    >
                        3333
                    </TabBar.Item>
                </TabBar>
            </div>
        );
    }
}
