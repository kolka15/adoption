import React  from 'react';
import theme from '../../utils/styles/theme';
import Link from 'next/link';
import SubmenuItem from './SubmenuItem';

const MenuItem = ({ item, main, handleTabClick, activeTab }) => {
    const { name, url, children } = item;
    const isActive = children && children.length ? children.some(child => child.url === activeTab) : activeTab === url;

    const handleClick = () => {
        if (children && children.length) {
            return;
        }
        handleTabClick(url);
    };

    return (
        <div className='menu-item'>
            {
                children && children.length ?
                    <div onClick={handleClick} className='a hoverable'>
                        <span>{name}</span>
                        {
                            children && children.length > 0 &&
                            <span className='arrow-down' />
                        }
                    </div>  :
                    <Link href={`/${url}`}>
                        <a onClick={handleClick} aria-label={`Перейти в раздел ${name}`}>
                            <span>{name}</span>
                        </a>
                    </Link>
            }

            {
                children &&
                <div className='submenu openable'>
                    <div className={`submenu-inner ${main ? 'submenu-inner_main' : ''}`}>
                        <ul>
                            {
                                children.map((item, i) =>
                                    <SubmenuItem key={i} item={item} activeTab={activeTab}/>
                                )
                            }
                        </ul>
                    </div>
                </div>
            }

            <style jsx>{`
            .menu-item {
                color: #fff;
                margin-right: 20px;
                cursor: pointer;
            }
            .menu-item:last-of-type {
                margin-right: 0;
            }
            .menu-item a:hover, .menu-item a:active,
             .menu-item .a:hover, .menu-item .a:active {
                color: ${theme.colors.blue.pale};
            }
            a {
                color: ${isActive ? theme.colors.blue.pale : (main ? theme.colors.lavender.light : '#fff')};
            }
            .a {
                color: ${isActive ? theme.colors.blue.pale : (main ? theme.colors.lavender.light : '#fff')};
            }
            .menu-item a:hover .arrow-down, .menu-item a:active .arrow-down {
                border-top-color: ${theme.colors.blue.pale};
            }
            .arrow-down {
                width: 0px;
                height: 0px;
                border-left: 4px solid transparent;
                border-right: 4px solid transparent;
                border-top: 5px solid ${isActive ? theme.colors.blue.pale : (main ? theme.colors.lavender.light : '#fff')};
                margin-left: 5px;
                font-size: 2px;
            }
            .submenu {
                position: absolute;
                padding-top: 21px;
            }
            .submenu a {
                color: ${theme.colors.lavender.plain};
            }
            .submenu a:active, .submenu a:hover {
                color: ${theme.colors.blue.light};
                text-decoration: underline;
            }
            li {
                padding: 5px 0;
            }
            li:last-of-type {
                padding: 5px 0 0;
            }
            li:first-of-type {
                padding: 0 0 5px;
            }
    `}</style>
        </div>
    );
};

export default MenuItem;
