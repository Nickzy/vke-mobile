import React from 'react';
import { Carousel, WhiteSpace, WingBlank } from 'antd-mobile';
import {imgUrl} from '../../config/urls';
const ImageCarousel = (props) => {
    const linkStyle = {
        display: 'inline-block',
        width: '100%',
        height: 166,
    };
    const imgStyle = {
        width: '100%',
        height: '100%',
        verticalAlign: 'top',
    };
    return (
        <a href={props.href} style={linkStyle}>
            <img src={props.src} alt="" style={imgStyle}/>
        </a>
    );
};
export default class Advice extends React.Component {
    render () {
        let {sliderList } = this.props;
        return (
            <div className='self-carouse'>
                <Carousel
                    autoplay={true}
                    infinite
                    selectedIndex={1}
                    dots={false}
                >
                    {sliderList.map((item, index) => (
                        <ImageCarousel key={index} src={imgUrl + '/' + item.avatar} href={item.url}/>
                    ))}
                </Carousel>
            </div>
        );
    }
}
