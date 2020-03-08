import React, {useState, useEffect, useRef} from 'react';
import Head from 'next/head';

import theme from '../utils/styles/theme';

import Layout from '../components/Layout/Layout';
import Breadcrumbs from '../reusable/Breadcrumbs';
import CustomSelect from '../reusable/Select';
import Title from '../reusable/Title';
import NewsItem from '../components/NewsItem/NewsItem';

import {yearOptions, monthOptions} from '../utils/stubs';
import {fetchAllNewsStart} from '../redux/news/news.actions';
import {useDispatch, useSelector} from 'react-redux';
import {useDidUpdateEffect} from '../utils/updateEffect';
import ReactPaginate from 'react-paginate';
import '../static/css/pagination.css';

const News = () => {
    const pageName = 'Новости';
    const [select, setSelect] = useState({
        year: '',                                           //yearOptions[0]
        month: '',                                          //monthOptions[new Date().getMonth()]
        limit: 10,
        page: 1,
    });

    const {newsList} = useSelector(state => state.news);
    const dispatch = useDispatch();

    const onSelectChange = (selectedOption, name) => {
        setSelect({...select, [name]: selectedOption});
    };

    const handlePageClick = ({selected}) => {
        setSelect({...select, page: selected + 1});
        window.scrollTo(0, 170);
    };

    useDidUpdateEffect(
        () => dispatch(fetchAllNewsStart(select)),
        [select]
    );

    return (
        <Layout>
            <Head>
                <title>{pageName}</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                    key="viewport"
                />
            </Head>
            <div className='content'>
                <Breadcrumbs pageName={pageName} pageAddress='news'/>
                <Title title={pageName}/>

                <section className='news'>
                    <img src='/static/images/news.png' alt='новости' className='img'/>
                    <div className='news__col-right'>
                        <div className='select-group'>
                            <div className='year'>
                                <CustomSelect
                                    label='Год'
                                    options={yearOptions}
                                    name='year'
                                    handleChange={onSelectChange}
                                    value={select.year}
                                />
                            </div>
                            <div className='month'>
                                <CustomSelect
                                    label='Месяц'
                                    options={monthOptions}
                                    name='month'
                                    handleChange={onSelectChange}
                                    value={select.month}
                                />
                            </div>
                        </div>
                        <div className='news-list'>
                            {
                                newsList && newsList.items.length ? newsList.items.map((item, i) =>
                                    <NewsItem {...item} key={i}/>
                                ) :
                                    'Новостей нет'
                            }
                        </div>
                        <div className='pagination-wrapper'>
                            <ReactPaginate
                                // previousLabel={'previous'}
                                // nextLabel={'next'}
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
                    </div>
                </section>

            </div>
            <style jsx>{`
                    .error {
                        color: ${theme.colors.lavender.darkest};
                        font-size: ${theme.fontSize.h2};
                        text-align: center;
                       
                    }
                    .content {
                        margin-bottom: 7rem;
                    }
                    .news {
                        margin-top: 4.4rem;
                        display: flex;
                    }
                    .img {
                        margin-right: 6.875rem;
                        align-self: baseline;
                    }
                    .news__col-right {
                        width: 100%;
                    }
                    .select-group {
                        display: flex;
                        justify-content: space-between;
                        max-width: 275px;
                        margin-bottom: 10px;
                    }
                    .year {
                        width: 100px;
                    }
                    .month {
                        width: 135px;
                    }
                    .pagination-wrapper {
                        margin-top: 40px;
                    }
                   
                    @media screen and (max-width: ${theme.media.tablet}) {
                        .news-list {
                            margin-left: 0;
                            margin-top: 20px;
                        }
                        .img {
                            margin-right: 70px;
                            align-self: baseline;
                        }
                        .news {
                            align-items: center;
                        }
                    }
                    @media screen and (max-width: ${theme.media.phoneS}) {
                        .news-list {
                            margin-left: 0;
                            margin-top: 20px;
                        }
                        .img {
                            margin: 0 auto;
                            margin-bottom: 40px;
                            max-width: 200px;
                        }
                        .news {
                            flex-direction: column;
                        }
                        .news-list {
                            margin-top: 0;
                        }
                    }
                `}</style>
        </Layout>
    );
};

News.getInitialProps = async ({ctx: {store}}) => {
    if (!store.getState().news.newsList) {
        store.dispatch(fetchAllNewsStart(
            {
                year: '',
                month: '',
                limit: 10,
                page: 1,
            }
        ));
    }
};

export default News;
