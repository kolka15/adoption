import React, {useEffect, useState} from 'react';
import theme from '../../utils/styles/theme';
import NewsItem from './NewsItem';
import Link from 'next/link';
import Carousel from '../../reusable/Carousel';

import {useSelector, useDispatch} from 'react-redux';
import {fetchAllNewsStart} from '../../redux/news/news.actions';

const News = () => {
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        arrows: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        rows: 1,
        slidesPerRow: 1,
        responsive: [
            {
                breakpoint: 900,
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

    const {newsList} = useSelector(state => state.news);
    const dispatch = useDispatch();

    const [newsItems, setNewsItems] = useState(newsList);

    useEffect(() => {
        if (newsList) return;
        dispatch(fetchAllNewsStart());
    }, []);

    useEffect(() => {
        if (!newsList) return;
        setNewsItems(newsList);
    }, [newsList]);

    // console.log(newsList)

    return (
        <div className='wrapper' id='news'>
            <div className='news'>
                <div className='news__header'>
                    <h2 className='news__title'>
                        новости
                    </h2>
                    <div className='news__nav'>
                        <Link href='/news'>
                            <a aria-label='Ссылка на все новости'>все новости</a>
                        </Link>
                    </div>
                </div>
                <div className='news__slides'>
                    {
                        newsItems &&
                        <Carousel settings={settings}>
                            {
                                newsItems && newsItems.items && newsItems.items.map((item, i) =>
                                    <NewsItem key={i} item={item}/>
                                )
                            }
                        </Carousel>
                    }
                </div>
            </div>

            <style jsx>{`
            .wrapper {
                position: relative;
                margin-bottom: 20px;
            }
            .news {
                max-width: 1170px;
                margin: 0 auto;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                padding-top: 70px;
                align-items: center;
            }
            .news__header {
                max-width: 1140px;
                width: 100%;
                display: flex;
                justify-content: space-between;
            }
            .news__slides {
                max-width: 1150px;
            }
            .news__title {
                margin: 0;
                color: ${theme.colors.lavender.darkest};
                font-size: ${theme.fontSize.h2};
                font-weight: 700;
                line-height: ${theme.lineHeight.h2};
                text-transform: uppercase;
                padding-bottom: 45px;
            }
            a {
                color: ${theme.colors.lavender.darkest};
                font-size: 14px;
                font-weight: 700;
                line-height: 34px;
                text-decoration: underline;
                text-transform: uppercase;
            }
            @media screen and (max-width: ${theme.media.desktop}) {
                .news__slides {
                    max-width: 103%;
                }
                .news {
                    padding-top: 100px;
                }
            }
            @media screen and (max-width: ${theme.media.tablet}) {
                .wrapper {
                    margin-bottom: 35px;
                }
            }
            @media screen and (max-width: ${theme.media.tabletS}) {
                .news {
                    padding-top: 30px;
                }
                .news__title {
                    font-size: 24px;
                    padding-bottom: 15px;
                }
            }
            @media screen and (max-width: ${theme.media.phoneS}) {
                .news__slides {
                    max-width: 107%;
                }
            }
        `}</style>
        </div>
    );
};

export default News;
