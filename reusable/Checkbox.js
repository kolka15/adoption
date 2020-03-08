import React from 'react';
import theme from '../utils/styles/theme';

const Checkbox = ({ name, value, isChecked, id, label, disabled, handleChange, style = {}, required }) => {
    return (
        <div className='checkbox-wrapper'>
            <input
                id={id}
                type='checkbox'
                value={value}
                name={name}
                checked={isChecked}
                disabled={disabled}
                onChange={handleChange}
                className='checkbox'
            />
            <label className='label' htmlFor={id}>
                {label} &nbsp;
                {required &&
                <span style={{color: 'red'}}>*</span>
                }
            </label>

            <style jsx>{`
                .checkbox {
                    position: absolute;
                    opacity: 0;
                }
                .checkbox + label {
                    position: relative;
                    cursor: pointer;
                    padding: 0;
                    display: flex;
                }
                .checkbox + label:before {
                    content: '';
                    margin-right: 10px;
                    display: inline-block;
                    vertical-align: middle;
                    width: 20px;
                    height: 20px;   
                    background: #fff;
                    border: 1px solid #cccccc;
                    border-radius: 4px;
                    flex-shrink: 0;
                }
                .checkbox:disabled {
                    color: #b8b8b8;
                    cursor: auto;
                }
                .checkbox:disabled + label:before {
                    box-shadow: none;
                    background: #ddd;
                }
                .checkbox:checked + label:after {
                    content: '';
                    position: absolute;
                    left: 6px;
                    top: 10px;
                    background: ${theme.colors.grey.dark};
                    width: 2px;
                    height: 2px;
                    box-shadow: 
                      2px 0 0 ${theme.colors.grey.dark},
                      4px 0 0 ${theme.colors.grey.dark},
                      4px -2px 0 ${theme.colors.grey.dark},
                      4px -4px 0 ${theme.colors.grey.dark},
                      4px -6px 0 ${theme.colors.grey.dark},
                      4px -8px 0 ${theme.colors.grey.dark};
                    transform: rotate(45deg);
                }
                label {
                    color: ${theme.colors.lavender.darkest};
                    font-size: 16px;
                    font-weight: 300;
                    line-height: 22px;
                }
            `}</style>
        </div>
    );
};

export default Checkbox;
