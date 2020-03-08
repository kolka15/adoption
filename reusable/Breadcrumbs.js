import React from 'react';
import Link from 'next/link';
import theme from '../utils/styles/theme';
import Arrow from './Arrow';

const Breadcrumbs = ({ pageAddress, pageName }) => {
    return (
        <div className='breadcrumbs'>
            <Link href='/'>
                <a className='main' aria-label='Перейти на главную страницу'>Главная</a>
            </Link>
            <Arrow type='right' />
            <Link href={`/${pageAddress}`}>
                <a className='current' aria-label='Перейти в текущий раздел'>{pageName}</a>
            </Link>

            <style jsx>{`
                .breadcrumbs {
                    position: relative;
                    display: flex;
                    font-size: 14px;
                    line-height: 20px;
                    margin: 0;
                }
                .main {
                    color: ${theme.colors.blue.plain};
                    margin: 0 5px 0 0;
                }
                ,current {
                    color: ${theme.colors.lavender.plain};
                    margin: 0 0 0 10px;
                    text-transform: capitalize;
                }
        `}</style>
        </div>
    );
};

export default Breadcrumbs;
