import React, {useState, useRef} from 'react';
import Input from '../../reusable/Input';
import Button from '../../reusable/Button';
import {formatDateToDisplayDots, formatDateForApi} from '../../utils/formatDates';
import server from '../../utils/config';
import {useSelector} from 'react-redux';


const DataUpload = () => {

    const [file, addFile] = useState(null);
    const [fileDate, setFileDate] = useState({});
    const [uploadStatus, setUploadStatus] = useState(null);
    const [disableBtns, setDisableBtns] = useState(false);

    const uploadFile = useRef(null);

    const {token} = useSelector(state => state.login);

    const fileAdd = e => {
        const file = e.target.files[0];

        setUploadStatus(null);
        addFile(file);
        setFileDate({...fileDate, date: formatDateToDisplayDots(file.lastModifiedDate), origin: file.lastModifiedDate});

    };

    const removeUploadFile = () => {
        uploadFile.current.value = '';
        setFileDate(null);
        addFile(null);
    };

    /*
    *
    * переделать в сагу
    *
    * */

    const onUpload = () => {
        const file = uploadFile.current.files[0];

        if (!file) {
            setUploadStatus('Файл не выбран');
            return;
        }
        const supportedFilesTypes = ['application/json'];
        const {type} = file;

        if (supportedFilesTypes.indexOf(type) > -1) {
            const payload = new FormData();
            setDisableBtns(true);

            payload.append('file', file);
            payload.append('date_upload', fileDate && fileDate.origin ? formatDateForApi(fileDate.origin) : '');

            const xhr = new XMLHttpRequest();

            xhr.upload.onprogress = (e) => {
                const done = e.position || e.loaded;
                const total = e.totalSize || e.total;
                const perc = (Math.floor(done / total * 1000) / 10);

                if (perc >= 100) {
                    setUploadStatus('Файл загружен, после его обработки, обновлённая информация о детях появится на Портале.');
                    setDisableBtns(false);
                } else {
                    setUploadStatus(`${perc}%`);
                }
            };

            xhr.open('POST', `${server}/api/private/upload`);
            xhr.setRequestHeader('Authorization', `Bearer ${token}`);
            xhr.send(payload);
            xhr.onerror = e => {
                setUploadStatus('Ошибка загрузки: ' + e.target.status);
            };
        } else {
            setUploadStatus('Неверный формат файла');
        }
    };



    return (
        <>
            <div className='data-download'>
                <h3 className='data-download__block-title'>Загрузка производной информации</h3>
                <div className='data-download__upload-info'>
                    <div className="data-download__upload-info-col1">
                        <Input label='Дата' handleChange={e => setFileDate({...fileDate, date: e.target.value})}
                            value={fileDate && fileDate.date ? fileDate.date : ''}/>
                    </div>
                    <div className="data-download__upload-info-col2">
                        {
                            file &&
                            <img src="/static/images/cross-in-circle.png" alt="clear"
                                className='data-download__clear-upload' onClick={removeUploadFile}/>
                        }
                        <Input label='Документ' readonly left_gap value={file ? file.name : ''}/>
                    </div>
                </div>
                <div className="data-download__btns-row">
                    <div className='data-download__btn-wrapper'>
                        <label className={`true-label ${disableBtns ? 'disabled' : ''}`}>
                            <input accept=".json" className='data-download__input-file' ref={uploadFile} type="file"
                                onChange={fileAdd}/>
                            <span className={'data-download__input-file-label '}>Выбрать файл</span>
                        </label>
                    </div>
                    <div className='data-download__btn-wrapper'>
                        <Button disabled={disableBtns} text='Загрузить' bgColor='#007bff' handleClick={onUpload}/>
                    </div>


                </div>
                <div className='upload-status-row'>
                    {uploadStatus}
                </div>
            </div>

            <style jsx>{`

                .data-download {
                    padding: 35px;
                    background-color: #f1f5fe;
                    color: #3b4255;
                    font-size: 18px;
                    font-weight: 400;
                    margin-bottom: 35px;    
                }
                .data-download__block-title {
                    color: #154ec9;
                    font-size: 18px;
                    font-weight: 700;
                    line-height: 1.89;
                    text-transform: uppercase;
                    margin-bottom: 25px;
                    margin-top: 0;
                }
                .data-download__row {
                    margin-bottom: 10px;
                    margin-top: 0;     
                }
                .data-download__date {
                    display:flex;
                    align-items: center;
                    
                }
                .data-download__date-input-wrapper {
                    width: 105px;
                    margin: 0 30px 0 15px;    
                }
                .data-download__upload-info {
                  display:flex;
                  flex-wrap: wrap;
                  margin-bottom: 35px;
                }
                .data-download__upload-info-col1 {
                  flex:0 0 110px;
                  margin-right: 30px;
                }
                .data-download__upload-info-col2 {
                  flex: 1;
                  position: relative;
                }
                .data-download__clear-upload {
                  position: absolute;
                  cursor: pointer;
                  bottom: 11px;
                  left: 10px;
                  padding: 5px;
                }
                .data-download__btn-wrapper {
                  margin: 0 20px; 
                }
                .data-download__btns-row {
                  text-align:center;
                  margin-bottom: 15px;  
                }
                .data-download__btn-wrapper {
                  margin: 0 15px;
                  display:inline-block;    
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
            `}</style>
        </>
    );
};

export default DataUpload;
