import React from 'react';
import Select, {components} from 'react-select';
import theme from '../utils/styles/theme';
import check from '../static/images/check.png';
import {format} from 'date-fns';
import {ru} from 'date-fns/locale';

const CustomSelect = ({
    label,
    options,
    handleChange,
    value,
    styles,
    isMulti = false,
    name,
    placeholder = '',
    row = false,
    defaultValue,
    deleteIcon,
    onDelete,
    isDisabled
}) => {
    const defaultStyles = {
        control: styles => ({
            ...styles,
            borderColor: 'transparent',
            border: '1px solid #d7dbe0',
            color: '#60678e',
            boxShadow: 'none',
            minHeight: '47px',
            minWidth: '80px',
            ':active': {
                borderColor: 'transparent',
                border: '1px solid #d7dbe0',
                boxShadow: 'none'
            },
            ':hover': {
                borderColor: 'transparent',
                border: '1px solid #d7dbe0',
                boxShadow: 'none'
            }
        }),
        singleValue: (styles) => ({
            ...styles, color: '#3b4255'
        }),
        menu: styles => ({ ...styles, zIndex: 999 }),
        multiValue: (styles) => ({...styles, color: '#3b4255', backgroundColor: '#fff', border: '1px solid #d7dbe0'}),
        multiValueLabel: (styles) => ({...styles, color: '#3b4255'}),
        multiValueRemove: (styles) => ({...styles, color: '#60678e'}),
        option: (styles, {isSelected, isDisabled}) => {
            return {
                ...styles,
                backgroundColor: '#fff',
                color: isDisabled ? '#eee' : isSelected ? '#60678e' : '#3b4255',
                lineHeight: 1.2,

                ':active': {
                    color: '#60678e'
                },
                ':hover': {
                    ...styles[':hover'],
                    color: isDisabled ? '#eee' : '#60678e',
                    cursor: isDisabled ? 'not-allowed' : 'pointer'
                }
            };
        }
    };
    const customStyles = styles ? styles : defaultStyles;

    const {Option} = components;
    const {SingleValue} = components;

    const IconOption = (props) => {

        if (props.data.label === 'Региональный уровень')
            return (
                <Option {...props}>
                    {props.data.label}
                </Option>
            );

        if (props.data.appointmentSelect)
            return (
                <Option {...props}>
                    <div className='hours-item'>
                        <div className='hours-item__inner-wrapper'>
                            <div className='hours-item__icon-container'>
                                <img src={check} alt="check"/>
                            </div>
                            <div>
                                <div>
                                    <span
                                        className='date'>{format(new Date(props.data.appointmentSelect.date), 'dd.M.yyyy', {locale: ru})}</span>
                                    <span className='date'>{props.data.appointmentSelect.start_time}</span>
                                    <span className='day-of-week'>
                                        ({format(new Date(props.data.appointmentSelect.date), 'eeee', {locale: ru})})
                                    </span>
                                </div>
                                <div className='cabinet'>
                                    кабинет № {props.data.appointmentSelect.room.room_number}
                                </div>
                            </div>
                        </div>
                    </div>
                </Option>
            );

        return (
            <Option {...props}>
                {props.data.label}
                {deleteIcon && <span onClick={e => onDelete(e, props)} className='delete-icon'>{deleteIcon}</span>}
            </Option>
        );
    };


    const SingleValueAppointment = ({children, ...props}) => {
        if (props.data.appointmentSelect) {
            return (
                <SingleValue {...props}>
                    <div className='hours-item'>
                        <div className='hours-item__inner-wrapper'>
                            <div className='hours-item__icon-container'>
                                <img src={check} alt="check"/>
                            </div>
                            <div>
                                <div>
                                    <span
                                        className='date'>{format(new Date(props.data.appointmentSelect.date), 'dd.M.yyyy', {locale: ru})}</span>
                                    <span className='date'>{props.data.appointmentSelect.start_time}</span>
                                    <span className='day-of-week'>
                                        ({format(new Date(props.data.appointmentSelect.date), 'eeee', {locale: ru})})
                                    </span>
                                </div>
                                <div className='cabinet'>
                                    кабинет № {props.data.appointmentSelect.room.room_number}
                                </div>
                            </div>
                        </div>
                    </div>
                </SingleValue>
            );
        }

        return (
            <SingleValue {...props}>
                {children}
            </SingleValue>
        );
    };

    return (
        <div className='select'>
            <label>
                <span className='label'>{label}</span>
                <Select
                    options={options}
                    styles={customStyles}
                    value={value}
                    onChange={(selectedOption) => handleChange(selectedOption, name)}
                    isMulti={isMulti}
                    name={name}
                    placeholder={placeholder}
                    instanceId={name}
                    defaultValue={defaultValue}
                    components={{Option: IconOption, SingleValue: SingleValueAppointment}}
                    isDisabled={isDisabled}
                    noOptionsMessage={() => 'Без вариантов'}
                    // menuIsOpen
                />
            </label>

            <style jsx>{`
                .label {
                    margin-bottom: 7px; 
                    display: inline-block;
                    color: ${theme.colors.lavender.plain};
                    margin-right: ${row ? '10px' : '0'};
                }
                label {
                    display: ${row ? 'flex' : 'block'};
                    align-items: baseline;
                 }
                 
            `}</style>
            <style jsx global>{`
                .delete-icon {
                    position: absolute;
                    right: 7px;
                    color: red;
                    font-size: 20px;
                    opacity: .7;
                    cursor: pointer;
                }
                 .delete-icon:hover {
                    opacity: 1;
                }
                .hours-item__inner-wrapper {
                    padding: 0 15px 12px 15px;
                    display: flex;
                    align-items: center;
                    border-bottom: 1px solid #d3d6ea;
                    line-height: 1.5;
                    cursor: pointer;
                    font-size: 15px;
                    font-weight: 500;
                }
                .hours-item__icon-container {
                    display: flex;
                    align-items: center;
                    margin-right: 15px
                    
                }
                .hours-item {
                    height: 42px;
                }
                .date {
                    color:${theme.colors.blue.light};
                    font-size: 14px;
                    text-transform: uppercase;
                    margin-right: 15px;
                }
                .day-of-week {
                    font-size: 14px;
                    text-transform: uppercase;
                    color:${theme.colors.blue.light};

                }
                .cabinet {
                    color: #60678e;
                    text-transform: uppercase;
                    font-size: 14px;
                }
                
        `}</style>
        </div>
    );
};

export default CustomSelect;
