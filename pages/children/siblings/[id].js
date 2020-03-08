import React from 'react';
import Head from 'next/head';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Link from 'next/link';

import Layout from '../../../components/Layout/Layout';
import Breadcrumbs from '../../../reusable/Breadcrumbs';
import Card from '../../../components/Card/Card';

import { fetchChildStart } from '../../../redux/child/child.actions';
import { selectChildData, selectIsChildFetching } from '../../../redux/child/child.selectors';

import theme from '../../../utils/styles/theme';
import Title from '../../../reusable/Title';

const Siblings = ({ childData }) => {
    // console.log(childData);

    return (
        <Layout>
            <Head>
                <title>Братья и сестры</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                    key="viewport"
                />
            </Head>
            <Breadcrumbs pageName='Банк данных' pageAddress={'children'}/>
            <Title title='Банк данных' />
            { childData &&
            <div>
                <div className='found'>
                    <Link href="/children/[id]" as={`/children/${childData.id}`}>
                        <a style={{fontWeight: 'bold', color: '#212529'}}>{childData.name}</a>
                    </Link>
                    , братья и сестры
                </div>
                <div>
                    {
                        childData.sibling.length > 0 && childData.sibling.map((child, i) =>
                            <Card
                                key={i}
                                {...child}
                            />
                        )
                    }
                </div>
            </div>
            }

            <style jsx>{`
                .found {
                    color: ${theme.colors.grey.dark};
                    font-size: 16px;
                    font-weight: 300;
                    line-height: 20px;
                    margin-bottom: 3rem;
                }
            `}</style>
        </Layout>
    );
};

const mapStateToProps = createStructuredSelector({
    isFetching: selectIsChildFetching,
    childData: selectChildData
});

Siblings.getInitialProps = async ({ ctx: { store, query } }) => {
    const nullStr = 'null';
    if (query.id !== nullStr) {
        store.dispatch(fetchChildStart(query.id));
    }
};

export default connect(mapStateToProps)(Siblings);
