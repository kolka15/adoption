import React from 'react';
import Link from 'next/link';
import theme from '../../utils/styles/theme';

const AdminNav = ({router}) => {

    const {pathname} = router;

    const links = [
        {name: 'ПОЛЬЗОВАТЕЛИ', link: '/admin/users', route: '/admin/users'},
        {name: 'БАНК ДАННЫХ', link: '/admin/data', route: '/admin/data'},
        {name: 'РЕДАКТИРОВАНИЕ СТРАНИЦ', link: '/admin/pages/faq', route: '/admin/pages'},
    ];

    return (
        <>
            <nav className='admin-nav'>
                {
                    links && links.map((link, i) => (
                        <Link href={link.link} key={i}>
                            <a className={`admin-nav__link ${pathname.includes(link.route) ? 'active' : ''}`}
                                title={link.name}>{link.name}</a>
                        </Link>
                    ))
                }
            </nav>

            <style jsx>{`
              .admin-nav {
                display:flex;
                flex-wrap: wrap;
                margin-bottom: 40px;
              }
              .admin-nav__link {
                margin-right: 40px;
                color: #3b4255;
                font-size: 18px;
                font-weight: 500;
                line-height: 1.11;
                transition: all .2s;
                margin-bottom: 15px;  
              }
              .admin-nav__link:hover {
                 color: #1641a8;     
              }
              .admin-nav__link.active {
                pointer-events: none;
                color: #1641a8;             
              }
            `}</style>
        </>
    );
};

export default AdminNav;
