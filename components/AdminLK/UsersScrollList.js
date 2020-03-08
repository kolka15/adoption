import React, {useEffect, useRef} from 'react';
import Scrollbar from '../../reusable/Scrollbar';
import theme from '../../utils/styles/theme';
import {useDispatch, useSelector} from 'react-redux';
import {selectUsers} from '../../redux/admin-users/admin-users.selectors';
import {selectUser} from '../../redux/admin-users/admin-users.actions';

let offsetTop = 0;

const UsersScrollList = () => {
    
    const scroll = useRef(null);
    const users = useSelector(selectUsers);
    const {selectedUser} = useSelector(state => state.adminUsers);
    const dispatch = useDispatch();
    
    
    const titleGenerator = user => {
        if (user.region && user.region.title) return user.region.title;
        return user.roles.join(', ');
    };
    
    const selected = (user, selectedUser) => {
        if (selectedUser && user.id === selectedUser.id) {
            return 'selected';
        }
        return '';
    };
    
    
    /*    useEffect(() => {
        scroll && scroll.current && scroll.current.scrollTop(offsetTop);
    }, [appointmentSelectedId]);*/
    
    return (
        <>
            {
                users && users.length ?
                    <Scrollbar height={680}
                        el={scroll}
                        onScrollFrame={e => offsetTop = e.scrollTop}
                    >
                        {
                            users && users.length && users.map((user) => (
                                <div className={`user-item ${selected(user, selectedUser)}`}
                                    onClick={() => dispatch(selectUser(user))} key={user.id}>
                                    {titleGenerator(user)}
                                </div>
                            ))
                        }
                    </Scrollbar> : 'Нет пользвателей'
            }
            
            <style jsx>{`
                .user-item {
                    line-height: 1.38;
                    color: #60678e;
                    font-size: 16px;
                    font-weight: 500;
                    cursor: pointer;
                    border-bottom: 1px solid #ccc;
                    height: 60px;
                    display:flex;
                    align-items: center;
                    padding-left: 25px;
                    padding-right: 10px;
                    margin-right: 30px;        
                }
                .user-item.selected  {
                  background-color: #f1f5fe;
                }
            `}</style>
        </>
    );
};

export default UsersScrollList;
