import React, { useEffect } from 'react';
import Head from 'next/head';
import { connect } from 'react-redux';

import theme from '../utils/styles/theme';
import '../static/css/slider.css';

import Layout from '../components/Layout/Layout';
import Navigation from '../components/Navigation/Navigation';
import fonts from '../utils/fonts';
import FAQ from '../components/FAQ/FAQ';
import News from '../components/News/News';
import Recommendations from '../components/Recommendations/Recommendations';

import { fetchTotalStart } from '../redux/total/total.actions';
import { fetchAllNewsStart } from '../redux/news/news.actions';
import { fetchFAQStart } from '../redux/faq/faq.actions';
import { createStructuredSelector } from 'reselect';
import { selectChildrenTotal } from '../redux/total/total.selectors';

const Index = ({ total }) => {
    useEffect(() => {
        fonts();
    }, []);

    return (
        <Layout main>
            <Head>
                <title>Усыновление в Российской Федерации</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                    key="viewport"
                />
            </Head>
            <div className='waiting'>
                <h1 className='content'>
                    <div className='line1'>
                        <span className='amount'>{total}</span>
                        <span>ребенка</span>
                    </div>
                    <span className='line2'>ждут семью</span>
                </h1>
            </div>

            <Navigation />

            <FAQ/>

            <News />

            <Recommendations />

            <style jsx>{`
                .waiting {
                    margin: 50px 0 0 0;
                    width: 60%;
                }
                .content {
                    margin: 0;
                    margin-left: 13%;
                    font-size: 56px;
                    line-height: 70px;
                    font-weight: normal;
                }
                .line1 {
                    color: ${theme.colors.blue.header};
                    display: flex;
                    align-items: center;
                }
                .line2 {
                    color: ${theme.colors.orange};
                }
                .amount {
                    font-size: 90px;
                    font-weight: 700;
                    margin-right: 20px;
                }
                @media screen and (max-width: ${theme.media.desktop}) {
                    .amount {
                        font-size: 75px;
                    }
                    .content {
                        font-size: 44px;
                        line-height: 62px;
                        margin-left: 4%;
                    }
                }
                @media screen and (max-width: ${theme.media.tabletS}) {
                    .waiting {
                        margin-top: 20px;
                    }
                    .amount {
                        font-size: 55px;
                    }
                    .content {
                        font-size: 36px;
                        line-height: 45px;
                        margin-left: 0;
                    }
                }
                @media screen and (max-width: ${theme.media.phoneS}) {
                    .waiting {
                        margin-top: 55px;
                        width: 100%;
                    }
                    .amount {
                        font-size: 48px;
                        margin-right: 10px;
                    }
                    .content {
                        font-size: 30px;
                        line-height: 45px;
                        margin-left: 0;
                    }
                }
            `}</style>
        </Layout>
    );
};

const mapStateToProps = createStructuredSelector({
    total: selectChildrenTotal
});

Index.getInitialProps = async ({ ctx: { store } }) => {
    if (!store.getState().total.total) {
        store.dispatch(fetchTotalStart());
    }
    if (!store.getState().news.newsList) {
        store.dispatch(fetchAllNewsStart());
    }
    if (!store.getState().faq.faqList) {
        store.dispatch(fetchFAQStart());
    }
};

export default connect(mapStateToProps)(Index);
