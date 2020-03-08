import React, {useState, useEffect} from 'react';
import Input from '../../reusable/Input';
import Button from '../../reusable/Button';
import Modal from '../../reusable/Modal';
import {useSelector, useDispatch} from 'react-redux';
import {formatDateToDisplayDots} from '../../utils/formatDates';
import TextareaAutosize from 'react-textarea-autosize';
import {addFaqQuestionStart, deleteFaqQuestionStart} from '../../redux/admin-pages/admin-pages.actions';
import SpinnerDark from '../../reusable/SpinnerDark';
import {selectFaq} from '../../redux/admin-pages/admin-pages.selectors';

let timeout = null;

const FaqList = ({token}) => {

    const {isFetching} = useSelector(state => state.adminPages);
    const faq = useSelector(selectFaq);

    const dispatch = useDispatch();

    const [addQuestionModal, setAddQuestionModalVisibility] = useState(false);
    const [search, setSearch] = useState('');
    const [deleteQuestionModal, setDeleteQuestionModalVisibility] = useState(false);
    const [questionIdToDelete, setQuestionIdToDelete] = useState(null);
    const [faqFiltered, setFaqFiltered] = useState(null);
    const [questionModalData, setQuestionModalData] = useState({});
    const [questionFormValidation, setQuestionFormValidation] = useState(null);
    const [modalTitle, setModalTitle] = useState('');

    const onAddQuestionChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = e.target.value;

        setQuestionModalData({...questionModalData, [name]: value});
        setQuestionFormValidation(null);
    };

    const onSubmitQuestion = () => {

        /* also edited with this method, if it breaks, do it with PUT method */

        if (!questionModalData.question && !questionModalData.answer) {
            setQuestionFormValidation('Заполните все поля');
            return;
        }
        dispatch(addFaqQuestionStart(token, questionModalData));
        setQuestionModalData({});
        setAddQuestionModalVisibility(false);
        setQuestionFormValidation(null);
    };

    const onDeleteQuestion = id => {
        setQuestionIdToDelete(id);
        setDeleteQuestionModalVisibility(true);
    };

    const onConfirmDeleteQuestion = () => {
        dispatch(deleteFaqQuestionStart(token, questionIdToDelete));
        setDeleteQuestionModalVisibility(false);
        setQuestionIdToDelete(null);
    };

    const onSearch = (e) => {
        const val = e.target.value;

        setSearch(val);

        clearTimeout(timeout);

        if (!val.length) {
            setFaqFiltered(faq);
            return;
        }
        timeout = setTimeout(() => {
            setFaqFiltered(faq.filter(el => el.question.toLowerCase().includes(val.toLowerCase())));
        }, 700);
    };

    const onClearSearch = () => {
        setSearch('');
        setFaqFiltered(faq);
    };

    const onEdit = id => {
        setModalTitle('Редактировать вопрос');
        setQuestionModalData(faq.filter(el => el.id === id)[0]);
        setAddQuestionModalVisibility(true);
    };

    useEffect(() => {
        setFaqFiltered(faq);
    }, [faq]);


    return (
        <>
            <div>
                <div className='faq-row'>
                    <Input placeholder='Поиск' search={!search.length} handleChange={onSearch} value={search}/>
                    {search && <i className='clear-filed' onClick={onClearSearch}>&times;</i>}
                </div>
                <div className='faq-row'>
                    <Button plus text='Добавить вопрос' handleClick={() => {
                        setAddQuestionModalVisibility(true);
                        setQuestionModalData({});
                        setModalTitle('Добавить вопрос');
                    }}/>
                </div>
                {
                    isFetching ?
                        <SpinnerDark/> :
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Название документа</th>
                                    <th>Дата</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    faqFiltered && faqFiltered.map((question, i) => (
                                        <tr key={i}>
                                            <td className='table__main-col'
                                                onClick={() => onEdit(question.id)}>{question.question}</td>
                                            <td>{formatDateToDisplayDots(question.created_at)}</td>
                                            <td className='table__functional-col'>
                                                <img className='table__remove-btn' src="/static/images/cross-in-circle.png"
                                                    alt="remove"
                                                    onClick={() => onDeleteQuestion(question.id)}
                                                    role="button"/>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                }
            </div>
            {
                addQuestionModal &&
                <Modal setModalVisibility={setAddQuestionModalVisibility}>
                    <div className='add-question-modal'>
                        <h3 className='add-question-modal__title'>{modalTitle}</h3>
                        <div className='add-question-modal__row'>
                            <Input label='Вопрос' name='question' handleChange={onAddQuestionChange}
                                value={questionModalData['question']}/>
                        </div>
                        <div className='add-question-modal__row'>
                            <span className='add-question-modal__label'>Ответ</span>
                            <TextareaAutosize minRows={3} name='answer' value={questionModalData['answer']}
                                onChange={onAddQuestionChange}/>
                        </div>
                        <div className='add-question-modal__row add-question-modal__row_center'>
                            <Button text='Сохранить' handleClick={onSubmitQuestion}/>
                        </div>
                        <div className='add-question-modal__validation-row'>
                            {questionFormValidation}
                        </div>
                    </div>
                </Modal>
            }
            {
                deleteQuestionModal &&
                <Modal setModalVisibility={setDeleteQuestionModalVisibility}>
                    <div className='add-question-modal'>
                        <h3 className='add-question-modal__title'>Удалить вопрос?</h3>

                        <div className='add-question-modal__row add-question-modal__row_multiple'>
                            <div className='x-gap'>
                                <Button text='Отмена' handleClick={() => {
                                    setDeleteQuestionModalVisibility(false);
                                    setQuestionIdToDelete(null);
                                }}/>
                            </div>
                            <div className='x-gap'>
                                <Button bgColor='#9498b0' bgColorHover='#a50000' text='Удалить вопрос'
                                    handleClick={onConfirmDeleteQuestion}/>
                            </div>
                        </div>

                    </div>
                </Modal>
            }

            <style jsx>{`
                .faq-row {
                  margin-bottom: 20px;
                  position: relative;
                }
                .table {
                  border-collapse: collapse;
                  width: 100%;   
                }
                .table thead {
                    border: 1px solid #d7dbe0;
                    background-color: #e8edf7;
                    text-align:left;       
                }
                .table thead th {
                    color: #3b4255;
                    font-size: 12px;
                    font-weight: 700;
                    line-height: 1.83;
                    text-transform: uppercase;
                    height: 55px;  
                    padding: 0 15px;
                }
                .table__functional-col {
                    text-align:right;        
                }
                .table tbody {
                    color: #3b4255;
                    font-size: 16px;
                    font-weight: 400;
                    line-height: 1.38;
                }
                .table tbody tr {
                    border: 1px solid #d7dbe0;
                }
                .table tbody td {
                  padding: 15px 10px;    
                }
                .table__remove-btn {
                    cursor: pointer;
                    border-radius: 50%;
                    transition: all .2s;    
                }
                .table__remove-btn:hover {
                  background-color:#fdd;
                }
                .table__main-col {
                  text-decoration:underline;
                  cursor: pointer;
                }
                .add-question-modal {
                  background:#fff;
                  padding: 30px;
                  position: relative;   
                }
                .add-question-modal__title {
                    color: #515971;
                    font-size: 30px;
                    font-weight: 400;
                    margin-bottom: 50px;
                    text-align:center;                 
                } 
                .add-question-modal__row {
                  margin-bottom: 30px;  
                }
                .add-question-modal__label {
                    color: #60678e;
                    font-size: 16px;
                    font-weight: 400;
                    line-height: 1.38;
                    display:block;
                    margin-bottom: 10px;    
                }
                .add-question-modal__row_center {
                  text-align:center;
                }
                .add-question-modal__row_multiple {
                    display: flex;
                    justify-content: center; 
                }
                .x-gap {
                  margin: 0 15px;
                }
                .add-question-modal__validation-row {
                    left: 0;
                    right: 0;            
                    color: #d7000d;
                    font-size: 14px;
                    text-align:center;
                    position: absolute;
                    bottom: 108px;
  
                }
                .clear-filed {
                  cursor: pointer;
                  color:#60678e;
                  font-size: 30px;
                  font-style:normal;
                  position: absolute;
                  right: 10px;
                  bottom: 9px;
                  line-height: 1;
                }
            `}</style>
            <style jsx global>{`
              .add-question-modal textarea {
                 width: 100%;  
                border-radius: 4px;
                border: 1px solid #d7dbe0;
                height: 47px;
                color: #3b4255;
                padding: 16px 13px;
                font-size: 16px;
                resize: vertical;
              }
            `}</style>
        </>
    );
};

export default FaqList;
