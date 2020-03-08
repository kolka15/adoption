import React, {useState} from 'react';
import Head from 'next/head';
import ReactHtmlParser from 'react-html-parser';
import theme from '../utils/styles/theme';

import Layout from '../components/Layout/Layout';
import Breadcrumbs from '../reusable/Breadcrumbs';
import Title from '../reusable/Title';
import Accordion from '../reusable/Accordion';
import Pagination from '../reusable/Pagination';

import {useSelector} from 'react-redux';
import {fetchFAQStart} from '../redux/faq/faq.actions';

const Questions = () => {
    const pageName = 'Часто задаваемые вопросы';
    const pageLimit = 8;

    const {faqList} = useSelector(state => state.faq);
    const [questions, setQuestions] = useState(faqList);

    const onPageChanged = currentPage => {
        // console.log(currentPage);
        if (!questions) return;
        const offset = (currentPage - 1) * pageLimit;
        const newFaq = faqList.slice(offset, offset + pageLimit);
        setQuestions(newFaq);
    };

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
                <Breadcrumbs pageName={pageName} pageAddress='children' />
                <Title title={pageName} />

                <section className='questions'>
                    <img src='/static/images/faq.png' alt='вопросы' className='img'/>
                    <div className='questions__col-right'>

                        {
                            questions && questions.map((item, i) =>
                                <div key={i} className='question-card' id={item.id}>
                                    <Accordion question={item.question} id={item.id}>
                                        {ReactHtmlParser(item.answer)}
                                    </Accordion>
                                </div>
                            )
                        }
                    </div>
                </section>
                <div className='pagination'>
                    <Pagination
                        totalRecords={faqList ? faqList.length : 0}
                        pageLimit={pageLimit}
                        pageNeighbors={1}
                        onPageChanged={onPageChanged}
                        startPage={1}
                    />
                </div>
            </div>
            <style jsx>{`
            .content {
                margin-bottom: 7rem;
            }
            .questions {
                margin-top: 4.4rem;
                display: flex;
            }
            .img {
                margin-right: 6.875rem;
                align-self: baseline;
                width: 20%;
            }
            .questions__col-right {
                width: 80%;
            }
            .question-card {
                margin-bottom: 28px;
            }
            .pagination {
                margin-top: 40px;
            }
            @media screen and (max-width: ${theme.media.tablet}) {
                .img {
                    display: none;
                }
                .questions {
                    margin-top: 0;
                }
                .content {
                    margin-bottom: 50px;
                }
                .pagination {
                    margin-top: 20px;
                }
            }
        `}</style>
        </Layout>
    );
};

Questions.getInitialProps = async ({ ctx: { store } }) => {
    if (!store.getState().faq.faqList) {
        store.dispatch(fetchFAQStart());
    }
};

export default Questions;
