import React, {useState} from 'react';
import Input from '../../reusable/Input';
import CustomSelect from '../../reusable/Select';
import theme from '../../utils/styles/theme';
import Button from '../../reusable/Button';
import {useDispatch, useSelector} from 'react-redux';

import {editUser, submitUserEditionStart} from '../../redux/admin-users/admin-users.actions';
import {exists} from '../../utils/check';
import {userRolesSelectOptions} from '../../utils/stubs';
import SpinnerDark from '../../reusable/SpinnerDark';

const UsersDetails = ({token}) => {
    const dispatch = useDispatch();
    const {selectedUser} = useSelector(state => state.adminUsers);
    const {invalidEmail} = useSelector(state => state.adminUsers);
    const {isFetching} = useSelector(state => state.adminUsers);
    const [passwords, setPasswords] = useState({});
    const [validation, setValidation] = useState(false);
    const [passwordsValidation, setPasswordsValidation] = useState(false);
    
    
    const selectedOption = () => {
        if (selectedUser) {
            return userRolesSelectOptions.find(el => el.value === selectedUser.roles[0]);
        }
    };
    
    const onRoleChange = (val) => {
        dispatch(editUser({...selectedUser, roles: [`${val.value}`]}));
        setValidation(false);
    };
    
    const onTitleChange = e => {
        dispatch(editUser({...selectedUser, fio: e.target.value}));
        setValidation(false);
    };
    
    const onSetPassword = e => {
        const val = e.target.value;
        const name = e.target.name;
        setValidation(false);
        setPasswordsValidation(false);
        setPasswords({...passwords, [name]: val});
        if (name === 'plain_password') {
            dispatch(editUser({...selectedUser, plain_password: val}));
        }
    };
    
    const onSubmit = () => {
        if (!selectedUser.email || !passwords.plain_password || !passwords.confirm_password) {
            setValidation(true);
            return;
        }
        if (passwords.plain_password !== passwords.confirm_password) {
            setPasswordsValidation(true);
            return;
        }
        dispatch(submitUserEditionStart(token, selectedUser));
    };
    
    return (
        <>
            <div className='details-wrapper'>
                {
                    selectedUser &&
                    <div className='details'>
                        <div className='details__row'>
                            <Input label='Пользователь' name='title'
                                handleChange={onTitleChange}
                                value={exists(selectedUser.fio)}/>
                        </div>
                        <div className='details__row details__row_sm'>
                            <CustomSelect label='Роль' options={userRolesSelectOptions} name='roles'
                                handleChange={onRoleChange}
                                value={selectedOption()}/>
                        </div>
                        <div className='details__row details__row_sm'>
                            {
                                invalidEmail &&
                                <span className='validation validation_mail'>
                                    Этот email уже используется
                                </span>
                            }
                            <Input label='Email' name='email'
                                handleChange={e => {
                                    dispatch(editUser({...selectedUser, email: e.target.value}));
                                    setValidation(false);
                                }}/>
                        </div>
                        <div className='details__row details__row_sm'>
                            <Input handleChange={onSetPassword} value={exists(passwords.plain_password)}
                                name='plain_password' label='Новый пароль'/>
                        </div>
                        <div className='details__row details__row_sm'>
                            <Input handleChange={onSetPassword} value={exists(passwords.confirm_password)}
                                label='Повторите пароль' name='confirm_password'/>
                        </div>
                        <div className='details__btn-row'>
                            {
                                validation &&
                                <span className='validation'>
                                    Email и пароль должны быть заполнены
                                </span>
                            }
                            {
                                passwordsValidation &&
                                <span className='validation'>
                                    Пароли не совпадают
                                </span>
                            }
                            
                            <Button text='Сохранить' handleClick={onSubmit}/>
                        </div>
                    </div>
                }
            </div>
            
            
            <style jsx>{`
              .details {
                height: 680px;
                background-color: #f1f5fe;
                padding: 30px 35px;
              }
              .details__row {
                margin-bottom: 30px;
                position: relative;
              }
              .details__row_sm {
                padding-right: 30%;
              }
              .details__btn-row {
                text-align:center;
                position: relative;
              }
              .details-wrapper {
                height: 680px;
              }
              .validation {
                left: 0;
                right: 0;
                color: #d7000d;
                font-size: 13px;
                text-align: center;
                position: absolute;
                top: -25px;
              }
              .validation_mail {
                top: 10px;
                right: auto;
                left: 130px;
              }
              @media screen and (max-width: ${theme.media.tabletS}) {
                .details__row_sm {
                  padding-right: 0;
                }
                .details {
                  padding-left: 15px;
                  padding-right: 15px;
                }
              }
            `}</style>
        </>
    );
};

export default UsersDetails;