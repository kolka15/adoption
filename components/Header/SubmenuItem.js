import React from 'react';
import theme from '../../utils/styles/theme';
import Link from 'next/link';

const SubmenuItem = ({ item, activeTab }) => {
    const { name, url } = item;
    const isActive = activeTab === url;

    return (
        <li className='submenu-item'>
            <Link href={`/${url}`}>
                <a aria-label={`Перейти в раздел ${name}`}>{name}</a>
            </Link>

            <style jsx>{`
            .submenu {
                position: absolute;
                box-shadow: 0 0 17px rgba(0, 0, 0, 0.16);
                padding: 25px 15px;
                border-top: 2px solid ${theme.colors.blue.light};
                margin-top: 21px;
                background: #fff;
            }
            .submenu-item a {
                color: ${isActive ? theme.colors.blue.light : theme.colors.lavender.plain};
                text-decoration:  ${isActive ? 'underline' : 'none'};
               
            }
            .submenu-item a:active, .submenu-item a:hover {
                color: ${theme.colors.blue.light};
                text-decoration: underline;
            }
            li {
                padding: 5px 0 10px;
                line-height: 1.3;

            }
            li:last-of-type {
                padding: 5px 0 0;
            }
            li:first-of-type {
                padding: 0 0 5px;
            }
    `}</style>
        </li>
    );
};

export default SubmenuItem;
