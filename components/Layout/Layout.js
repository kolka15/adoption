import React from 'react';
import Head from 'next/head';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import theme from '../../utils/styles/theme';

export default function Layout({ main, children }) {
    return (
        <div className='layout'>
            <Head>
                <script src="//code-ya.jivosite.com/widget.js" data-jv-id="KIkm2PgbqV" async></script>
            </Head>
            <Header main={main} />
            <main className='main-wrapper'>
                <div className='main'>
                    {children}
                </div>
            </main>

            <Footer />

            <style jsx>{`
            .layout {
                position: relative;
                min-height: 100vh;
                display: flex;
                flex-direction: column;
                margin: 0;
                overflow-x: hidden;
            }
            .main-wrapper {
                width: 100%;
                flex: 1 0 auto;
                background: ${main ? '#fff' : 'linear-gradient(to bottom, rgba(218,230,253,1) 0,rgba(255,255,255,1) 340px)'};
            }
            .main {
                max-width: 1140px;
                margin: 35px auto 0;
                display: flex;
                flex-direction: column;
                padding: 0 10px;
                width: 100%;
            }
            @media screen and (max-width: ${theme.media.desktop}) {
                .main {
                    max-width: 90%;
                }
            }
            @media screen and (max-width: ${theme.media.tablet}) {
                .main {
                    max-width: 95%;
                }
            }
            @media screen and (max-width: ${theme.media.tabletS}) {
                .main {
                    margin-top: ${main ? '0' : '15px'};
                }
            }
            @media screen and (max-width: ${theme.media.phoneS}) {
                .main {
                    max-width: 97%;
                }
            }
        `}</style>
        </div>
    );
}
