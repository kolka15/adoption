import React, {useEffect, useState} from 'react';
import theme from '../../utils/styles/theme';
import FAQItem from './FAQItem';
import Link from 'next/link';
import Carousel from '../../reusable/Carousel';

import {useSelector, useDispatch} from 'react-redux';
import {fetchFAQStart} from '../../redux/faq/faq.actions';

const FAQ = () => {
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        arrows: true,
        slidesToShow:  3, // 2 on 1100
        slidesToScroll: 3,
        rows: 1,
        slidesPerRow: 1,
        responsive: [
            {
                breakpoint: 1090,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 700,
                settings: {
                    arrows: false,
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 630,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    rows: 2
                }
            }
        ]
    };

    const {faqList} = useSelector(state => state.faq);
    const dispatch = useDispatch();

    const [questions, setQuestions] = useState(faqList);

    useEffect(() => {
        if (faqList) return;
        dispatch(fetchFAQStart());
    }, []);

    useEffect(() => {
        if (!faqList) return;
        setQuestions(faqList);
    }, [faqList]);

    return (
        <div className='wrapper' id='faq'>
            <div className='blue'/>
            <div className='faq'>
                <div className='faq__header'>
                    <h2 className='faq__title'>
                        часто задаваемые вопросы
                    </h2>
                    <div className='faq__nav'>
                        <Link href='/questions'>
                            <a aria-label='Открыть все вопросы'>все вопросы</a>
                        </Link>
                    </div>
                </div>
                <div className='faq__slides'>
                    {
                        questions &&
                        <Carousel settings={settings}>
                            {
                                questions && questions.map((item, i) =>
                                    <FAQItem key={i} item={item} />
                                )
                            }
                        </Carousel>
                    }
                </div>
            </div>

            <style jsx>{`
            .wrapper {
                position: relative;
                height: 600px;
            }
            .blue {
                margin: 0 -800px;
                background-image: linear-gradient(to top, #278fe9 0%, #466dc5 100%);
                position: relative;
                margin-top: 90px;
                height: 420px;
                border-radius: 0 0 100% 100% / 0 0 40% 40%;
            }
            .faq {
                max-width: 1170px;
                position: absolute;
                // position: relative;
                margin: 0 auto;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                padding-top: 70px;
                align-items: center;
                // top: -420px;
                top: 80px;
            }
            .faq__header {
                max-width: 1140px;
                width: 100%;
                display: flex;
                justify-content: space-between;
            }
            .faq__slides {
                max-width: 1150px;
            }
            .faq__title {
                margin: 0;
                color: #fff;
                font-size: ${theme.fontSize.h2};
                font-weight: 700;
                line-height: ${theme.lineHeight.h2};
                text-transform: uppercase;
                padding-bottom: 45px;
            }
            a {
                color: #ffffff;
                font-size: 14px;
                font-weight: 700;
                line-height: 34px;
                text-decoration: underline;
                text-transform: uppercase;
            }
            @media screen and (max-width: ${theme.media.desktop}) {
                .faq__slides {
                    max-width: 103%;
                }
            }
            @media screen and (max-width: ${theme.media.tabletS}) {
                .blue {
                    margin-top: 45px;
                }
                .faq__title {
                    font-size: 24px;
                }
                .faq {
                    padding-top: 45px;
                }
            }
            @media screen and (max-width: 630px) {
                .faq {
                    top: -300px;
                }
                .blue {
                    height: 300px;
                    border-radius: 0 0 100% 100% / 0 0 20% 20%;
                    margin: 0 -200px;
                    margin-top: 45px;
                }
                .wrapper {
                    position: relative;
                    height: 850px;
                }
                .faq__header {
                    flex-direction: column;
                }
                .faq__title {
                    padding-bottom: 0;
                }
                .faq__nav {
                    margin-bottom: 15px;
                }
                .faq__slides {
                    max-width: 110%;
                }
                .faq {
                    padding-top: 25px;
                }
                .blue {
                    margin-top: 30px;
                }
            }
        `}</style>
        </div>
    );
};

export default FAQ;
