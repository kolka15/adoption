import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {filterUserRole, selectUser} from '../../redux/admin-users/admin-users.actions';
import {userRolesRadios} from '../../utils/stubs';

const UsersSwitch = () => {
    
    const dispatch = useDispatch();
    const {userRole} = useSelector(state => state.adminUsers);
    
    const onTypeChange = e => {
        dispatch(filterUserRole(e.target.value));
        dispatch(selectUser(null));
    };
    
    
    return (
        <>
            <div className='users-switch'>
                {
                    userRolesRadios && userRolesRadios.map((user, i) => (
                        <div key={i} className='users-switch__item'>
                            <label>
                                <input type="radio"
                                    value={user.value}
                                    name='users'
                                    className='users-switch__input'
                                    checked={userRole === user.value}
                                    onChange={e => onTypeChange(e)}
                                />
                                <span className='users-switch__label'>{user.label}</span>
                            </label>
                        
                        </div>
                    ))
                }
            </div>
            <style jsx>{`
              .users-switch {
                margin-bottom: 15px;
                display:flex;
                flex-wrap: wrap;    
              }
              .users-switch__item {
                margin-bottom: 15px;
              }
              .users-switch__input {
                display:none;
              }
              .users-switch__label {
                display:inline-block;  
                color: #3b4255;
                font-size: 14px;
                font-weight: 700;
                line-height: 1.43;
                text-transform: uppercase;
                cursor: pointer;
                margin-right: 30px;
                position: relative;      
              }
              .users-switch__label:before {
                content: '';
                display:inline-block;
                width: 21px;
                height: 21px;
                border: 1px solid #d6dce1;
                background-color: #ffffff;
                border-radius: 50%;
                vertical-align:bottom;
                margin-right: 7px;  
              }
              .users-switch__input + .users-switch__label:after {
                content: '';
                position: absolute;
                display:block;
                width: 11px;
                height: 11px;
                background-color: #354055;    
                left: 6px;
                top: 6px;
                border-radius: 50%; 
                transition: all .2s;
              }
              .users-switch__input:not(:checked) + .users-switch__label:after {
                visibility:hidden;
                transform: scale(0);
              }
              .users-switch__input:checked + .users-switch__label:after {
                content: '';
                transform: scale(1);
                visibility:visible;
              }
            `}</style>
        </>
    );
};

export default UsersSwitch;
