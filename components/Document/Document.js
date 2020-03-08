import React from 'react';
import theme from '../../utils/styles/theme';

const Document = ({title, url, size, withExt = false, ext}) => {
    return (
        <div className='document'>
            <h4 className='document-title'>{title}</h4>
            <div className='document-details'>
                Документ / {withExt ? ext.toUpperCase() : 'PDF'}, {size}
            </div>
            <div className='btns-row'>
                {
                    !ext &&
                    <a href={url} className='btn' target='_blank'>
                        <img className='btn-img' src="/static/images/eye.png" alt="Смотреть"/>
                        Смотреть
                    </a>
                }
                <a href={url} className='btn' download>
                    <img className='btn-img' src="/static/images/download.png" alt="Скачать"/>
                    Скачать
                </a>
            </div>
            <style>{`
                .document {
                      padding-bottom: 30px;
                      margin-bottom: 30px;
                      border-bottom: 1px solid  #d3d3d3;
                    
                    }
                    .document:last-of-type {
                      border-bottom:none;
                      margin-bottom: 0;
                    }
                    .document-title {
                        color: #3b4255;
                        font-size: 18px;
                        font-weight: 400;
                        margin-bottom: 5px;
                        line-height: 24px;
                    }
                    .document-details {
                        color: #9498b0;
                        font-size: 16px;
                        font-weight: 400;
                        margin-bottom: 20px;    
                    }
                    .btns-row {
                      display:flex;
                      align-items: center;
                    }
                    .btn {
                        cursor: pointer;
                        height: 31px;
                        border-radius: 3px;
                        background-color: #1f4fc2;
                        display:inline-flex;
                        color:#fff;
                        align-items: center;
                        padding-left: 20px;
                        padding-right: 20px;
                        margin-right: 15px;
                        text-decoration:none;
                        transition: all .2s;
                    }
                    .btn:hover {
                      background-color:#2059e7;
                    }
                    .btn-img {
                      margin-right: 5px;
                    }
            `}</style>
        </div>
    );
};

export default Document;
