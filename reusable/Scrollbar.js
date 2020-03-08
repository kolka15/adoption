import React from 'react';
import {Scrollbars} from 'react-custom-scrollbars';

const Scrollbar = ({children, height, onScrollFrame, el}) => {

    const renderView = ({style, ...props}) => {
        const viewStyle = {
            // padding: 15,
        };
        return (
            <div
                className="box"
                style={{...style, ...viewStyle}}
                {...props}/>
        );
    };

    const renderThumb = ({style, ...props}) => {
        const thumbStyle = {
            backgroundColor: '#a1a7cc',
            borderRadius: '100px',
            width: '8px',
            boxShadow: '0 0px 0 2px #fff'
        };
        return (
            <div
                style={{...style, ...thumbStyle}}
                {...props}/>
        );
    };

    const renderTrack = ({style, ...props}) => {
        const thumbStyle = {
            height: '100%',
            width: '8px',
            top: 0,
            right: 0,
            backgroundColor: '#e5e6f0',
            borderRadius: '100px',
        };
        return (
            <div
                style={{...style, ...thumbStyle}}
                {...props}/>
        );
    };

    return (
        <Scrollbars
            universal
            autoHeight
            autoHeightMin={100}
            autoHeightMax={height}
            renderView={renderView}
            renderThumbVertical={renderThumb}
            renderTrackVertical={renderTrack}
            renderThumbHorizontal={renderThumb}
            onScrollFrame={onScrollFrame}
            ref={el}

        >
            {children}
        </Scrollbars>
    );
};

export default Scrollbar;
