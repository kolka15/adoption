import React, {useState, useEffect} from 'react';

import contactsData from './ContactsFormData';
import Input from '../../reusable/Input';
import Button from '../../reusable/Button';
import {selectContactsAdmin} from '../../redux/admin-pages/admin-pages.selectors';
import {useSelector, useDispatch} from 'react-redux';
import {submitInterLawFileStart} from '../../redux/admin-pages/admin-pages.actions';


const ContactsForm = ({token}) => {
    
    const director = ['Должность сотрудника', 'Должность руководителя', 'Должность заместителя'];
    const phone = ['Телефон сотрудника', 'Телефон руководителя', 'Телефон заместителя'];
    const fio = ['ФИО сотрудника', 'ФИО руководителя', 'ФИО заместителя'];
    const newEmployeeTemplate = {position: '', phone: '', fio: ''};
    
    const dispatch = useDispatch();
    
    const animationTime = 500;
    
    const contactsAdmin = useSelector(selectContactsAdmin);
    
    const [contactsState, setContactsState] = useState([]);
    const [animation, toggleAnimation] = useState(false);
    const [animateOut, toggleAnimateOut] = useState(null);
    
    useEffect(() => {
        if (!contactsAdmin || contactsAdmin.length === 0) {
            setContactsState(contactsData);
        } else {
            setContactsState(contactsAdmin);
        }
    }, [contactsAdmin]);
    
    const labelGenerator = (type, j, options) => {
        if (type === 'subdivision') {
            return options[0];
        } else {
            if (+j === 0) {
                return options[1];
            } else {
                return options[2];
            }
        }
    };
    
    const onFieldChange = (e, i, j) => {
        const contactsStateCopy = [...contactsState];
        const val = e.target.value;
        const name = e.target.name;
        
        if (j !== undefined) {
            contactsStateCopy[i].contacts[j][name] = val;
        } else {
            contactsStateCopy[i][name] = val;
        }
        
        setContactsState(contactsStateCopy);
    };
    
    const onAddContact = (i) => {
        const contactsStateCopy = [...contactsState];
        
        contactsStateCopy[i].contacts.push(newEmployeeTemplate);
        setContactsState(contactsStateCopy);
        
        toggleAnimation(true);
        setTimeout(() => {
            toggleAnimation(false);
        }, animationTime);
        
    };
    
    const onDeleteContact = (i, j) => {
        const contactsStateCopy = [...contactsState];
        
        toggleAnimateOut(j);
        
        setTimeout(() => {
            contactsStateCopy[i].contacts.splice(j, 1);
            setContactsState(contactsStateCopy);
            toggleAnimateOut(null);
        }, animationTime);
        
    };
    
    const onSubmitContacts = () => {
        dispatch(submitInterLawFileStart(token, contactsState));
    };
    
    return (
        <>
            <div className='contacts-form'>
                {
                    contactsState && contactsState.length !== 0 && contactsState.map((el, i) => (
                        <div className={'contacts-form__block'} key={i}>
                            <div className='contacts-form__row'>
                                <div
                                    className='contacts-form__label'>{el.type === 'department' ? 'Наименование департамента' : 'Наименование подразделения'}</div>
                                <textarea className='contacts-form__textarea'
                                    value={el.title ? el.title : ''}
                                    name='title'
                                    onChange={e => onFieldChange(e, i)} rows={2}/>
                            </div>
                            {
                                el.address !== undefined &&
                                <div className='contacts-form__row'>
                                    <Input label='Адрес' name='address' handleChange={e => onFieldChange(e, i)}
                                        value={el.address ? el.address : ''}/>
                                </div>
                            }
                            {
                                el.working_hours !== undefined &&
                                <div className='contacts-form__row'>
                                    <Input label='Рабочие часы' name='working_hours'
                                        value={el.working_hours ? el.working_hours : ''}
                                        handleChange={e => onFieldChange(e, i)}/>
                                </div>
                            }
                            
                            
                            {
                                el.contacts && el.contacts.map((contact, j) => (
                                    <div
                                        className={`
                                            contacts-form__contact-block
                                            ${animation && j === el.contacts.length - 1 ? 'animate' : ''}
                                            ${j === animateOut ? 'animate-out' : ''}
                                        `}
                                        key={`${i}_${j}`}>
                                        
                                        <div className="contacts-form__row contacts-form__row_flex">
                                            <div className="contacts-form__col-50">
                                                <Input label={labelGenerator(el.type, j, director)} name='position'
                                                    value={contact.position ? contact.position : ''}
                                                    handleChange={e => onFieldChange(e, i, j)}/>
                                            </div>
                                            <div className="contacts-form__col-50">
                                                <Input label={labelGenerator(el.type, j, phone)} name='phone'
                                                    value={contact.phone ? contact.phone : ''}
                                                    handleChange={e => onFieldChange(e, i, j)}/>
                                            </div>
                                        </div>
                                        <div className="contacts-form__row">
                                            <Input label={labelGenerator(el.type, j, fio)} name='fio'
                                                value={contact.fio ? contact.fio : ''}
                                                handleChange={e => onFieldChange(e, i, j)}/>
                                        </div>
                                        {
                                            el.type !== 'department' &&
                                            <div className="contacts-form__row contacts-form__row_flex">
                                                <div className='contacts-form__col-delete'>
                                                    <Button bgColor='#9498b0'
                                                        handleClick={() => onDeleteContact(i, j)}
                                                        bgColorHover='#a50000' minus
                                                        text='Удалить'/>
                                                </div>
                                                <div className="contacts-form__col-sort">
                                                    <Input label='Сортировка' name='sort_order'
                                                        value={contact.sort_order ? contact.sort_order : ''}
                                                        handleChange={e => onFieldChange(e, i, j)}/>
                                                </div>
                                            </div>
                                        }
                                    
                                    </div>
                                
                                ))
                            }
                            
                            {
                                el.type !== 'department' &&
                                <div className='contacts-form__contact-block'>
                                    <div className="contacts-form__row">
                                        <Button handleClick={() => onAddContact(i)} text='Добавить сотрудника' plus/>
                                    </div>
                                </div>
                            }
                        
                        
                        </div>
                    ))
                }
                <div className='row-submit'>
                    <Button handleClick={onSubmitContacts} text='Сохранить'/>
                </div>
            </div>
            
            <style jsx>{`
                    .contacts-form__block {
                        background-color: #f1f5fe;
                        padding: 30px 20px 10px;
                        margin-bottom: 40px;
                        color: #3b4255;
                        font-size: 16px;
                        font-weight: 400;
                        line-height: 1.38;
                    }
                    .contacts-form__row {
                      margin-bottom: 30px;
                    }
                    .contacts-form__row_flex {
                        display:flex;
                        flex-wrap: wrap;
                        align-items: flex-end;
                        margin-left: -15px;
                        margin-right: -15px;
                    }
                    .contacts-form__col-50 {
                        flex-basis: 50%;
                        padding: 0 15px;
                    }
                    .contacts-form__textarea {
                        border-radius: 4px;
                        border: 1px solid #d7dbe0;
                        background-color: #ffffff;
                        width: 100%;
                        padding: 10px;
                        color: #3b4255;
                        font-size: 16px;
                        font-weight: 400;
                        line-height: 1.38;
                        resize: vertical;
                        min-height: 70px;
                    }
                    .contacts-form__col-delete {
                      margin: 0 15px;
                    }
                    .contacts-form__col-sort {
                        margin: 0 15px;
                        width: 110px;
                    }
                    .contacts-form__label {
                        color: #60678e;
                        font-size: 16px;
                        font-weight: 400;
                        line-height: 1.38;
                        margin-bottom: 13px;
                    }
                    .contacts-form__contact-block {
                        border-top: 1px solid #ccc;
                        padding-top: 30px;
                    }
                    .contacts-form__contact-block.animate {
                        animation: ${animationTime + 'ms'} windowIn forwards;
                    }
                    .contacts-form__contact-block.animate-out {
                        animation: ${animationTime + 'ms'} windowOut forwards;
                    }
                    
                    
                    .row-submit {
                        text-align:center;
                        margin-bottom: 15px;
                    }
             
                    @keyframes windowIn {
                        0% {
                            opacity: 0;
                            max-height: 0;
                            overflow: hidden;
                        }
                        40% {
                          opacity: 0;
                        }
                        100% {
                            opacity: 1;
                            max-height: 500px;
                        }
                    }
                    @keyframes windowOut {
                        0% {
                            opacity: 1;
                            max-height: 500px;
                            overflow: hidden;

                        }
                        40% {
                          opacity: 0;
                        }
                        100% {
                            opacity: 0;
                            max-height: 0;
                        }
                    }
                    
                    
                    `}</style>
        </>
    );
};

export default ContactsForm;
