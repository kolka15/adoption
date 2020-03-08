import React, { Component } from 'react';
import Slider from 'react-slick';

export default class Carousel extends Component {
    render() {
        return (
            <div>
                <Slider {...this.props.settings}>
                    {this.props.children}
                </Slider>
            </div>
        );
    }
}
