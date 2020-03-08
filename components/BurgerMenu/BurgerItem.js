import React, { useState } from 'react';
import theme from '../../utils/styles/theme';
import Link from 'next/link';
import BurgerSubItem from './BurgerSubItem';

const BurgerItem = ({ item, handleTabClick, activeTab }) => {
    const { name, url, children } = item;
    const isActive = children && children.length ? children.some(child => child.url === activeTab) : activeTab === url;

    let [isTabOpen, setIsTabOpen] = useState(false);

    const handleClick = () => {
        if (children && children.length) {
            setIsTabOpen(!isTabOpen);
            return;
        }
        handleTabClick(url);
    };

    return (
        <li className='menu-item'>
            {
                children && children.length ?
                    <span onClick={handleClick} className='a'>
                        <span>{name}</span>
                        {
                            children && children.length > 0 &&
                            <span className='arrow-down' />
                        }
                    </span>  :
                    <Link href={`/${url}`}>
                        <a onClick={handleClick} aria-label='Открыть меню'>
                            <span>{name}</span>
                            {
                                children && children.length > 0 &&
                                <span className='arrow-down' />
                            }
                        </a>
                    </Link>
            }

            {
                isTabOpen &&
                <div className='submenu'>
                    <ul>
                        {
                            children.map((item, i) =>
                                <BurgerSubItem key={i} item={item} activeTab={activeTab}/>
                            )
                        }
                    </ul>
                </div>
            }

            <style jsx>{`
            .menu-item a:hover, .menu-item a:active,
            .menu-item .a:hover, .menu-item .a:active {
                color: #fff;
            }
             a {
                color: ${isActive ? '#fff' : theme.colors.lavender.light};
            }
            .a {
                color: ${(isTabOpen || isActive) ? '#fff' : theme.colors.lavender.light};
            }
            .menu-item a:hover .arrow-down, .menu-item a:active .arrow-down {
                border-top-color: #fff;
            }
            .arrow-down {
                width: 0px;
                height: 0px;
                border-left: 4px solid transparent;
                border-right: 4px solid transparent;
                border-top: 5px solid ${isActive ? '#fff' : theme.colors.lavender.light};
                margin-left: 5px;
                font-size: 2px;
            }
            .menu-item {
                box-sizing: border-box;
                padding: 20px 0; 
                width: 263px;
                font-size: 22px;
                line-height: 30px;
                border-bottom: 1px solid ${theme.colors.lavender.light};
                text-align: left;
                cursor: pointer;
                margin-left: -5%;
            }
            .menu-item:last-of-type {
                border-bottom: none;
            }
    `}</style>
        </li>
    );
};

export default BurgerItem;
