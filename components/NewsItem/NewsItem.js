import React from 'react';
import Link from 'next/dist/client/link';
import ReactHtmlParser from 'react-html-parser';
import theme from '../../utils/styles/theme';

import {formatDateNews} from '../../utils/formatDates';

const NewsItem = ({ title, short_text, publication_date, id }) => {
    return (
        <div className='news-item'>
            <Link href="/news/[id]" as={`/news/${id}`}>
                <a aria-label='Открыть новость'>
                    <div>
                        <h3 className='title'>{title}</h3>
                        <div className='underline'/>
                    </div>
                    <div className='text'>{ReactHtmlParser(short_text)}</div>
                    <div className='date'>{formatDateNews(publication_date.split(' ')[0])}</div>
                </a>
            </Link>

            <style jsx>{`
                    .news-item {
                        display: flex;
                        flex-direction: column;
                        padding: 39px 0 35px;
                        border-bottom: 1px solid ${theme.colors.grey.light};
                    }
                    .news-item:last-of-type {
                        border-bottom: none;
                    }
                    .title {
                        font-size: 18px;
                        line-height: ${theme.lineHeight.plain};
                        color: ${theme.colors.lavender.darkest};
                        margin: 0 0 10px 0;
                    }
                    .underline {
                        width: 76px;
                        height: 2px;
                        background: ${theme.colors.orange};
                    }
                    .text {
                        color: ${theme.colors.lavender.darkest};
                        line-height: ${theme.lineHeight.plain};
                        margin: 15px 0 10px;
                    }
                    .date {
                        color: ${theme.colors.blue.plain};
                        font-size: 14px;
                        line-height: ${theme.lineHeight.h3};
                    }
                   a:hover .title, a:hover .text {
                        text-decoration: underline;
                   }
                   @media screen and (max-width: ${theme.media.phoneS}) {
                        .news-item {
                            padding: 30px 0 25px;
                        }
                   }
                `}</style>
        </div>
    );
};

export default NewsItem;
