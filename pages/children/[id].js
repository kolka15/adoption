import React, {useEffect} from 'react';
import Head from 'next/head';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import Link from 'next/link';

import Layout from '../../components/Layout/Layout';
import Breadcrumbs from '../../reusable/Breadcrumbs';
import VideoLink from '../../reusable/VideoLink';

import {fetchChildStart} from '../../redux/child/child.actions';
import {selectChildData, selectIsChildFetching} from '../../redux/child/child.selectors';
import {selectChildrenQuery} from '../../redux/children/children.selectors';

import theme from '../../utils/styles/theme';
import server from '../../utils/config';
import {setChildrenQuery} from '../../redux/children/children.actions';
import {exists} from '../../utils/check';

const Profile = ({childData, query, setChildrenQuery}) => {
    
    useEffect(() => {
        if (!childData) return;
        const newQuery = query.split('#')[0] + '#' + childData.id;
        setChildrenQuery(newQuery);
    }, []);
    
    useEffect(() => {
        if (!childData) return;
        const newQuery = query.split('#')[0] + '#' + childData.id;
        setChildrenQuery(newQuery);
    }, [childData]);
    
    let sibling;
    
    if (childData) {
        if (childData.is_sibling && childData.count_sibling > 0) {
            // link to siblings
            sibling = (
                <Link href="/children/siblings/[id]" as={`/children/siblings/${childData.id}`}>
                    <a style={{color: '#212529', textDecoration: 'underline', fontWeight: 'bold'}}
                        aria-label='посмотреть братьев и сестер'>
                        есть
                    </a>
                </Link>
            );
        } else if (childData.is_sibling) {
            // true but no link
            sibling = 'есть';
        } else {
            // false
            sibling = 'нет';
        }
    }
    
    return (
        <Layout>
            <Head>
                <title>Профиль ребенка</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                    key="viewport"
                />
            </Head>
            <Breadcrumbs pageName='Банк данных' pageAddress={'children'}/>
            {childData &&
            <div>
                <div className='section-1'>
                    <div className='image-wrapper-desktop'>
                        <img src={childData && `${server}${exists(childData.photo_path)}`} alt='фотография ребенка'/>
                    </div>
                    <div className='info'>
                        <div className='info-head'>
                            <h1>{childData.name}</h1>
                            <span
                                className='gender'>{childData.gender ? exists(childData.gender.title.toLowerCase() === 'женский' ? 'девочка' : 'мальчик') : ''}</span>
                        </div>
                        <div className='image-wrapper-phone'>
                            <img src={childData && `${server}${exists(childData.photo_path)}`}
                                alt='фотография ребенка'/>
                        </div>
                        <Link href="/children#[id]" as={`/children#${childData.id}`}>
                            {/*<Link href={`/children#${childData.id}`}>*/}
                            {/*<Link href='/children'>*/}
                            <a className='back' aria-label='вернуться на предыдущую страницу'>
                                в банк данных
                                <span className='arrow'> → </span>
                            </a>
                        </Link>
                        <div className='video-phone'>
                            <VideoLink videoUrl={childData.video_link ? childData.video_link : ''} row/>
                        </div>
                        <div className='info-body-desktop'>
                            <p><span>Дата рождения: </span>{exists(childData.birthday)}</p>
                            <p><span>Регион: </span>{childData.region ? exists(childData.region.title) : ''}</p>
                            <p><span>Возможные формы устройства: </span>{exists(childData.custody_form).title}</p>
                            <p><span>Группа здоровья: </span>{exists(childData.health_group.title)}</p>
                            <p><span>Братья или сестры: </span>{exists(sibling)}</p>
                            {/*<p><span>Братья или сестры: </span>{(childData.is_sibling) === true ? 'есть' : 'нет'}</p>*/}
                            <p>
                                <span>Номер анкеты: </span><span className='id'>{exists(childData.id)} </span>
                                <a href={`/api/children/pdf/${exists(childData.id)}`} download className='save'
                                    aria-label='сохранить анкету'>сохранить информацию
                                </a>
                            </p>
                            <Link href={{
                                pathname: '/whereto',
                                query: {regionId: childData.region ? childData.region.id : ''}
                            }}>
                                {/*<Link href='/whereto'>*/}
                                <a className='whereto' aria-label='Куда обращаться'>
                                    <img src='/static/images/location.png' alt='location' className='whereto-img'/>
                                    <span>Куда обращаться</span>
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='info-body-phone'>
                    <p><span>Дата рождения: </span>{exists(childData.birthday)}</p>
                    <p><span>Регион: </span>{childData.region ? exists(childData.region.title) : ''}</p>
                    <p><span>Возможные формы
                        устройства: </span>{childData.custody_form ? exists(childData.custody_form.title) : ''}</p>
                    <p><span>Группа
                        здоровья: </span>{childData.health_group ? exists(childData.health_group.title) : ''}</p>
                    {/*<p><span>Группа здоровья: </span>{childData.health_group.title}</p>*/}
                    <p><span>Братья или сестры: </span>{exists(sibling)}</p>
                    <p>
                        <span>Номер анкеты: </span><span className='id'>{childData.id} </span>
                        <a href={`/api/children/pdf/${childData.id}`} download className='save'
                            aria-label='сохранить анкету'>сохранить информацию
                        </a>
                    </p>
                    <Link href={{pathname: '/whereto', query: {regionId: childData.region ? childData.region.id : ''}}}>
                        {/*<Link href='/whereto'>*/}
                        <a className='whereto' aria-label='Куда обращаться'>
                            <img src='/static/images/location.png' alt='location' className='whereto-img'/>
                            <span>Куда обращаться</span>
                        </a>
                    </Link>
                </div>
                <div className='section-2'>
                    <div className='character'>
                        <h2>Характеристика</h2>
                        <p>{childData.character}</p>
                    </div>
                    <div className='video-desktop'>
                        <VideoLink videoUrl={childData.video_link ? childData.video_link : ''}/>
                    </div>
                </div>
                <div className='section-3'>
                    <p><span>Причина отсутствия родительского попечения
                        матери: </span>{childData.mother_lack ? exists(childData.mother_lack.title) : ''}</p>
                    <p><span>Причина отсутствия родительского попечения
                        отца: </span>{childData.father_lack ? exists(childData.father_lack.title) : ''}</p>
                    <p><span>Цвет глаз: </span>{childData.eye ? exists(childData.eye.title) : ''}</p>
                    <p><span>Цвет волос: </span>{childData.hair ? exists(childData.hair.title) : ''}</p>
                </div>
            </div>
            }
            
            <style jsx>{`
                .section-1 {
                    display: flex;
                    margin: 2.7rem 0;
                    color: ${theme.colors.grey.dark};
                    position: relative;
                }
                .image-wrapper-desktop {
                    margin-right: 15px;
                    max-width: 60%;
                }
                .image-wrapper img {
                    width: 100%;
                }
                h1 {
                    text-transform: uppercase;
                    margin: 0;
                }
                p {
                    margin: .4rem 0;
                }
                p span {
                    color: ${theme.colors.lavender.plain};
                }
                .back {
                    color: ${theme.colors.grey.plain};
                    position: absolute;
                    right: 0;
                    top: -2%;
                }
                .gender {
                    color: ${theme.colors.lavender.dark};
                }
                .id {
                    color: ${theme.colors.grey.dark} !important;
                    font-weight: 700;
                    line-height: 26px;
                    text-transform: uppercase;
                }
                .save {
                    text-decoration: underline;
                    color: ${theme.colors.blue.dark};
                    margin-left: 1.6rem;
                }
                .section-2 {
                    padding: 1.75rem 2.375rem 2rem;
                    background: #f5f4f4;
                    display: flex;
                    justify-content: space-between;
                    margin: 3rem 0 2rem;
                }
                .character {
                    width: 85%;
                    border-right: 1px solid #d7dbe0;
                    padding-right: 2rem;
                    color: ${theme.colors.lavender.darkest};
                }
                .character p {
                    line-height: ${theme.lineHeight.plain};
                }
                h2 {
                    margin: 0;
                }
                .video-desktop {
                    display: flex;
                    justify-content: center;
                    padding-right: 6px;
                }
                .section-3 {
                    padding: 0 2.4rem 9rem;
                }
                .whereto {
                    color: ${theme.colors.grey.dark};
                    text-transform: uppercase;
                    display: flex;
                    align-items: center;
                    text-decoration: underline;
                    font-size: 14px;
                    font-weight: 700;
                    line-height: 20px;
                    margin: 1.5rem 0;
                }
                .whereto-img {
                    margin-right: 15px;
                }
                .btn {
                    width: 67px;
                    height: 32px;
                    background: ${theme.colors.orange};
                    margin: 0 auto;
                    margin-top: 20px;
                    border-radius: 4px;
                    text-align: center;
                    color: #fff;
                    font-size: 36px;
                    position: relative;
                    font-weight: bold;
                    cursor: pointer;
                }
                .arrow {
                    position: relative;
                    color: ${theme.colors.grey.plain};
                    font-size: 36px;
                }
                .info-body-phone, .video-phone, .image-wrapper-phone {
                    display: none;
                }
                @media screen and (max-width: ${theme.media.desktop}) {
                    .section-2 {
                        padding: 20px 22px;
                    }
                    .character {
                        padding-right: 15px;
                    }
                }
                 @media screen and (max-width: ${theme.media.tablet}) {
                    .character {
                        width: 83%;
                    }
                 }
                 @media screen and (max-width: 900px) {
                    .character {
                        width: 80%;
                    }
                 }
                 @media screen and (max-width: 900px) {
                    .character {
                        width: 80%;
                    }
                 }
                 @media screen and (max-width: 800px) {
                    .info-body-phone {
                        display: block;
                    }
                    .video-phone {
                        display: flex;
                        margin-top: 30px;
                    }
                    .back, .video-desktop, .info-body-desktop {
                        display: none;
                    }
                    .character {
                        width: 100%;
                        border-right: 0;
                        padding: 0;
                    }
                    .section-1 {
                        margin-bottom: 25px;
                    }
                    .section-2 {
                        margin-top: 30px;
                    }
                    .section-3 {
                        padding: 0 0 70px;
                    }
                 }
                 @media screen and (max-width: ${theme.media.phoneS}) {
                    .section-1 {
                        flex-direction: column;
                        margin: 20px 0;
                    }
                    .info-head {
                        order: 1;
                    }
                    .image-wrapper-desktop {
                        display: none;
                    }
                    .image-wrapper-phone {
                        display: block;
                        width: 100%;
                    }
                    .image-wrapper-phone img {
                        max-width: 100%;
                        max-height: 100%;
                    }
                    .video-phone {
                        margin-top: 16px;
                    }
                    .section-2 {
                        padding: 20px 11px;
                    }
                    .save {
                        display: block;
                        margin-left: 0;
                        margin-top: 5px;
                    }
                 }
            `}</style>
        </Layout>
    );
};

const mapStateToProps = createStructuredSelector({
    isFetching: selectIsChildFetching,
    childData: selectChildData,
    query: selectChildrenQuery
});

const mapDispatchToProps = (dispatch) => ({
    setChildrenQuery: (query) => dispatch(setChildrenQuery(query))
});

Profile.getInitialProps = async ({ctx: {store, query}}) => {
    const nullStr = 'null';
    if (query.id !== nullStr) {
        store.dispatch(fetchChildStart(query.id));
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
