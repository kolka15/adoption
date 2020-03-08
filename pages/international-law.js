import React from 'react';
import Head from 'next/head';

import Layout from '../components/Layout/Layout';
import theme from '../utils/styles/theme';
import Breadcrumbs from '../reusable/Breadcrumbs';
import Title from '../reusable/Title';
import {interLaw} from '../utils/stubs';
import Pagination from '../reusable/Pagination';
import Document from '../components/Document/Document';

import {useDispatch, useSelector} from 'react-redux';
import {fetchInternationalLawsStart} from '../redux/documents/documents.actions';

const InternationalLaw = () => {
    const pageName = 'Международное право';
    const {internationalLaws} = useSelector(state => state.documents);
    // console.log(internationalLaws);

    return (
        <Layout>
            <Head>username
                <title>{pageName}</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                    key="viewport"
                />
            </Head>
            <div className='content'>
                <Breadcrumbs pageName={pageName} pageAddress='international-law'/>
                <Title title={pageName}/>
                <div className='contacts'>
                    <img src="/static/images/inter-law.png" alt="законодательство"/>
                    <div className='column-content'>
                        {
                            interLaw && interLaw.map((document, i) => <Document key={i} {...document}/>)
                        }
                    </div>
                    <Pagination/>
                </div>
            </div>
            <style jsx>{`
                    .error {
                        color: ${theme.colors.lavender.darkest};
                        font-size: ${theme.fontSize.h2};
                        text-align: center;
                    }
                    .contacts {
                        display: flex;
                        margin-bottom: 90px;
                        align-items: start;
                    }
                    .column-content {
                        padding-left: 8%;
                        width: 80%;
                    }
                    img {
                        width: 20%;
                    }
                    @media screen and (max-width: ${theme.media.tablet}) {
                       .contacts {
                            flex-direction: column;
                            align-items: center;
                        }
                       .column-content {
                          padding-left: 0;
                          text-align:left;
                       }
                       img {
                          width: auto;
                          margin-bottom: 40px;
                       }
                    }
                     @media screen and (max-width: ${theme.media.phoneS}) {
                        .contacts {
                            flex-direction: column;
                        }
                        .row {
                          display:block;
                        }
                    }
                `}</style>
        </Layout>
    );
};

InternationalLaw.getInitialProps = async ({ ctx: { store } }) => {
    if (!store.getState().documents.internationalLaws) {
        store.dispatch(fetchInternationalLawsStart());
    }
};

export default InternationalLaw;