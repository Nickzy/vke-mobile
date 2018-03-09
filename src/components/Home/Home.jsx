import React from 'react';
import { Tabs} from 'antd-mobile';
import './style.less';
import CourseList from './CourseList';
import ajax from '../../utils/ajax';
import {homeItem, categoryCourse} from '../../utils/api';
import {connect} from 'react-redux';
import Advice from './Advice';
import SelfListView from '../SelfListView';
class Homeview extends React.Component {
    constructor () {
        super();
        this.state = {
            data: [],
            category: '推荐',
            courseList: [],
            sliderList: [],
        };
    }
    componentDidMount () {
        homeItem();
    }
    handelFirst (item) {
        console.log(item);
        if (item.title === '推荐') {
            homeItem();
        } else {
            categoryCourse(item.categoryId);
        }
        this.setState({
            category: item.title,
        });
    }
    handelSecond (item) {
        console.log(item);
        categoryCourse(item.categoryId, item.title);
    }
    render () {
        console.log('reducer______home', this.props.homeObj);
        let {category} = this.state;
        let {homeObj} = this.props;
        let list = homeObj.get('newList');
        let data = homeObj.get('category');
        let sliderList = homeObj.get('sliderList');
        let tabs = data.map((item) => {
            let childTabs = item.labels.map((tab) => ({categoryId: item.idStr, title: tab}));
            return {
                title: item.name,
                categoryId: item.idStr,
                childTabs: childTabs,
            };
        });
        let tab = [{title: '推荐', childTabs: []}];
        tabs = tab.concat(tabs);
        let height = window.innerHeight + 'px';
        let tabBarTextStyle = {
            fontSize: '12px',
            color: '#000000',
            letterSpacing: 0,
            lineHeight: '16px',
        };
        console.log('immutabel____obj', homeObj.get('newList'));
        return (
            <div className='home' style={{height: height}} onScroll={(e) => e.preventDefault()}>

                <Tabs
                    tabBarBackgroundColor='#FBFBFB'
                    tabs={tabs}
                    tabBarTextStyle={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                    onChange={this.handelFirst.bind(this)}>
                    {
                        (tab) => (
                            <div>
                                {
                                    category === '推荐'
                                        ? <div>
                                            <SelfListView height='44' body={<CourseList category='推荐' sliderList={sliderList} courseList={list}/>}/>
                                        </div>
                                        : <div className='home-second_tabs'>
                                            <Tabs
                                                tabBarActiveTextColor='#25D8EF'
                                                tabBarBackgroundColor='#FBFBFB'
                                                tabBarTextStyle={tabBarTextStyle}
                                                tabBarUnderlineStyle={false}
                                                tabs={tab.childTabs}
                                                swipeable={false}
                                                onChange={this.handelSecond.bind(this)}
                                                tabBarUnderlineStyle={{border: 'none'}}
                                            >
                                                <SelfListView height='88' body={<CourseList courseList={list}/>}/>
                                            </Tabs>
                                        </div>

                                }
                            </div>
                        )
                    }
                </Tabs>
            </div>
        );
    }

}
const mapStateToProps = (state) => ({
    homeObj: state.courselist,
});
export default connect(mapStateToProps)(Homeview)
;
