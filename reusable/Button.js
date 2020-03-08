import React from 'react';
import theme from '../utils/styles/theme';

const Button = ({
    text,
    type,
    modType,
    handleClick,
    disabled,
    bgColor,
    bgColorHover,
    plus,
    minus,
    fixedHeight,
    width
}) => {
    return (
        <div className={`${disabled ? 'disabled' : ''}`}>
            <button
                type={type}
                onClick={handleClick}
                className={`button ${modType ? `button_type-${modType}` : ''}`}
                disabled={disabled}
            >
                {
                    plus &&
                    <i className='icon'/>
                }
                {
                    minus &&
                    <i className='icon-minus'/>
                }

                {text}
            </button>

            <style jsx>{`
                .button {
                    border-radius: 4px;
                    border: none;
                    height: ${fixedHeight ? fixedHeight + 'px' : 'auto'};
                    background: ${bgColor ? bgColor : theme.colors.blue.dark};
                    color: #fff;
                    line-height: ${theme.lineHeight.plain};
                    padding: 12px 30px;
                    min-width: 146px;
                    font-size: 16px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all .2s;
                    ${width ? 'width:' + width + 'px' : ''}
                }
                .button:disabled {
                    pointer-events: none;
                    background: ${theme.colors.blue.darkest};
                }
                .button:hover, .button:active {
                    background-color: ${bgColorHover ? bgColorHover : theme.colors.blue.darkest}
                }
                .button_type-small {
                    padding: 4px 13px;
                    min-width: 91px;
                }
                .button_type-purple {
                    background-color: #60678e;
                }
                .button_type-purple:hover, .button_type-purple:active {
                    background-color: #515971
                }
                .disabled {
                    cursor: not-allowed;
                }
                .icon {
                    margin-right: 10px;
                    vertical-align: middle;
                    width: 17px;
                    height: 17px;
                    display: inline-block;
                    background: url("/static/images/plus-icon-white.png") center no-repeat;
                }
                .icon-minus {
                    margin-right: 10px;
                    vertical-align: middle;
                    width: 17px;
                    height: 17px;
                    display: inline-block;
                    background: url("/static/images/minus-icon-white.png") center no-repeat;
                }
                
                .button:hover .icon {
                    background-image: url("/static/images/plus-icon-white.png");
                }
            `}</style>
        </div>
    );
};

export default Button;
