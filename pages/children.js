import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import Head from 'next/head';
import { createStructuredSelector } from 'reselect';

import { selectChildrenData, selectChildrenMeta, selectIsChildrenFetching, selectFoundTotal, selectChildrenQuery } from '../redux/children/children.selectors';
import { selectChildrenTotal, selectChildrenDate } from '../redux/total/total.selectors';
import {fetchChildrenStart, setChildrenQuery} from '../redux/children/children.actions';
import { fetchRegionsStart } from '../redux/regions/regions.actions';
import { fetchCustodyStart } from '../redux/custody/custody.actions';
import { fetchGenderStart } from '../redux/gender/gender.actions';
import { fetchTotalStart } from '../redux/total/total.actions';
import { fetchEyesStart } from '../redux/eyes/eyes.actions';
import { fetchHairStart } from '../redux/hair/hair.actions';

import theme from '../utils/styles/theme';
import '../static/css/rangeInput.css';

import parseQuery from '../utils/parseQuery';
import { formatDateAppointmentModal } from '../utils/formatDates';

import Layout from '../components/Layout/Layout';
import Breadcrumbs from '../reusable/Breadcrumbs';
import Title from '../reusable/Title';
import SearchForm from '../components/SearchForm/SearchForm';
import Card from '../components/Card/Card';
import Pagination from '../reusable/Pagination';

const Children = ({ childrenData, childrenMeta, total, date, found, query, fetchChildrenStart, setChildrenQuery }) => {
    const pageName = 'Банк данных';
    const [iseLeaving, setIsLeaving] = useState(false);

    const queryParams = parseQuery(query);
    let startPage = queryParams.page;

    // console.log('query', query);

    const [page, setPage] = useState(startPage || 1);

    const onPageChanged = currentPage => {
        if (!isNaN(currentPage)) {
            setPage(currentPage);
            const startQuery = query.slice(0, query.indexOf('page'));
            const childId = query.indexOf('#') !== -1 ? query.slice(query.indexOf('#')) : '';
            // console.log('startQuery', startQuery);
            // console.log('childId', childId);
            // console.log('currentPage', currentPage);
            let href = (!startQuery || startQuery[startQuery.length - 1] === '?' || startQuery[startQuery.length - 1] === '&') ?
                query.slice(0, query.indexOf('page')) + `page=${currentPage}` :
                query.slice(0, query.indexOf('page')) + `&page=${currentPage}`;
            // console.log('href', href);
            if (childId) {
                href += childId;
            }
            // console.log('777', href);
            fetchChildrenStart(`${query ? href : `?${href}`}`);
            setChildrenQuery(`${query ? href : `?${href}`}`);
        }
    };

    useEffect(() => {
        (() => {
            if (iseLeaving) return;
            let href = '/children';
            if (query) {
                href += query;
                if (href.indexOf('page') === -1) {
                    href += `&page=${page}`;
                } else {
                    href = href.slice(0, href.indexOf('page')) + `page=${page}`;
                }
            } else {
                href += `?page=${page}`;
            }
            // const newQuery = href.slice(href.indexOf('children') + 8);
            // setChildrenQuery(newQuery);
            // console.log(999, query);
            let childId = query.split('#')[1];
            if (childId) {
                href += `#${childId}`;
            } else {
                childId = Router.router.asPath.split('#')[1];
                if (childId) {
                    href += `#${childId}`;
                }
            }
            // Router.push(href, href, { shallow: true });
            Router.push(href);
        })();
    }, [query, page, iseLeaving]);

    const handleRouteChange = url => {
        // console.log('App is changing to: ', url)
        if (url.indexOf('children') === -1) {
            setIsLeaving(true);
            setChildrenQuery('');
        }
    };

    Router.events.on('routeChangeStart', handleRouteChange);

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

                <div className='general'>
                    <img src='/static/images/family.png' alt='семья' className='general__img'/>
                    <div className='general__info'>
                        <div className='info__total'>{total}</div>
                        <div className='info__text'>
                            Число детей, информация о которых содержится в федеральном банке данных
                        </div>
                        {
                            date &&
                            <div className='info__date'>
                                * На {formatDateAppointmentModal(date)} года
                            </div>
                        }
                    </div>
                </div>
                <div style={{textAlign: 'justify'}}>
                    <p>Уважаемые замещающие родители!</p>
                    <p>
                        На нашем сайте Вы можете записаться на прием к федеральному оператору, где Вы сможете ознакомиться с анкетными данными детей,
                        производная информация которых размещена на нашем сайте.
                    </p>
                    <p>
                        При приеме у федерального оператора Вы должны иметь паспорт, оригинал и ксерокопию действующего заключения о возможности быть усыновителем
                        (опекуном, попечителем), а также СНИЛС (в соответствии с требованиями Федерального закона от 2 августа 2019 г. No 319-ФЗ «О&nbsp;внесении изменений
                        в Семейный кодекс Российской Федерации и Федеральный закон «О государственном банке данных о детях, оставшихся без попечения родителей».
                        В том случае, если в заключении указаны оба супруга, то на прием должны быть записаны и прийти оба супруга.
                    </p>
                    <p>
                        В том случае, если Вы по каким-либо причинам не сможете прийти на прием, то Вам необходимо на сайте либо по телефонам федеральных операторов отменить
                        сделанную Вами запись на прием. В таком случае у других замещающих родителей появится возможность прийти для знакомства с анкетами детей.
                    </p>
                    <p>
                        Запись на прием к федеральному оператору не лишает Вас возможности также обращаться в органы опеки и попечительства или к&nbsp;региональным операторам.
                        В том случае, если Вы желаете осуществлять поиск ребенка только в Москве и Московской области, то рекомендуем Вам обращаться непосредственно к этим
                        региональным операторам.
                    </p>
                </div>

                <SearchForm/>

                <hr/>



                <div className='found'>Нашлось {found} анкет</div>

                {
                    childrenData && childrenData.map((child, i) =>
                        <Card
                            key={i}
                            {...child}
                        />
                    )
                }

            </div>

            <div className='pagination'>
                <Pagination
                    totalRecords={childrenMeta && childrenMeta.total}
                    pageLimit={childrenMeta && childrenMeta.limit}
                    pageNeighbors={1}
                    onPageChanged={onPageChanged}
                    startPage={startPage || 1}
                />
            </div>

            <style jsx>{`
                    .content {
                    }
                    .general {
                        display: flex;
                        margin: 5rem 0;
                    }
                    .general__img {
                        margin-right: 4rem;
                    }
                    .general__info {
                        display: flex;
                        flex-direction: column;
                        justify-content: space-evenly;
                    }
                    .info__total {
                        color: ${theme.colors.orange};
                        font-weight: 700;
                        font-size: 70px;
                        line-height: ${theme.lineHeight.h2};
                    }
                    .info__text {
                        color: #1641a8;
                        font-size: ${theme.fontSize.h4};
                        color: ${theme.colors.blue.header};
                        font-weight: 700;
                        line-height: ${theme.lineHeight.h3};
                    }
                    .info__date {
                        color:${theme.colors.lavender.light};
                        font-size: ${theme.fontSize.h5};
                        line-height: 18px;
                    }
                    
                    hr {
                        color: #d7dbe0;
                        margin: 4rem 0 1.7rem;
                    }
                    
                    .found {
                        color: ${theme.colors.grey.dark};
                        font-size: 16px;
                        font-weight: 300;
                        line-height: 20px;
                        margin-bottom: 3rem;
                    }
                    .pagination {
                        margin: 5rem 0 7.75rem;
                    }
                    @media screen and (max-width: ${theme.media.tabletS}) {
                        .general {
                            margin: 0 0 70px;
                        }
                        .info__total {
                            font-size: 62px;
                            margin-bottom: 22px;
                        }
                        .info__text {
                            font-size: 22px;
                            font-weight: 400;
                        }
                        .info__date {
                            display: none;
                        }
                        .general__info {
                            justify-content: center;
                        }
                        .general__img {
                            max-width: 230px;
                        }
                    }
                    @media screen and (max-width: 630px) {
                        .general {
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            margin-bottom: 40px;
                        }
                        .general__img {
                            margin-right: 0;
                            max-width: 300px;
                        }
                        .general__info {
                            display: none;
                        }
                        .found {
                            margin-bottom: 2rem;
                        }
                    }
                `}</style>
        </Layout>
    );
};

