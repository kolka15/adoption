import React from 'react';

import theme from '../utils/styles/theme';

const RadioBtn = ({ value, name, handleChange, label, selectedValue, disabled, type = 'radio' }) => {
    return (
        <div className='radio'>
            <label>
                <input
                    className='button'
                    type={type}
                    checked={type === 'radio' ? value == selectedValue : value}
                    disabled={disabled}
                    value={value}
                    name={name}
                    onChange={(e) => handleChange(e)}
                />
                <span className='label'>{label}</span>
            </label>

            <style jsx>{`
                .radio {
                    margin: 1rem 0;
                } 
                .label {
                    color: ${theme.colors.lavender.darkest};
                }
                .label:before {
                    content: "";
                    display: inline-block;
                    vertical-align: -.25em;
                    height: 1em;
                    width: 1em;
                    border-radius: 50%;
                    border: 1px solid ${theme.colors.lavender.darkest};
                    margin-right: .5em;
                }
                input:checked + .label:before {
                    border-color: ${theme.colors.lavender.darkest};
                    background-image: radial-gradient(
                        circle closest-side,
                        ${theme.colors.lavender.darkest} 0%,
                        ${theme.colors.lavender.darkest} 50%,
                        transparent 50%,
                        transparent 100%
                    );
                }
                input:disabled + .label {
                    opacity: .5;
                }
                input:disabled:checked + .label:before {
                    background-image: radial-gradient(
                        circle closest-side,
                        rgba(0, 0, 0, 0.5) 0%,
                        rgba(0, 0, 0, 0.5) 50%,
                        transparent 50%,
                        transparent 100%
                    );
                }
                input { 
                    display: none;
                }
            `}</style>
        </div>
    );
};

export default RadioBtn;
