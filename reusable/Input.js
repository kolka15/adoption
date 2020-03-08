import React from 'react';
import theme from '../utils/styles/theme';

const Input = ({
    type,
    value,
    name,
    placeholder,
    label,
    handleChange,
    disabled,
    styles = {},
    pattern,
    required,
    search,
    readonly,
    left_gap
}) => {
    return (
        <label className='input-wrapper'>
            {
                label &&
                <span className='label'>
                    {label} &nbsp;
                    {required &&
                    <span style={{color: 'red'}}>*</span>
                    }
                </span>
            }

            <input
                type={type}
                value={value}
                name={name}
                placeholder={placeholder}
                onChange={handleChange}
                className='input'
                disabled={disabled}
                pattern={pattern}
                readOnly={readonly}
                // required={required}
            />

            <style jsx>{`
                .input-wrapper {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                }
                .label {
                    color: ${styles.labelColor ? styles.labelColor : theme.colors.lavender.plain};
                    line-height: 22px;
                    margin-bottom: .7rem;
                    font-size: 16px;
                }
                .input {
                    width: 100%;
                    border-radius: 4px;
                    border: 1px solid #d7dbe0;
                    height: ${styles.height ? styles.height : '47px;'};
                    color: ${styles.color ? styles.color : theme.colors.lavender.darkest};
                    padding: 16px 13px;
                    font-size: 16px;
                    ${search && 'background-image: url("/static/images/magn-glass.png")'};
                    background-repeat: no-repeat;
                    background-position: calc(100% - 9px) 9px;
                    ${search && 'padding-right: 45px'};
                    ${left_gap && 'padding-left: 40px'};
                }
                input:invalid {
                    border: 1px solid red;
                    outline-color: red;
                }
                input::placeholder {
                    color: #868991;
                }
                @media screen and (max-width: ${theme.media.phoneS}) {
                    input {
                        font-size: 14px!important;
                    }
                }
            `}</style>
        </label>
    );
};

export default Input;
