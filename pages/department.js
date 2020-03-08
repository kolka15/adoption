import React  from 'react';
import Head from 'next/head';

import Layout from '../components/Layout/Layout';
import theme from '../utils/styles/theme';
import Breadcrumbs from '../reusable/Breadcrumbs';
import Title from '../reusable/Title';

const Department = () => {
    const pageName = 'Департамент';

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
                <Breadcrumbs pageName={pageName} pageAddress='department' />
                <Title title={pageName} />
            </div>
            <style jsx>{`
                    .error {
                        color: ${theme.colors.lavender.darkest};
                        font-size: ${theme.fontSize.h2};
                        text-align: center;
                    }
                    .content {}
                `}</style>
        </Layout>
    );
};

export default Department;
