import theme from '../../utils/styles/theme';
import RecommendationItem from './RecommendationItem';
import Link from 'next/link';
import Carousel from '../../reusable/Carousel';
import { dataDocs } from '../../utils/stubs';

const Recommendations = () => {
    const settings = {
        infinite: false,
        centerPadding: '300px',
        slidesToShow: 2,
        speed: 500,
        arrows: true,
        rows: 2,
        slidesPerRow: 1,
        responsive: [
            {
                breakpoint: 961,
                settings: {
                    rows: 1,
                }
            },
            {
                breakpoint: 700,
                settings: {
                    arrows: false,
                    rows: 1,
                }
            },
            {
                breakpoint: 630,
                settings: {
                    slidesToShow: 1,
                    arrows: false,
                    rows: 2
                }
            }
        ]
    };
    return (
        <div className='wrapper' id='recommendation'>
            <div className='background' />
            <div className='recommendation'>
                <div className='nav'>
                    <Link href='/documents'>
                        <a aria-label='Ссылка на все документы'>все документы</a>
                    </Link>
                </div>
                <div className='recommendation__header'>
                    <div className='recommendation__img'>
                        <img src='/static/images/recommendations.png' alt='рекомендации' />
                    </div>
                    <h2 className='recommendation__title'>
                        Методические рекомендации
                    </h2>
                </div>
                <div className='slides-wrapper'>
                    <div className='recommendation__slides'>
                        <Carousel settings={settings}>
                            {
                                dataDocs.map((item, i) =>
                                    <RecommendationItem key={i} item={item} />
                                )
                            }
                        </Carousel>
                    </div>
                </div>
            </div>

            <style jsx>{`
            .wrapper {
                position: relative;
                height: 600px;
            }
            .background {
                background-image: linear-gradient(to top, #fff 0%, #ecf2fd 100%);
                border-radius: 100% 100% 0 0 / 40% 40% 0 0;
                position: relative;
                height: 600px;
                margin: 0 -800px;
            }
            .slides-wrapper {
                max-width: 750px;
                position: absolute;
                right: 0;
                top: 130px;
            }
            .recommendation {
                max-width: 1140px;
                margin: 0 auto;
                justify-content: space-between;
                padding-top: 100px;
                align-items: center;
            }
            .nav {
                top: 13%;;
                right: 0;
                position: absolute;
            }
            .recommendation__header {
                position: absolute;
                top: 150px;
                display: flex;
                width: 24%;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
            }
            .recommendation__slides {
               
            }
            .recommendation__title {
                color: ${theme.colors.lavender.darkest};
                font-size: ${theme.fontSize.h2};
                font-weight: 700;
                line-height: ${theme.lineHeight.h2};
                text-transform: uppercase;
                padding-bottom: 45px;
                text-align: left;
                margin: 20px 0 0;
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
                .recommendation {
                    max-width: 100%;
                }
                .slides-wrapper {
                    max-width: 76%;
                }
                .recommendation__header {
                    width: 21%;
                }
            }
            @media screen and (max-width: ${theme.media.tablet}) {
                .recommendation__header {
                    top: 24px;
                    flex-direction: row;
                }
                .slides-wrapper {
                    max-width: 102%;
                }
                .recommendation__img img {
                    width: 100px;
                    margin-right: 20px;
                }
                .recommendation__title {
                    padding-bottom: 30px
                }
                .wrapper, .background {
                    height: 525px;
                }
            }
            @media screen and (max-width: ${theme.media.tabletS}) {
                .recommendation__title {
                    font-size: 24px;
                    line-height: 30px;
                }
                .recommendation__header {
                    top: 30px;
                }
                .wrapper, .background {
                    height: 350px;
                }
            }
            @media screen and (max-width: ${theme.media.phoneS}) {
                .wrapper, .background {
                    height: 545px;
                }
                .slides-wrapper {
                    max-width: 105%;
                    margin-top: 30px;
                }
                .recommendation__img img {
                    width: 66px;
                    margin-right: 0;
                }
                .recommendation__header {
                    width: 100%;
                }
                .recommendation__img {
                    order: 2;
                }
                .recommendation__title {
                    order: 1;
                }
                .nav {
                    top: 23%;
                    left: 0;
                }
                .background {
                    margin: 0 -200px;
                    border-radius: 100% 100% 0 0 / 20% 20% 0 0;
                }
            }
        `}</style>
        </div>
    );
};

export default Recommendations;
