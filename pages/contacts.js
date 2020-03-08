import React, {Fragment} from 'react';
import Head from 'next/head';

import Layout from '../components/Layout/Layout';
import theme from '../utils/styles/theme';
import Breadcrumbs from '../reusable/Breadcrumbs';
import Title from '../reusable/Title';
import {contacts} from '../utils/stubs';

const Contacts = () => {
    const pageName = 'контакты';

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
                <Breadcrumbs pageName={pageName} pageAddress='contacts'/>
                <Title title={pageName}/>
                <div className='contacts'>
                    <img src="/static/images/contacts.png" alt="контакты"/>
                    <div className='contacts-content'>
                        {
                            contacts && contacts.map((section, i) => (
                                <div className='section' key={i}>
                                    <h3 className={`title ${section.isMain ? 'title_main' : ''}`}>{section.name}</h3>
                                    {
                                        section.operating_time &&
                                        <div className='operating-time'>{section.operating_time}</div>
                                    }
                                    {
                                        section.children.map((row, i) => (
                                            <div className='row' key={i}>
                                                <div className="col-1">
                                                    {row.label}
                                                </div>
                                                <div className="col-2">
                                                    <div className=''>
                                                        {row.value}
                                                    </div>

                                                    {
                                                        row.phone ?
                                                            <div>
                                                                <span className='phone'>телефон:</span> {row.phone}
                                                            </div> : ''
                                                    }
                                                </div>
                                            </div>
                                        ))
                                    }
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
                    .contacts {
                        display: flex;
                        margin-bottom: 90px;    
                        align-items: start;
                    }
                    .contacts-content {
                         padding-left: 8%;
                         width: 80%;
                    }
                    .section {
                      margin-bottom: 50px;
                    }
                    
                    .title {
                        color: #3b4255;
                        font-size: 22px;
                        font-weight: 700;
                        line-height: 1.2;
                        margin-bottom: 30px;
                    }
                    .title.title_main {
                        color: #154ec9;
                        font-size: 24px;
                    }
                    .row {
                        display:flex;
                        align-items: start;
                        margin-bottom: 30px;
                        font-size: 16px;
                        font-weight: 400;    
                    }
                    .col-1 {
                        flex-basis: 30%;
                        color: #60678e;
                        font-size: 16px;
                        font-weight: 400;
                        padding-right: 20px;
                    }
                    .col-2 {
                        
                    }
                    .phone {
                      color: #60678e;
                    }
                    .operating-time {
                        margin-bottom: 20px;
                        color: #000;
                    }
                    img {
                        width: 20%;
                    }
                    @media screen and (max-width: ${theme.media.tablet}) {
                       .contacts {
                            flex-direction: column;
                            align-items: center;  
                        }
                       .contacts-content {
                          padding-left: 0;
                          text-align:left;
                       }
                       img {
                          width: auto;
                          margin-bottom: 20px;
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

export default Contacts;
