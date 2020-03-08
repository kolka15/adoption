import React from 'react';
import Link from 'next/link';

const PagesNav = ({router}) => {
    const {pathname} = router;
    const menu = [
        {title: 'Часто задаваемые вопросы', path: '/admin/pages/faq'},
        {title: 'Загрузка файлов', path: '/admin/pages/files'},
        {title: 'Форма семейного устройства', path: '/admin/pages/family'},
        {title: 'Международное усыновление', path: '/admin/pages/international'},
        {title: 'Контакты', path: '/admin/pages/contacts'},
        {title: 'Новости', path: '/admin/pages/news'},
    ];
    return (
        <>
            <nav className='pages-nav'>
                {
                    menu && menu.map((item, i) => (
                        <Link href={item.path} key={i}>
                            <a className={`pages-nav__item ${pathname === item.path ? 'active' : ''}`}>{item.title}</a>
                        </Link>
                    ))
                }
            </nav>
            <style jsx>{`
              .pages-nav {
                
              }
              .pages-nav__item {
                display: flex;
                min-height: 60px;
                align-items: center;
                padding: 0 20px;   
                color: #60678e;
                font-size: 16px;
                font-weight: 500;
                border-bottom: 1px solid  #cccccc;
              }
              .pages-nav__item:last-of-type {
                border-bottom: none; 
              }
              .pages-nav__item.active {
                background-color: #eef2fb;
                pointer-events: none;
              }
            `}</style>
        </>
    );
};

export default PagesNav;
