import React, { useState } from 'react';
import {withRouter} from 'next/router';
import theme from '../../utils/styles/theme';
import MenuItem from './MenuItem';
import Link from 'next/link';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import { menuItems } from '../../utils/stubs';

const Header = ({ main, router }) => {
    let [activeTab, setActiveTab] = useState(router.pathname.replace('/', ''));

    const handleTabClick = (path) => {
        setActiveTab(path);
    };
    return (
        <header className='header'>
            <div className='header__inner'>
                <div className='logo'>
                    <Link href='/'>
                        <a aria-label='На главную страницу сайта'>
                            <div className='logo__img'>
                                {
                                    main ?
                                        <img src="/static/images/logo_inverse.png" alt='Лого'/> :
                                        <img src="/static/images/logo.png" alt='Лого'/>
                                }
                            </div>
                            <div className='logo__text'>
                                усыновление в российской федерации
                            </div>
                        </a>
                    </Link>

                </div>
                <div className='menu'>
                    {
                        menuItems.map((item, i) =>
                            <MenuItem
                                key={i}
                                item={item}
                                main={main}
                                activeTab={activeTab}
                                handleTabClick={handleTabClick}
                            />
                        )
                    }
                </div>
                <div className='search'/>
                <div className='burger'>
                    <BurgerMenu/>
                </div>
                {
                    main &&
                    <div className='sky'>
                        <img src='/static/images/sky.png' alt='небо'/>
                    </div>
                }
                {
                    main &&
                    <div className='stork'>
                        <img src='/static/images/stork.png' alt='аист'/>
                    </div>
                }
            </div>

            <style jsx>{`
            .header {
                background-color: ${main ? '#fff' : theme.colors.blue.header};
                color: ${main ? theme.colors.blue.darkest : '#fff'};
            }
            
            .header__inner {
                max-width: 1140px;
                position: relative;
                margin: 0 auto;
                display: flex;
                justify-content: space-between;
                padding: 10px;
            }
            
            .logo a {
                display: flex;
                align-items: center;
                color: ${main ? theme.colors.blue.darkest : '#fff'};
            }
            
            .logo__img {
                margin-right: 15px;
            }
            
            .logo__text {
                text-transform: uppercase;
                font-weight: 700;
                width: 225px;
                line-height: 18px;
            }
            
            .menu {
                display: flex;
                align-items: center;
                z-index: 10;
            }
            
            .sky {
                position: absolute;
                right: -20%;
                top: 0;
                width: 55%;
            }
            
            .stork {
                position: absolute;
                right: 7%;
                top: 70%;
            }
            
            img {
                width: 100%;
            }
            .burger {
                display: none;
            }
            
            @media screen and (max-width: ${theme.media.desktop}) {
                .header__inner {
                    max-width: 90%;
                }
                .sky img {
                    width: 105%;
                }
                .stork {
                    right: 0;
                    top: 52%;
                }
                .stork img {
                    width: 85%;
                }
            }
            @media screen and (max-width: 1100px) {
                .menu {
                    display: none;
                }
                .burger {
                    display: flex;
                    align-items: center;
                }
            }
            @media screen and (max-width: ${theme.media.tablet}) {
                .header__inner {
                    max-width: 95%;
                }
                .sky {
                    width: 57%;
                }
                .sky img {
                    width: 105%;
                }
                .stork {
                    right: 0;
                    top: 52%;
                }
                .stork img {
                    width: 85%;
                }
            }
            @media screen and (max-width: ${theme.media.tabletS}) {
                .sky {
                    width: 58%;
                }
                .sky img {
                    width: 95%;
                }
                .stork {
                    right: 0;
                    top: 52%;
                }
                .stork img {
                    width: 80%;
                }
            }
            @media screen and (max-width: 800px) {
                .sky {
                    width: 60%;
                }
                .sky img {
                    width: 106%;
                }
                .stork {
                    right: -6%;
                    top: 40%;
                }
            }
            @media screen and (max-width: ${theme.media.phoneS}) {
                .logo a {
                    flex-direction: ${main ? 'column' : 'row'};
                }
                .logo__text {
                    text-align: ${main ? 'center' : 'left'};
                    width: 135px;
                }
                .logo__img {
                    margin-right: ${main ? '0' : '15px'};
                }
                .sky {
                    width: 75%;
                }
                .sky img {
                    width: 150%;
                }
                .stork {
                    top: 21%;
                    width: 65%;
                    right: -14%;
                }
                .stork img {
                    width: 100%;
                }
                .logo {
                    margin-top: ${main ? '25px' : '0'};
                    margin-left: 15px;
                }
                .burger {
                    align-items: ${main ? 'baseline' : 'center'};
                    margin-top: ${main ? '3%' : '0'};
                }
            }
    `}</style>
        </header>
    );

};

export default withRouter(Header);
