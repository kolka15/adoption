import React  from 'react';
import Head from 'next/head';

import Layout from '../components/Layout/Layout';
import theme from '../utils/styles/theme';
import Breadcrumbs from '../reusable/Breadcrumbs';
import Title from '../reusable/Title';
import Accordion from '../reusable/Accordion';
import Document from '../components/Document/Document';
import {letters} from '../utils/stubs';

const Letters = () => {
    const pageName = 'Письма Министерства';

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
                <Breadcrumbs pageName={pageName} pageAddress='laws' />
                <Title title={pageName} />

                <div className='Content-Wrapper'>
                    <img src="/static/images/inter-law.png" alt="законодательство"/>
                    <div className='Content-Column'>
                        {
                            letters.map(el => (
                                <div key={el.id} className='Accordion-Wrapper'>
                                    <Accordion
                                        id={el.id}
                                        question={el.title}
                                        scrollable
                                    >
                                        {
                                            el.files.map((file, i) => <Document {...file} key={i}/>)
                                        }
                                    </Accordion>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <style jsx>{`
                    .error {
                        color: ${theme.colors.lavender.darkest};
                        font-size: ${theme.fontSize.h2};
                        text-align: center;
                    }
                    .Content-Wrapper {
                        display: flex;
                        margin-bottom: 90px;    
                        align-items: start;
                    }
                    .Content-Column {
                         padding-left: 8%;
                         width: 80%;
                    }
                    img {
                        width: 20%;
                    }
                    .Accordion-Wrapper {
                        margin-bottom: 21px;    
                    }
                    @media screen and (max-width: ${theme.media.tablet}) {
                       .Content-Wrapper {
                            flex-direction: column;
                            align-items: center;  
                        }
                       .Content-Column {
                          padding-left: 0;
                          text-align:left;
                       }
                       img {
                          width: auto;
                          margin-bottom: 40px;
                       }
                    }
                     @media screen and (max-width: ${theme.media.phoneS}) {
                        .Content-Wrapper {
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

export default Letters;
