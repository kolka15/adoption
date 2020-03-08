import React from 'react';
import theme from '../../utils/styles/theme';
import Link from 'next/link';

const BurgerSubItem = ({ item, activeTab }) => {
    const { name, url } = item;
    const isActive = activeTab === url;

    return (
        <li className='submenu-item'>
            <Link href={`/${url}`}>
                <a aria-label={`Перейти в раздел ${name}`}>{name}</a>
            </Link>

            <style jsx>{`
            .submenu-item a {
                color: ${isActive ? '#fff' : theme.colors.lavender.light};
            }
            .submenu-item a:active, .submenu-item a:hover {
                color: #fff;
            }
            li {
                font-size: 18px;
                padding: 5px 0;
                text-align: left;
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

export default BurgerSubItem;
