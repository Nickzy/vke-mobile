import React from 'react';
import PropTypes from 'prop-types';

class Creator extends React.Component {
    constructor (props) {
        super(props);
        this.state = {};
    }

    /**
     * 绘制文本
     *
     * @param {any} elements 所有的绘制元素
     * @param {any} pos 当前绘制到第几个
     * @returns {any} None
     * @memberof Creator
     */
    drawText (elements, pos) {
        let element = elements[pos];
        this.canvasContext.font = `${element.fontSize}px 微软雅黑`;
        this.canvasContext.fillStyle = `${element.color}`;
        this.canvasContext.fillText(
            `${element.text}`,
            element.position.x,
            element.position.y
        );
        this.canvasContext.textAlign = `${element.align}`;
        this.draw(elements, pos + 1);
    }

    /**
     * 绘制图片
     *
     * @param {any} elements 所有的绘制元素
     * @param {any} pos 当前绘制到第几个
     * @returns {any} None
     * @memberof Creator
     */
    drawImage (elements, pos) {
        let element = elements[pos];
        let image = new Image();
        image.src = element.url;
        image.onload = () => {
            if (element.radius) {
                this.canvasContext.save();
                this.drawRoundRect(element.position, element.size, element.radius);
                this.canvasContext.clip();
                this.canvasContext.drawImage(
                    image,
                    0,
                    0,
                    image.width,
                    image.height,
                    element.position.x,
                    element.position.y,
                    element.size.width,
                    element.size.height
                );
                this.canvasContext.restore();
            } else {
                this.canvasContext.drawImage(
                    image,
                    element.position.x,
                    element.position.y,
                    element.size.width,
                    element.size.height
                );
            }
            this.draw(elements, pos + 1);
        };
    }

    drawRoundRect (position, size, radius) {
        let {x, y} = position;
        let {width, height} = size;
        radius = Math.min(Math.min(width, height) / 2, radius || 0);

        // 开始绘制
        this.canvasContext.beginPath();
        this.canvasContext.moveTo(x + radius, y);
        this.canvasContext.arcTo(x + width, y, x + width, y + height, radius);
        this.canvasContext.arcTo(x + width, y + height, x, y + height, radius);
        this.canvasContext.arcTo(x, y + height, x, y, radius);
        this.canvasContext.arcTo(x, y, x + width, y, radius);
        this.canvasContext.closePath();
    }

    draw (elements, pos) {
        if (pos < elements.length) {
            console.log(pos);
            let element = elements[pos];
            if (element.type === 'text') {
                this.drawText(elements, pos);
            } else {
                this.drawImage(elements, pos);
            }
        } else {
            this.setState({
                // 将canvas转换成img标记的src
                src: this.canvasElement.toDataURL('image/jpg'),
            });
        }
    }

    componentDidMount () {
        this.canvasElement = document.createElement('canvas');
        if (this.canvasElement.getContext) {
            this.canvasElement.width = this.props.data.width;
            this.canvasElement.height = this.props.data.height;
            this.canvasContext = this.canvasElement.getContext('2d');
            let elements = this.props.data.elements;
            this.draw(elements, 0);
        }
    }

    render () {
        const style = {
            width: '100%',
        };
        return <img style={this.props.style || style} src={this.state.src} />;
    }
}

Creator.propTypes = {
    style: PropTypes.object,
    data: PropTypes.object,
};

export default Creator;
