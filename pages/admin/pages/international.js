import React, {useState} from 'react';

import theme from '../../../utils/styles/theme';
import Title from '../../../reusable/Title';
import LayoutLK from '../../../components/LayoutLK/LayoutLK';

import {withAuthSync} from '../../../utils/auth';
import {useRouter} from 'next/router';
import {checkAdmin} from '../../../utils/checkUserRole';
import AdminNav from '../../../components/AdminLK/AdminNav';
import PagesNav from '../../../components/AdminLK/PagesNav';
import dynamic from 'next/dynamic';
const DynamicCKEditor = dynamic(
    () => import('../../../components/CKEditorComponent/CKEditorComponent'),
    { ssr: false }
);


const International = ({token}) => {

    const router = useRouter();

    return (
        <LayoutLK token={token}>
            <div className='content'>
                <Title title='Личный кабинет АДМИНИСТРАТОРА ПОРТАЛА'/>
                <AdminNav router={router}/>
                <div className='content__wrapper'>
                    <div className="content__col-1">
                        <PagesNav router={router}/>
                    </div>
                    <div className="content__col-2">
                        <DynamicCKEditor/>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .error {
                    color: ${theme.colors.lavender.darkest};
                    font-size: ${theme.fontSize.h2};
                    text-align: center;
                }
                .content {
                }
                .content__wrapper {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 35px;
                    align-items: start;
                }
                .content__col-1 {
                    flex: 0 0 31%;
                    max-width: 31%;
                }
                .content__col-2 {
                    flex: 0 0 65%;
                    max-width: 65%;
                }
                @media screen and (max-width: ${theme.media.tabletS}) {
                   .content__wrapper {
                      flex-wrap: wrap;
                  }
                  .content__col-1 {
                    margin-bottom: 40px;
                  }
                  .content__col-1, .content__col-2 {
                   flex: 0 0 100%;
                    max-width: 100%;
                  }
                }
        
            `}</style>
        </LayoutLK>

    );
};

International.getInitialProps = async (ctx) => {
    const {store, res} = ctx;
    checkAdmin(store, res);
};

export default withAuthSync(International);