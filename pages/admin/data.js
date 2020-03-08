import React from 'react';

import Title from '../../reusable/Title';
import LayoutLK from '../../components/LayoutLK/LayoutLK';

import {withAuthSync} from '../../utils/auth';
import {useRouter} from 'next/router';
import {checkAdmin} from '../../utils/checkUserRole';
import AdminNav from '../../components/AdminLK/AdminNav';
import theme from '../../utils/styles/theme';
import DataScrollList from '../../components/AdminLK/DataScrollList';
import DataDownloadDate from '../../components/AdminLK/DataDownloadDate';
import DataUpload from '../../components/AdminLK/DataUpload';
import {fetchFilesListStart, fetchLastUploadStart} from '../../redux/admin-data/admin-data.actions';
import Head from 'next/head';


const Data = ({token}) => {

    const router = useRouter();

    return (
        <>
            <Head>
                <link type="text/css" href="/static/css/datepicker.css" rel="stylesheet" />
            </Head>
            <LayoutLK token={token}>
                <div className='content'>
                    <Title title='Личный кабинет АДМИНИСТРАТОРА ПОРТАЛА'/>
                    <AdminNav router={router}/>
                </div>
                <div className='content__wrapper'>
                    <div className="content__col-1">
                        <DataScrollList/>
                    </div>
                    <div className="content__col-2">
                        <DataDownloadDate/>
                        <DataUpload/>
                    </div>
                </div>

                <style jsx>{`
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
        </>
    );
};

Data.getInitialProps = async (ctx, token) => {
    const {store, res} = ctx;

    checkAdmin(store, res);
    store.dispatch(fetchLastUploadStart(token));
    store.dispatch(fetchFilesListStart(token));
};

export default withAuthSync(Data);
