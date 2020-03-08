import React, {useState, useEffect, useRef} from 'react';
import Input from '../../reusable/Input';
import Button from '../../reusable/Button';
import Modal from '../../reusable/Modal';
import {useSelector, useDispatch} from 'react-redux';
import SpinnerDark from '../../reusable/SpinnerDark';
import CustomSelect from '../../reusable/Select';
import {selectDocumentTypes, selectInterLawFiles} from '../../redux/admin-pages/admin-pages.selectors';
import DatePicker, {registerLocale} from 'react-datepicker';
import {formatDateToDisplayDots, formatDateForApi} from '../../utils/formatDates';
import {
    submitInterLawFileStart,
    fetchInterLawFilesStart,
    deleteInterLawFileStart,
    editInterLawFileStart
} from '../../redux/admin-pages/admin-pages.actions';

import ru from 'date-fns/locale/ru';

registerLocale('ru', ru);


const FilesList = ({token}) => {

    const dispatch = useDispatch();
    const {isFetching} = useSelector(state => state.adminPages);
    const documentTypesOptions = useSelector(selectDocumentTypes);
    const interLawFiles = useSelector(selectInterLawFiles);

    const uploadFile = useRef(null);

    const [modalUploadFile, switchModalUploadFile] = useState(false);
    const [fileData, setFileData] = useState({});
    const [validation, setValidation] = useState(false);
    const [fileProcessing, switchFileProcessing] = useState(false);
    const [fileIdToModify, setFileIdToModify] = useState(null);
    const [modalConfirmDelete, switchModalConfirmDelete] = useState(false);
    const [editMode, switchEditMode] = useState(true);

    const fileAdd = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        setValidation(false);
        switchFileProcessing(true);

        if (file) {
            reader.readAsDataURL(file);
        }

        reader.addEventListener('load', function () {
            setFileData({...fileData, file: {...fileData.file, base64: reader.result, title: file.name}});
            switchFileProcessing(false);
        });
    };

    const validate = () => {
        if (!fileData.file || !fileData.file.title || !fileData.name || !fileData.category || !fileData.category.id || !fileData.date) {
            setValidation(true);
            return false;
        }
        return true;
    };

    const onAddLawFile = () => {
        switchEditMode(false);
        setFileData({});
        switchModalUploadFile(true);
    };

    const removeUploadFile = () => {
        uploadFile.current.value = '';
        setFileData({...fileData, file: {}});
    };

    const onFileDataChange = e => {
        const value = e.target.value;
        const name = e.target.name;
        setValidation(false);
        setFileData({...fileData, [name]: value});
    };

    const onDocTypeChange = type => {
        setValidation(false);
        setFileData({
            ...fileData,
            docType: type,
            category: {id: type.id}
        });
    };

    const onDocumentTypeFilter = (val) => {
        dispatch(fetchInterLawFilesStart(token, val.value));
    };

    const onDocumentSubmit = () => {
        if (!validate()) {
            return;
        }

        dispatch(submitInterLawFileStart(token, fileData));
        switchModalUploadFile(false);
        setFileData({});
    };

    const onDeleteLawFile = (id) => {
        switchModalConfirmDelete(true);
        setFileIdToModify(id);
    };

    const onDeleteLawFileConfirm = () => {
        dispatch(deleteInterLawFileStart(token, fileIdToModify));
        switchModalConfirmDelete(false);
        setFileIdToModify(null);
    };

    const onEditLawFile = id => {
        const file = interLawFiles.filter(file => file.id === id)[0];
        file.docType = {
            value: file.category.code,
            label: file.category.title,
            id: file.category.id
        };
        setFileData(file);
        setFileIdToModify(id);
        switchEditMode(true);
        switchModalUploadFile(true);
    };

    const onEditLawFileConfirm = () => {
        if (!validate()) {
            return;
        }

        dispatch(editInterLawFileStart(token, fileData, fileIdToModify));
        switchModalUploadFile(false);
        setFileData({});
        setFileIdToModify(null);
    };

    const doctypeOptionsForFilter = () => {
        if (!documentTypesOptions) return;

        const optionsCopy = [...documentTypesOptions];

        optionsCopy.unshift({label: 'Все типы', value: ''});
        return optionsCopy;
    };

    return (
        <>
            <div>
                <div className='block-bg'>
                    <CustomSelect options={doctypeOptionsForFilter()} name='doctype' handleChange={onDocumentTypeFilter}
                        placeholder='Все типы'
                        label='Тип документов'/>
                </div>
                <div className='row'>
                    <Button plus text='Добавить документ' handleClick={onAddLawFile}/>
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
                                    interLawFiles && interLawFiles.length ? interLawFiles.map((file, i) => (
                                        <tr key={i}>
                                            <td className='table__main-col'>
                                                <h4 className='table__doc-title'>{file.name}</h4>
                                                <div className='table__doc-type'>{file.category.title}</div>
                                            </td>
                                            <td>{formatDateToDisplayDots(file.date)}</td>
                                            <td className='table__functional-col'>
                                                <img src="/static/images/edit.png"
                                                    onClick={() => onEditLawFile(file.id)}
                                                    className='edit' alt="edit"/>
                                                <img className='table__remove-btn' src="/static/images/cross-in-circle.png"
                                                    alt="remove"
                                                    onClick={() => onDeleteLawFile(file.id)}
                                                    role="button"/>
                                            </td>
                                        </tr>
                                    )) : <tr>
                                        <td colSpan={3}>Ничего не найдено</td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                }
            </div>
            {
                modalUploadFile &&
                <Modal setModalVisibility={switchModalUploadFile}>
                    <div className="add-file-modal">
                        <h3 className='add-file-modal__title'>
                            {
                                editMode ? 'Редактировать документ' : 'Добавить документ'
                            }
                        </h3>
                        <div className="row row_flex">

                            <label className={'true-label '}>
                                <input className='data-download__input-file' ref={uploadFile} type="file"
                                    onChange={fileAdd}/>
                                <span className={'data-download__input-file-label '}>Выбрать файл</span>
                            </label>
                            <div className='add-file-modal__file-name-wrapper'>
                                {
                                    fileProcessing &&
                                    <img className='grey-spinner' src='/static/images/dark-spinner.gif' alt='spinner'/>

                                }
                                {
                                    fileData.file && fileData.file.title &&
                                    <img src="/static/images/cross-in-circle.png" alt="clear"
                                        className='data-download__clear-upload' onClick={removeUploadFile}/>
                                }
                                <Input readonly value={fileData.file && fileData.file.title ? fileData.file.title : ''}
                                    left_gap/>
                            </div>
                        </div>
                        <div className="row">
                            <Input handleChange={onFileDataChange} name='name'
                                value={fileData.name ? fileData.name : ''}
                                label='Название документа'
                                className='add-file-modal__title'/>
                        </div>
                        <div className="row row_flex row_flex-bottom">
                            <div className='add-file-modal__col-doctype'>
                                <CustomSelect options={documentTypesOptions}
                                    value={fileData.docType ? fileData.docType : null}
                                    handleChange={onDocTypeChange}
                                    name='doc-type'
                                    label='Тип документа'/>
                            </div>
                            <div className="add-file-modal__col-date">
                                <div className="add-file-modal__date">
                                    Дата
                                </div>
                                <DatePicker
                                    // selected={uploadData && uploadData.date_portal ? new Date(uploadData.date_portal): ''}
                                    // onChange={date => setUploadData({...uploadData, date_portal: formatDateForApi(date)})}
                                    locale={ru}
                                    shouldCloseOnSelect={true}
                                    dateFormat='dd.MM.yyyy'
                                    forceShowMonthNavigation
                                    selected={fileData.date ? new Date(fileData.date) : null}
                                    onChange={date => {
                                        setFileData({...fileData, date: formatDateForApi(date)});
                                        setValidation(false);
                                    }}

                                />
                            </div>
                        </div>
                        <div className='add-file-modal__submit-row'>
                            {
                                validation &&
                                <span className='validation'>Все поля должны быть заполнены</span>
                            }
                            <Button text={editMode ? 'Сохранить' : 'Загрузить'}
                                handleClick={editMode ? onEditLawFileConfirm : onDocumentSubmit}/>
                        </div>
                    </div>
                </Modal>
            }
            {
                modalConfirmDelete &&
                <Modal setModalVisibility={switchModalConfirmDelete}>
                    <div className="add-file-modal">
                        <h3 className='add-file-modal__title'>Удалить документ</h3>
                        <div className='add-file-modal__submit-row add-file-modal__submit-row_flex'>
                            <div className='x-gap'>
                                <Button text='Отмена' handleClick={() => {
                                    switchModalConfirmDelete(false);
                                    setFileIdToModify(null);
                                }}/>
                            </div>
                            <div className='x-gap'>
                                <Button bgColor='#9498b0' bgColorHover='#a50000' text='Удалить файл'
                                    handleClick={onDeleteLawFileConfirm}/>
                            </div>
                        </div>
                    </div>
                </Modal>
            }


            <style jsx>{`
                .row {
                  margin-bottom: 20px;
                  position: relative;
                }
                .row_flex {
                  display: flex;
                  position: relative;
                  flex-wrap: wrap;
                }
                .row_flex-bottom {
                  align-items: flex-end;
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
                    vertical-align: middle;  
                    white-space: nowrap;   
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
                  
                }
                .table__doc-title {
                    color: #3b4255;
                    font-size: 16px;
                    font-weight: 400;
                    line-height: 1.38;
                    margin: 0 0 7px;
                }
                .table__doc-type {
                    color: #1641a8;
                    font-size: 14px;
                    font-weight: 400;
                }
                .x-gap {
                  margin: 0 15px;
                }
                .block-bg {
                  padding: 25px 10px;
                  background-color: #f1f5fe;
                  margin-bottom: 30px;    
                }
                .block-bg_flex {
                  display:flex;
                  flex-wrap: wrap;
                }
                .block-bg__col-1 {
                  flex-basis: 70%;
                  padding-left: 15px;
                  padding-right: 15px;
                }
                .block-bg__col-2 {
                  flex-basis: 30%;
                  padding-left: 15px;
                  padding-right: 15px;
                }
                .add-file-modal {
                   background:#fff;
                  padding: 10px 60px 40px;
                  position: relative;   
                }
                .add-file-modal__title {
                   color: #515971;
                    font-size: 30px;
                    font-weight: 400;
                    margin-bottom: 50px;
                    text-align:center;          
                }
                .data-download__btns-row {
                  text-align:center;
                  margin-bottom: 15px;  
                }
                
                .data-download__input-file {
                  display:none;   
                }
                .data-download__input-file-label {
                  display:inline-block;
                    border-radius: 4px;
                    border: none;
                    height: auto;
                    background: #154ec9;
                    color: #fff;
                    line-height: 24px;
                    padding: 12px 30px;
                    min-width: 146px;
                    font-size: 16px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all .2s;
                }
                .data-download__input-file-label:hover {
                  background-color:#1e3684;
                }
                .upload-status-row {
                  text-align:center;
                  height: 32px;
                  font-size: 13px;
                }
                .true-label.disabled {
                  pointer-events: none;
                  opacity: .7;
                  cursor: not-allowed;
                }
                .add-file-modal__file-name-wrapper {
                  flex: 1;
                  margin-left: 15px;
                  position: relative;
                }
                .add-file-modal__col-doctype {
                  flex-basis: 80%;
                  padding-right: 15px;
                }
                .add-file-modal__col-date {
                  flex-basis: 20%;
                  
                }
                .add-file-modal__year-wrapper {
                  width: 40%;
                }
                .add-file-modal__submit-row {
                  text-align:center;
                  position: relative;
                }
                .add-file-modal__submit-row_flex {
                  display:flex;
                  flex-wrap: wrap;
                  justify-content: center;
                }
                
                .add-file-modal__date {
                    color: #60678e;
                    font-size: 16px;
                    font-weight: 400;
                    line-height: 2.18;
                }
                .data-download__clear-upload {
                  position: absolute;
                  cursor: pointer;
                  bottom: 11px;
                  left: 10px;
                  padding: 5px;
                }
                .validation {
                  position: absolute;
                  left: 0;
                  right: 0;
                  bottom: -30px;
                  font-size: 14px;
                  color:#da1800;
                }
                .grey-spinner {
                  position: absolute;
                  top: 9px;
                  left: 10px;
                }
                .edit {
                  margin-right: 15px;
                  cursor: pointer;
                  transition: all .2s;
                }
                .edit:hover {
                  background:#fff8c5;
                }
            `}</style>
        </>
    );
};

export default FilesList;
