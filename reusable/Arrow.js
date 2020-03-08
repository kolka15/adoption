import React from 'react';
import theme from '../utils/styles/theme';

const Arrow = ({ type }) => {
    let rotate;
    switch (type) {
    case 'right':
        rotate = '-45deg';
        break;
    case 'left':
        rotate = '135deg';
        break;
    case 'up':
        rotate = '-135deg';
        break;
    case 'down':
        rotate = '45deg';
        break;
    default:
        rotate = '-45deg';
        break;
    }
    return (
        <div className='container'>
            <i className="arrow"/>

            <style jsx>{`
                .container {
                    position: relative;
                    width: 25px;
                    text-align: center;
                }
                .arrow {
                    border: solid ${theme.colors.grey.plain};
                    border-width: 0 1px 1px 0;
                    display: inline-block;
                    padding: 4px;
                    transform: rotate(${rotate});
                }
            `}</style>
        </div>
    );
};

export default Arrow;
