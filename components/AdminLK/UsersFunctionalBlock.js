import React, {useState} from 'react';
import Button from '../../reusable/Button';
import Input from '../../reusable/Input';
import Modal from '../../reusable/Modal';
import CustomSelect from '../../reusable/Select';
import theme from '../../utils/styles/theme';
import {useDispatch, useSelector} from 'react-redux';
import {filterSearchQuery} from '../../redux/admin-users/admin-users.actions';
import {selectUser} from '../../redux/admin-users/admin-users.actions';

import {userRolesSelectOptions} from '../../utils/stubs';


const UsersFunctionalBlock = () => {
    
    const [addUserModalVisible, toggleAddUserModalVisibility] = useState(false);
    const [deleteUserModalVisible, toggleDeleteUserModalVisibility] = useState(false);
    const [newUserState, setNewUserState] = useState({});
    
    const dispatch = useDispatch();
    const {searchQuery} = useSelector(state => state.adminUsers);
    
    const onSearch = e => {
        dispatch(filterSearchQuery(e.target.value));
        dispatch(selectUser(null));
    };
    
    return (
        <>
            <div className='functional-block'>
                <div className='functional-block__input-wrapper'>
                    <Input search placeholder='Поиск' value={searchQuery}
                        handleChange={e => onSearch(e)}/>
                </div>
                <div className='functional-block__btn-wrapper'>
                    <Button plus text='Добавить пользователя'
                        handleClick={() => toggleAddUserModalVisibility(!addUserModalVisible)}/>
                </div>
                <div className='functional-block__btn-wrapper'>
                    <Button bgColor='#9498b0' bgColorHover='#a50000' minus text='Удалить пользователя'
                        handleClick={() => toggleDeleteUserModalVisibility(!deleteUserModalVisible)}/>
                </div>
            </div>
            {
                addUserModalVisible &&
                <Modal setModalVisibility={toggleAddUserModalVisibility}>
                    <div className='handle-user'>
                        <h3 className='handle-user__title'>Добавить пользователя</h3>
                        <div className='handle-user__row'>
                            <Input label='Пользователь'/>
                        </div>
                        <div className='handle-user__row'>
                            <CustomSelect options={userRolesSelectOptions} name='newRole' label='Роль'/>
                        </div>
                        <div className='handle-user__row'>
                            <Input label='Email'/>
                        </div>
                        <div className='handle-user__row'>
                            <Input label='Новый пароль'/>
                        </div>
                        <div className='handle-user__row'>
                            <Input label='Повторите пароль'/>
                        </div>
                        <div className='handle-user__btn-row'>
                            <Button text='Сохранить'/>
                        </div>
                    </div>
                </Modal>
            }
            {
                deleteUserModalVisible &&
                <Modal setModalVisibility={toggleDeleteUserModalVisibility}>
                    <div className='handle-user'>
                        <h3 className='handle-user__title'>Вы уверены, что хотите удалить пользователя</h3>
                        <div className='handle-user__btn-row handle-user__btn-row_multiple'>
                            <div className='handle-user__btn-wrapper'>
                                <Button text='Отменить' handleClick={() => toggleDeleteUserModalVisibility(false)}/>
                            </div>
                            <div className='handle-user__btn-wrapper'>
                                <Button bgColor='#9498b0' bgColorHover='#a50000' text='Удалить'/>
                            </div>
                        
                        </div>
                    </div>
                </Modal>
            }
            
            
            <style jsx>{`
              .functional-block {
                margin-bottom: 35px;
                display:flex;
                align-items: center;
                justify-content: space-between;
              }
              .functional-block__input-wrapper {
                width: 48%;
              }
              .handle-user {
                background:#fff;
                padding: 40px 20% 85px;
              }
              .handle-user__title {
                text-align: center;
                color: #515971;
                font-size: 30px;
                font-weight: 400;
                line-height: 1.2;
              }
              .handle-user__row {
                margin-bottom: 40px;
              }
              .handle-user__btn-row {
                text-align:center;
              }
              .handle-user__btn-row_multiple {
                display:flex;
                flex-wrap: wrap;
                justify-content: center;
              }
              .handle-user__btn-wrapper {
                margin: 0 20px;
                margin-bottom: 15px;
              }
              @media screen and (max-width: 1070px) {
                   .functional-block {
                     display:block;
                   }
                   .functional-block__input-wrapper {
                      width: 100%;
                      margin-bottom: 15px;
                   }
                   .functional-block__btn-wrapper {
                      display: inline-block;
                      margin-right: 15px;
                      margin-bottom: 15px;
                   }
              }
              @media screen and (max-width: ${theme.media.phoneS}) {
                    .handle-user {
                      padding-left: 15px;
                      padding-right: 15px;
                    }
              }
            `}</style>
        
        </>
    );
};

export default UsersFunctionalBlock;
