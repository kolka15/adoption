import React, {useEffect, useRef} from 'react';
import Scrollbar from '../../reusable/Scrollbar';
import theme from '../../utils/styles/theme';
import {useSelector} from 'react-redux';
import {formatDateToDisplayDots} from '../../utils/formatDates';

const DataScrollList = () => {

    const {filesList} = useSelector(state => state.adminData);


    return (
        <>
            <h4 className='list-title'>загруженные файлы</h4>
            {
                filesList && filesList.length ?
                    <Scrollbar height={565}>
                        {
                            filesList.map((file, i) => (
                                <div className='list-item' key={i}>
                                    <div className='list-item__select-wrapper'>
                                        <span className='list-item__name'>{file.file_name}</span>
                                        <span
                                            className='list-item__date'>{formatDateToDisplayDots(file.date_upload)}</span>
                                    </div>
                                    {/*<a href='#' className='download-btn' download/>*/}
                                </div>
                            ))
                        }
                    </Scrollbar> : 'Нет файлов'
            }

            <style jsx>{`
                .list-title {
                    color: #3b4255;
                    font-size: 16px;
                    font-weight: 500;
                    line-height: 1.25;
                    text-transform: uppercase;
                    margin: 0 0 10px; 
                }
                .list-item {
                    color: #60678e;
                    font-weight: 700;
                    line-height: 1.25;
                    border-bottom: 1px solid #ccc;
                    min-height: 60px;
                    padding: 10px 0;
                    display:flex;
                    align-items: center;
                    padding-left: 25px;
                    padding-right: 10px;
                    margin-right: 30px;        
                }
                .list-item.active  {
                  background-color: #f1f5fe;
                }
                .list-item__select-wrapper {
                }
                .list-item__date {
                    font-weight: 400;
                    line-height: 1.5;
                    font-size: 13px;
                    margin-right: 5px;
                }
                .list-item__name {
                  display:inline-block;
                    margin-right: 10px;
                    word-break: break-all;
                }
                .download-btn {
                    display:inline-block;
                    width: 36px;
                    height: 36px;
                    background: #1641a8 url("/static/images/download.png") center no-repeat;
                    border-radius: 50%;
                    margin-left:auto;
                    flex-shrink: 0;    
                }
            `}</style>
        </>
    );
};

export default DataScrollList;
