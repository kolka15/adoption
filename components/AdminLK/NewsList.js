import React, {useState, useEffect} from 'react';
import Input from '../../reusable/Input';
import Button from '../../reusable/Button';
import Modal from '../../reusable/Modal';
import {useSelector, useDispatch} from 'react-redux';
import {formatDateForApi, formatDateToDisplayDots} from '../../utils/formatDates';
import TextareaAutosize from 'react-textarea-autosize';
import {addNewsAdminStart, deleteNewsAdminStart} from '../../redux/admin-pages/admin-pages.actions';
import {fetchAllNewsStart} from '../../redux/news/news.actions';
import SpinnerDark from '../../reusable/SpinnerDark';

import ReactPaginate from 'react-paginate';
import {exists} from '../../utils/check';

import DatePicker, {registerLocale} from 'react-datepicker';
import ru from 'date-fns/locale/ru';

registerLocale('ru', ru);

let timeout = null;

const NewsList = ({token}) => {
    
    const dispatch = useDispatch();
    
    const {newsList} = useSelector(state => state.news);
    const {isFetching} = useSelector(state => state.adminPages);
    const {isFetchingNewsAll} = useSelector(state => state.news);
    
    const [addNewsModal, setAddNewsModalVisibility] = useState(false);
    const [search, setSearch] = useState('');
    const [deleteNewsModal, setDeleteNewsModalVisibility] = useState(false);
    const [newsIdToDelete, setNewsIdToDelete] = useState(null);
    const [newsModalData, setNewsModalData] = useState({});
    const [newsFormValidation, setNewsFormValidation] = useState(null);
    const [modalTitle, setModalTitle] = useState('');
    // const [paginationPage, setPaginationPage] = useState(1)
    
    
    const onAddNewsChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = e.target.value;
        
        setNewsModalData({...newsModalData, [name]: value});
        setNewsFormValidation(null);
    };
    
    const onSubmitNews = () => {
        
        if (
            !Object.keys(newsModalData).length ||
            !newsModalData.title ||
            !newsModalData.short_text ||
            !newsModalData.full_text ||
            !newsModalData.link ||
            !newsModalData.publication_date) {
            setNewsFormValidation('Заполните все поля');
            return;
        }
        
        dispatch(addNewsAdminStart(token, newsModalData));
        setNewsModalData({});
        setAddNewsModalVisibility(false);
        setNewsFormValidation(null);
    };
    
    const onDeleteQuestion = id => {
        setNewsIdToDelete(id);
        setDeleteNewsModalVisibility(true);
    };
    
    const onConfirmDeleteQuestion = () => {
        dispatch(deleteNewsAdminStart(token, newsIdToDelete));
        setDeleteNewsModalVisibility(false);
        setNewsIdToDelete(null);
    };
    
    
    const onSearch = (e) => {
        /*const val = e.target.value;
        
        setSearch(val);
        
        clearTimeout(timeout);
        
        if (!val.length) {
            setFaqFiltered(faq);
            return;
        }
        timeout = setTimeout(() => {
            setFaqFiltered(faq.filter(el => el.question.toLowerCase().includes(val.toLowerCase())));
        }, 700);*/
    };
    
    const onClearSearch = () => {
        setSearch('');
        
    };
    
    const onEdit = id => {
        
        setModalTitle('Редактировать новость');
        setNewsModalData(newsList.items.filter(el => el.id === id)[0]);
        setAddNewsModalVisibility(true);
    };
    
    const handlePageClick = ({selected}) => {
        dispatch(fetchAllNewsStart(
            {
                year: '',
                month: '',
                limit: 10,
                page: selected + 1,
            }));
        
        window.scrollTo(0, 430);
    };

    return (
        <>
            <div>
                <div className='faq-row'>
                    <Input placeholder='Поиск' search={!search.length} handleChange={onSearch} value={search}/>
                    {search && <i className='clear-filed' onClick={onClearSearch}>&times;</i>}
                </div>
                <div className='faq-row'>
                    <Button plus text='Добавить новость' handleClick={() => {
                        setAddNewsModalVisibility(true);
                        setNewsModalData({});
                        setModalTitle('Добавить новость');
                    }}/>
                </div>
                {
                    isFetching ?
                        <SpinnerDark/> :
                        <>
                            <div className='table-wrapper'>
                                <table className='table'>
                                    <thead>
                                        <tr>
                                            <th className='table__title'>заголовок</th>
                                            <th>Дата</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            newsList && newsList.items.map((news, i) => (
                                                <tr key={i}>
                                                    <td className='table__main-col'
                                                        onClick={() => onEdit(news.id)}>{news.title}</td>
                                                    <td>{formatDateToDisplayDots(news.publication_date)}</td>
                                                    <td className='table__functional-col'>
                                                        <img className='table__remove-btn'
                                                            src="/static/images/cross-in-circle.png"
                                                            alt="remove"
                                                            onClick={() => onDeleteQuestion(news.id)}
                                                            role="button"/>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                                {isFetchingNewsAll && <div className='table-loading-cover'/>}
                            </div>
                            <div className='pagination-wrapper'>
                                <ReactPaginate
                                    breakLabel={'...'}
                                    breakClassName={'break-me'}
                                    pageCount={newsList ? newsList.meta.pages : 0}
                                    marginPagesDisplayed={1}
                                    pageRangeDisplayed={2}
                                    onPageChange={handlePageClick}
                                    containerClassName={'pagination'}
                                    subContainerClassName={'pages pagination'}
                                    activeClassName={'active'}
                                />
                            </div>
                        </>
                    
                }
            </div>
            {
                addNewsModal &&
                <Modal setModalVisibility={setAddNewsModalVisibility}>
                    <div className='add-question-modal'>
                        <h3 className='add-question-modal__title'>{modalTitle}</h3>
                        <div className='add-question-modal__row'>
                            <span className='add-question-modal__label'>Заголовок</span>
                            <TextareaAutosize minRows={2} name='title' value={exists(newsModalData['title'])}
                                onChange={onAddNewsChange}/>
                        </div>
                        
                        <div className='add-question-modal__row'>
                            <span className='add-question-modal__label'>Краткое содержание</span>
                            <TextareaAutosize minRows={3} name='short_text' value={exists(newsModalData['short_text'])}
                                onChange={onAddNewsChange}/>
                        </div>
                        
                        
                        <div className='add-question-modal__row'>
                            <span className='add-question-modal__label'>Содержание</span>
                            <TextareaAutosize minRows={4} name='full_text' value={exists(newsModalData['full_text'])}
                                onChange={onAddNewsChange}/>
                        </div>
                        <div className='add-question-modal__row'>
                            <span className='add-question-modal__label'>Ссылка</span>
                            <Input name='link' value={exists(newsModalData['link'])} handleChange={onAddNewsChange}/>
                        </div>
                        
                        <div className='add-question-modal__row'>
                            <span className='add-question-modal__label'>Дата размещения </span>
                            <div className='datepicker-wrapper'>
                                <DatePicker
                                    selected={newsModalData && newsModalData.publication_date ? new Date(newsModalData.publication_date) : ''}
                                    onChange={date => setNewsModalData({
                                        ...newsModalData,
                                        publication_date: formatDateForApi(date)
                                    })}
                                    locale={ru}
                                    shouldCloseOnSelect={true}
                                    dateFormat='dd.MM.yyyy'
                                    forceShowMonthNavigation
                                />
                            </div>
                        </div>
                        
                        <div className='add-question-modal__row add-question-modal__row_center'>
                            <Button text='Сохранить' handleClick={onSubmitNews}/>
                        </div>
                        <div className='add-question-modal__validation-row'>
                            {newsFormValidation}
                        </div>
                    </div>
                </Modal>
            }
            {
                deleteNewsModal &&
                <Modal setModalVisibility={setDeleteNewsModalVisibility}>
                    <div className='add-question-modal'>
                        <h3 className='add-question-modal__title'>Удалить новость?</h3>
                        
                        <div className='add-question-modal__row add-question-modal__row_multiple'>
                            <div className='x-gap'>
                                <Button text='Отмена' handleClick={() => {
                                    setDeleteNewsModalVisibility(false);
                                    setNewsIdToDelete(null);
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
                .table__title {
                  width: 100%;
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
                    color: #e60000;
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
                .pagination-wrapper {
                  margin-top: 40px;
                }
                .datepicker-wrapper {
                  width: 150px;
                }
                .table-wrapper {
                  position: relative;
                }
                .table-loading-cover {
                  position: absolute;
                  top: 0;
                  left: 0;
                  right: 0;
                  bottom: 0;
                  background:rgba(255,255,255,0.57);
                  animation: .2s loading forwards;
                }
                @keyframes loading {
                  0% {
                    opacity: 0;
                  }
                  100% {
                    opacity: 1;
                  }
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

export default NewsList;
