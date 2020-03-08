import React from 'react';
import HeaderLK from '../HeaderLK/HeaderLK';
import Footer from '../Footer/Footer';
import Head from 'next/head';

export default function Layout({main, children, token}) {
    return (
        <div className='site'>
            <Head>
                <title>Личный кабинет</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                    key="viewport"
                />
            </Head>
            <HeaderLK main={main} token={token}/>
            <main className='main'>
                <div className="inner-wrapper">
                    {children}
                </div>
            </main>
            <Footer/>

            <style jsx>{`
            .site {
                display: flex;
                min-height: 100vh;
                flex-direction: column;
            }
            .main {
                background: linear-gradient(to bottom, rgba(218,230,253,1) 0,rgba(255,255,255,1) 340px);
                flex: 1;
                padding: 0 10px;
                
            }
            .inner-wrapper {
                max-width: 1140px;
                width: 100%;
                margin: 0 auto;
            }
        `}</style>
        </div>
    );
}
