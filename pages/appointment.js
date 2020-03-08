import React from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';

import Layout from '../components/Layout/Layout';
import Breadcrumbs from '../reusable/Breadcrumbs';
import Title from '../reusable/Title';
import CalendarForm from '../components/CalendarForm/CalendarForm';

import theme from '../utils/styles/theme';
import '../static/css/datepicker.css';
import '../static/css/rangeInput.css';
import { instruction } from '../utils/stubs';

import { fetchRegionsStart } from '../redux/regions/regions.actions';
import { fetchDatesStart, fetchNextDatesStart } from '../redux/appointment/appointment.actions';

import {useSelector} from 'react-redux';
import {selectDates} from '../redux/appointment/appointment.selectors';

const Appointment = () => {
    const pageName = 'Запись на приём';

    const dates = useSelector(selectDates);

    // console.log(11, dates);

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
                <Breadcrumbs pageName={pageName} pageAddress='appointment' />
                <Title title={pageName} />

                <section className='address'>
                    <img src='/static/images/appointment.png' alt='запись на приём' className='address__img'/>
                    <div className='address__info'>
                        <p>Уважаемые кандидаты в замещающие родители!</p>
                        <p>
                            <span className='attention'>Обращаем Ваше внимание</span>
                            , что федеральный банк данных о детях осуществляет прием по адресу:
                        </p>
                        <p>Москва, Каретный Ряд, д.2 , кабинеты 48 и 49</p>
                    </div>
                </section>

                <p className='p'>Для осуществления записи на прием Вам необходимо:</p>

                <section className='instruction'>
                    {
                        instruction.map(({ img, text }, i) => {
                            if (i === 0) {
                                return <div className='instruction-item' key={i}>
                                    <div className={`img ${i === 2 ? 'mt' : ''}`}>
                                        <img src={img} alt={`шаг ${i + 1}`} className={`img-${i}`}/>
                                    </div>
                                    <div className='step'>
                                        <p>
                                            Для осуществления записи на прием Вам необходимо ввести
                                            <span className='attention'> ДОСТОВЕРНУЮ ИНФОРМАЦИЮ</span>,
                                            содержащую ФИО кандидата(ов) в замещающте родители и номер контактного телефона
                                        </p>
                                    </div>
                                </div>;
                            } else {
                                return <div className='instruction-item' key={i}>
                                    <div className={`img ${i === 2 ? 'mt' : ''}`}>
                                        <img src={img} alt={`шаг ${i + 1}`} className={`img-${i}`}/>
                                    </div>
                                    <div className='step'>
                                        <p>{text}</p>
                                    </div>
                                </div>;
                            }

                        })
                    }
                </section>

                <section className='warning'>
                    <p>Уважаемые пользователи! Перед заполнением анкеты на осуществление записи на приём, <span className='attention'>необходимо обновить страницу</span>, путём нажатия клавиши F5 в 10:00 по московскому времени.</p>
                    <p>
                        <span className='attention'>ОБРАЩАЕМ ВАШЕ ВНИМАНИЕ </span>
                        на то, что если Вами некорректно указаны ФИО или номер телефона, то федеральный оператор оставляет за собой право освободить дату и время Вашего приема для записи других граждан.
                    </p>
                    <p>В случае отказа граждан от предварительной записи на сайте появляется возможность записаться на освободившееся время.</p>
                    {dates && dates.length === 0 &&
                    <p>На ближайшие дни нет времени доступного для записи на прием. Следующий период записи с 27-31 Января, откроется 20 Января в 10:00 по Московскому времени.</p>
                    }
                </section>

                <section className='form'>
                    <CalendarForm />
                </section>

            </div>
            <style jsx>{`
                    .error {
                        color: ${theme.colors.lavender.darkest};
                        font-size: ${theme.fontSize.h2};
                        text-align: center;
                    }
                    .address {
                        display: flex;
                        color: ${theme.colors.grey.dark};
                        line-height: ${theme.lineHeight.plain};
                        align-items: center;
                        font-weight: 300;
                    }
                    .address__img {
                        margin-right: 2rem;
                    }
                    .address__info p {
                        margin: .5rem 0 .3rem;
                    }
                    .address__info p:last-of-type {
                        margin: .3rem 0;
                    }
                    .attention {
                        text-transform: uppercase;
                        color: ${theme.colors.blue.dark};
                        font-weight: 400;
                    }
                    .instruction {
                        display: flex;
                        justify-content: space-between;
                        margin: 5rem 0 3rem;
                    }
                    .instruction-item {
                        width: 30%;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                    }
                    .mt {
                        margin-top: -.8rem;
                    }
                    .step {
                        margin-top: 1.8rem;
                    }
                    .warning p {
                        margin: .5rem 0 .3rem;
                    }
                    .warning p:last-of-type {
                        margin: .3rem 0;
                    }
                    .form {
                        margin: 2.5rem 0 4rem;
                    }
                    .p {
                        display: none;
                    }
                    @media screen and (max-width: ${theme.media.tabletS}) {
                        .p {
                            display: block;
                            margin-top: 40px;
                            color: #3b4255;
                            line-height: 24px;
                        }
                        .instruction {
                            flex-direction: column;
                            margin: 46px 0;
                        }
                        .instruction-item {
                            flex-direction: row;
                            width: 100%;
                            margin-bottom: 40px;
                        }
                        .instruction-item:last-of-type {
                            margin-bottom: 0;
                        }
                        .img {
                            width: auto;
                        }
                        .img img {
                            width: 100%;
                        }
                        .img-0 {
                            max-width: 130px;
                        }
                        .img-1 {
                            margin-left: 30px;
                            max-width: 86px;
                        }
                        .img-2 {
                            margin-left: 25px;
                            max-width: 103px;
                        }
                        .step {
                            width: 80%;
                            margin-top: 0;
                        }
                        .step p {
                            width: 100%;
                            padding-left: 20px;
                            margin 0;
                        }
                        .address__img {
                            margin-right: 0;
                            width: 260px;
                        }
                        .mt {
                            margin-top: 0;
                        }
                    }
                    @media screen and (max-width: ${theme.media.phoneS}) {
                        .address {
                            flex-direction: column;
                        }
                        .address__img {
                            margin-bottom: 35px;
                        }
                        .img-0, .img-1, .img-2 {
                            max-width: 60px;
                            margin: 0;
                        }
                        .instruction-item {
                            margin-bottom: 20px;
                        }
                        .instruction {
                            margin: 40px 0 30px;
                        }
                    }
                `}</style>
        </Layout>
    );
};

const mapDispatchToProps = (dispatch) => ({
    fetchRegionsStart: () => dispatch(fetchRegionsStart())
});

Appointment.getInitialProps = async ({ ctx: { store } }) => {
    if (!store.getState().regions.regionOptions) {
        store.dispatch(fetchRegionsStart());
    }
    if (!store.getState().appointment.dates) {
        store.dispatch(fetchDatesStart());
    }
    if (!store.getState().appointment.nextDates) {
        store.dispatch(fetchNextDatesStart());
    }
};

export default connect(null, mapDispatchToProps)(Appointment);