const mapStateToProps = createStructuredSelector({
    isFetching: selectIsChildrenFetching,
    childrenData: selectChildrenData,
    childrenMeta: selectChildrenMeta,
    total: selectChildrenTotal,
    date: selectChildrenDate,
    query: selectChildrenQuery,
    found: selectFoundTotal
});

const mapDispatchToProps = (dispatch) => ({
    fetchChildrenStart: (query) => dispatch(fetchChildrenStart(query)),
    setChildrenQuery: (query) => dispatch(setChildrenQuery(query))
});

Children.getInitialProps = async ({ ctx: { store, query } }) => {
    // console.log('query!!!!!!!!!!!!!!!! ', query);
    // console.log('store.getState().children.query!!!!!!!!!!!!!!!! ', store.getState().children.query);
    const queryLength =  Object.keys(query).length;
    if (queryLength === 0) {
        store.dispatch(fetchChildrenStart());
    } else {
        let str = '?';
        for (let key in query) {
            str += `${key}=${query[key]}&`;
        }
        if (store.getState().children.query) {
            const childId = store.getState().children.query.split('#')[1];
            str += `#${childId}`;
        }
        // console.log(7777, str);
        store.dispatch(setChildrenQuery(str));
        store.dispatch(fetchChildrenStart(encodeURI(str)));
    }
    if (!store.getState().regions.regionOptions) {
        store.dispatch(fetchRegionsStart());
    }
    if (!store.getState().eyes.eyesOptions) {
        store.dispatch(fetchEyesStart());
    }
    if (!store.getState().custody.custodyOptions) {
        store.dispatch(fetchCustodyStart());
    }
    if (!store.getState().hair.hairOptions) {
        store.dispatch(fetchHairStart());
    }
    if (!store.getState().gender.genderOptions) {
        store.dispatch(fetchGenderStart());
    }
    if (!store.getState().total.total) {
        store.dispatch(fetchTotalStart());
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Children);
