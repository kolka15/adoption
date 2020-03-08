import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Router from 'next/dist/client/router';
import Link from 'next/link';
import ReactHtmlParser from 'react-html-parser';

import Layout from '../../components/Layout/Layout';
import Breadcrumbs from '../../reusable/Breadcrumbs';
import Title from '../../reusable/Title';

import { news } from '../../utils/stubs';
import theme from '../../utils/styles/theme';
import {formatDateNews} from '../../utils/formatDates';

import {useSelector, useDispatch} from 'react-redux';
import {fetchNewsStart} from '../../redux/news/news.actions';

const NewsPage = () => {
    const {newsItem} = useSelector(state => state.news);
    const [currentNews, setCurrentNews] = useState(newsItem);
    const dispatch = useDispatch();

    useEffect(() => {
        if (newsItem) return;
        dispatch(fetchNewsStart(Router.query.id));
    }, []);

    useEffect(() => {
        (() => {
            if (!newsItem) return;
            setCurrentNews(newsItem);
        })();
    }, [newsItem]);

    // const { title, full_text, publication_date, image } = currentNews;

    if (!currentNews) return null;

    return (
        <Layout>
            <Head>
                <title>{currentNews.title}</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                    key="viewport"
                />
            </Head>
            <div className='content'>
                <Breadcrumbs pageName='Новости' pageAddress='news' />
                <Title title={currentNews.title} marginBottom='12px' type='small' />

                <div className='head'>
                    <div className='date'>{formatDateNews(currentNews.publication_date)}</div>
                    <Link href='/news'>
                        <a className='back' aria-label='Вернуться на предыдущую страницу'>
                            все новости
                            <span className='arrow'> → </span>
                        </a>
                    </Link>
                </div>
                <div className='body'>
                    {currentNews.image && <img src={currentNews.image} alt='новости' className='img'/>}

                    <div>
                        <div className='text'>{ReactHtmlParser(currentNews.full_text)}</div>
                        <div className='source'>МОСКВА, {formatDateNews(currentNews.publication_date)} / <a className='source' href={currentNews.link}>{currentNews.link}</a></div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                    .date {
                        color: ${theme.colors.blue.plain};
                        font-size: 14px;
                        line-height: ${theme.lineHeight.h3};
                    }
                    .arrow {
                        position: absolute;
                        color: ${theme.colors.grey.plain};
                        font-size: 36px;
                        top: -85%;
                    }
                    .back {
                        color: ${theme.colors.grey.plain};
                        position: relative;
                    }
                    .head {
                        display: flex;
                        justify-content: space-between;
                        align-items: flex-start;
                    }
                    .body {
                        margin-top: 4rem;
                        display: flex;
                    }
                    .img {
                        margin-right: 6.875rem;
                        align-self: baseline;
                    }
                    .text {
                        color: ${theme.colors.grey.dark};
                        line-height: ${theme.lineHeight.plain};
                    }
                    .source {
                        color: ${theme.colors.grey.plain};
                        margin-top: 30px;
                    }
                    .content {
                        margin-bottom: 220px;
                    }
                    @media screen and (max-width: ${theme.media.tablet}) {
                        .img {
                            display: none;
                        }
                        .body {
                            margin-top: 30px;
                        }
                        .content {
                            margin-bottom: 46px;
                        }
                        .back {
                            margin-right: 30px;
                        }
                   }
                `}</style>
        </Layout>
    );
};

NewsPage.getInitialProps = async ({ ctx: { store, query } }) => {
    const nullStr = 'null';
    if (query.id !== nullStr) {
        store.dispatch(fetchNewsStart(query.id));
    }
};

export default NewsPage;
