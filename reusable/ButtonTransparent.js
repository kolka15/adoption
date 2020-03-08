import React from 'react';
import theme from '../utils/styles/theme';

const ButtonTransparent = ({text, type = 'button', modType, handleClick, disabled, plus}) => {
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
                {text}
            </button>

            <style jsx>{`
                .button {
                    border-radius: 4px;
                    border: 1px solid ${theme.colors.lavender.plain};
                    background: transparent;
                    color: ${theme.colors.lavender.plain};
                    line-height: ${theme.lineHeight.plain};
                    padding: 11px 30px;
                    min-width: 146px;
                    font-size: 16px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all .2s;
                }
                .button:disabled {
                    pointer-events: none;
                    background: ${theme.colors.blue.darkest};
                }
                .button:hover, .button:active {
                    background:  ${theme.colors.lavender.plain};
                    color: #fff;
                }
                .button_type-small {
                    padding: 4px 13px;
                    min-width: 91px;
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
                    background: url("/static/images/plus-icon.png") center no-repeat;
                }
                .button:hover .icon {
                    background-image: url("/static/images/plus-icon-white.png");
                }
                
            `}</style>
        </div>
    );
};

export default ButtonTransparent;
