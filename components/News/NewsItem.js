import Link from 'next/link';
import ReactHtmlParser from 'react-html-parser';
import theme from '../../utils/styles/theme';

import cutText from '../../utils/cutText';
import {formatDateToDisplay} from '../../utils/formatDates';
import {exists} from '../../utils/check';

const NewsItem = ({item}) => {
    const {title, short_text, publication_date, id} = item;
    
    let text = null;
    
    if (typeof ReactHtmlParser(short_text)[0] === 'object') {
        text = cutText(ReactHtmlParser(short_text)[0].props.children[0], 130);
    } else {
        text = cutText(ReactHtmlParser(short_text)[0], 130);
    }
    
    return (
        <Link href={'/news/[id]'} as={`/news/${id}`}>
            <a className='news-item' aria-label='Открыть новость'>
                <div className='date'>{formatDateToDisplay(publication_date)}</div>
                <div className='underline'/>
                <div className='title'>{exists(title)}</div>
                <div className='text'>{exists(text)}</div>
                
                <style jsx>{`
                .news-item {
                    display: flex;
                    flex-direction: column;
                    margin: 0 15px 10px;
                    height: 250px;
                }
                
                .title {
                    color: ${theme.colors.lavender.darkest};
                    font-size: 16px;
                    line-height: 22px;
                    padding-bottom: 10px;
                    font-weight: 700;
                }
                
                .date {
                    color: ${theme.colors.blue.light};
                }
                
                .underline {
                    width: 132px;
                    height: 2px;
                    background: ${theme.colors.blue.light};
                    margin: 8px 0 15px;
                }
                
                .text {
                    color: ${theme.colors.grey.darkest};
                    font-size: 16px;
                    font-weight: 300;
                    line-height: 20px;
                }
                
                .btn {
                    width: 67px;
                    height: 32px;
                    background: ${theme.colors.orange};
                    margin: 0 auto;
                    margin-top: 20px;
                    border-radius: 4px;
                    text-align: center;
                    color: #fff;
                    font-size: 36px;
                    position: relative;
                    font-weight: bold;
                    cursor: pointer;
                }
                span {
                    position: relative;
                    top: -23px;
                }
                 @media screen and (max-width: ${theme.media.tablet}) {
                    .news-item {
                        height: 265px;
                    }
                }
                @media screen and (max-width: ${theme.media.tabletS}) {
                    .news-item {
                        height: 275px;
                    }
                }
                @media screen and (max-width: ${theme.media.phoneS}) {
                    .news-item {
                        margin-bottom: 30px;
                    }
                    .wrapper {
                        margin-bottom: 0;
                    }
                }
            `}</style>
            </a>
        </Link>
    );
};

export default NewsItem;
