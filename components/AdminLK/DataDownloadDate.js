import React, {useState, useEffect} from 'react';
import Input from '../../reusable/Input';
import Button from '../../reusable/Button';
import {useDispatch, useSelector} from 'react-redux';
import {editLastUploadStart} from '../../redux/admin-data/admin-data.actions';
import {formatDateForApi} from '../../utils/formatDates';



import DatePicker, {registerLocale} from 'react-datepicker';

import ru from 'date-fns/locale/ru';
registerLocale('ru', ru);

const DataDownloadDate = () => {

    const dispatch = useDispatch();

    const {lastUpload, isFetching} = useSelector(state => state.adminData);
    const [uploadData, setUploadData] = useState({});

    const {token} = useSelector(state => state.login);

    const handleDateChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;

        setUploadData({...uploadData, [name]: value});
    };

    useEffect(() => {
        setUploadData(lastUpload);
    }, [lastUpload]);

    const saveDate = () => {
        dispatch(editLastUploadStart(uploadData, token));
    };


    return (
        <>
            <div className='data-download'>
                <div className='data-download__set-date'>
                    <span className='data-download__date-caption'>Детей на портале:</span>
                    <div className='data-download__date-input-wrapper'>
                        <Input name='count' value={uploadData && uploadData.count ? uploadData.count : ''}
                            handleChange={handleDateChange}/>
                    </div>
                    <Button width={106} modType='small' text={isFetching ? '...' : 'Сохранить'} handleClick={saveDate}/>

                </div>
                <div className='data-download__set-date'>
                    <span className='data-download__date-caption'>Установленная дата на портале:</span>
                    <div className='data-download__date-input-wrapper'>
                        <DatePicker
                            selected={uploadData && uploadData.date_portal ? new Date(uploadData.date_portal): ''}
                            onChange={date => setUploadData({...uploadData, date_portal: formatDateForApi(date)})}
                            locale={ru}
                            shouldCloseOnSelect={true}
                            dateFormat='dd.MM.yyyy'
                            forceShowMonthNavigation
                        />
                    </div>
                    <Button width={106} modType='small' text={isFetching ? '...' : 'Сохранить'} handleClick={saveDate}/>

                </div>

            </div>

            <style jsx>{`
                .data-download {
                    padding: 50px 35px;
                    background-color: #f1f5fe;
                    color: #3b4255;
                    font-size: 18px;
                    font-weight: 400;
                    margin-bottom: 35px;    
                }
                .data-download__row {
                    margin-bottom: 10px;
                    margin-top: 0;     
                }
                .data-download__set-date {
                    display:flex;
                    align-items: center;
                    margin-bottom: 15px;        
                }
                .data-download__date-input-wrapper {
                    width: 115px;
                    margin: 0 30px 0 15px;    
                }
                .data-download__date {
                    color: #154ec9;
                    font-weight: 700;
                    line-height: 1.67;
                    margin-left: 5px;    
                }
                .data-download__date-caption {
                    width: 280px;
                    text-align:right;    
                }
            
            `}</style>
        </>
    );
};

export default DataDownloadDate;
