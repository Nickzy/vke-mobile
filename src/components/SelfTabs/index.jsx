import React from 'react';
import './style';
class SelfTabs extends React.Component {
    constructor () {
        super();
        this.state = {

        };
    }
    addClass (item, className) {
        if (!item) {
            return;
        }
        let oldclass = item.getAttribute('class');
        var str = '';
        let num = oldclass.indexOf(className);
        if (num !== -1) {
            str = oldclass;
        } else {
            let arr = oldclass.split(' ');
            arr.push(className);
            str = arr.join(' ');
        }
        item.setAttribute('class', str);
    }
    removeClass (item, className) {
        let rmclass = item.getAttribute('class');
        var str = '';
        let num = rmclass.indexOf(className);
        if (num !== -1) {
            let arr = rmclass.split(' ');
            arr.splice(1, 1);
            str = arr.join(' ');
        } else {
            if (rmclass === '') {
                item.removeAttribute('class');
                return;
            }
            str = rmclass;
        }
        item.setAttribute('class', str);
    }
    handleClick (i, item, e) {
        let arr = e.target.parentNode.querySelectorAll('.self-tab');
        for (let n = 0;n < arr.length;n++) {
            this.removeClass(arr[n], 'self-tab_isActive');
        }
        this.addClass(e.target, 'self-tab_isActive');
        let content = e.target.parentNode.parentNode.querySelector('.self-tab_content');
        content.style.left = `${i * -100}%`;
        content.style.transform = 'left 1s';
        this.props.onChange(item);
    }
    componentDidMount () {
        let first = this.wraper.querySelector('.self-tab');
        this.addClass(first, 'self-tab_isActive');
    }
    render () {
        console.log(this.props.tabs);
        let arr = this.props.tabs || [];
        let style = {
            width: `${100 * arr.length}%`,
            left: '0%',
            transform: 'left 1s',
        };
        return (
            <div>
                <div className='self-tab_bar' ref={(ref) => this.wraper = ref}>
                    {
                        arr.map((item, i) => <span onClick={this.handleClick.bind(this, i, item)} className='self-tab' key={i}>{item.title}</span>)
                    }
                </div>
                <div className='self-tab-wrap_content'>
                    <div className='self-tab_content' style={style}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}
export default SelfTabs;
