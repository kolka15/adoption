import React from 'react';
import theme from '../../utils/styles/theme';
import cutText from '../../utils/cutText';

const RecommendationItem = ({ item }) => {
    const { text, link } = item;
    return (
        <div className='recommendation-item'>
            <div className='text'>{cutText(text, 80)}</div>
            <button className='btn'>
                <a href={link} download>
                    <span>Скачать</span>
                    <img src='/static/images/download.png' alt='скачать' />
                </a>
            </button>
            <style jsx>{`
            .recommendation-item {
                display: flex;
                flex-direction: column;
                margin: 20px 15px 10px;
                height: 147px;
                width: 357px;
                border: 1px solid #ccc;
                padding: 20px 22px;
                justify-content: space-between;
            }
            .text {
                color: ${theme.colors.lavender.darkest};
                font-size: 16px;
                font-weight: 300;
                line-height: 20px;
            }
            .btn {
                width: 125px;
                height: 31px;
                min-height: 31px;
                border-radius: 3px;
                background: ${theme.colors.blue.light};
                text-align: center;
                color: #fff;
                position: relative;
                font-weight: bold;
                cursor: pointer;
                text-transform: uppercase;
                border: none;
            }
            .btn:hover, .btn:active {
                background: #459bf8;
            }
            a {
                color: #fff;
                display: flex;
                justify-content: space-evenly;
            }
            @media screen and (max-width: ${theme.media.desktop}) {
                .recommendation-item {
                    max-width: 325px;
                }
            }
            @media screen and (max-width: ${theme.media.tablet}) {
                .recommendation-item {
                    width: 95%;
                    max-width: 100%;
                }
            }
            @media screen and (max-width: ${theme.media.phone}) {
                .recommendation-item {
                    width: 94%;
                    height: 170px;
                }
            }
             @media screen and (max-width: ${theme.media.phoneS}) {
                .recommendation-item {
                    width: 94%;
                    height: 147px;
                }
            }
        `}</style>
        </div>
    );
};

export default RecommendationItem;
