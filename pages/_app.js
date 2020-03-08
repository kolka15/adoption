import App from 'next/app';
import React from 'react';
import Head from 'next/head';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';

import '../static/css/menu.css';

import createStore from '../redux/store';

class MyApp extends App {
    static async getInitialProps ({ Component, ctx }) {
        let pageProps = {};
        // console.log('ctx: ', ctx.req ? ctx.req.headers['user-agent'] : navigator.userAgent);

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps({ ctx });
        }

        return { pageProps };
    }

    render () {
        const { Component, pageProps = {}, store } = this.props;
        return (
            <Provider store={store}>
                <Head>
                    <link rel="shortcut icon" href="/static/images/favicon.ico" />
                </Head>
                <Component {...pageProps} />
                <style jsx global>{`
                * {
                    box-sizing: border-box;
                    font-family: Roboto, sans-serif;
                }
                body {
                    margin: 0;
                    padding: 0;
                    font-size: 16px;
                    font-weight: 400;
                    line-height: 1.8;
                    overflow-x: hidden;
                }
                a {
                    text-decoration: none;
                }
                ul {
                    padding: 0;
                    margin: 0;
                }
                li {
                    margin: 0;
                    padding: 0;
                    text-indent: 0;
                    list-style: none;
                }
        `}</style>
            </Provider>
        );
    }
}

export default withRedux(createStore)(withReduxSaga(MyApp));
