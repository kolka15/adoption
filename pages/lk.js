import React, {useEffect} from 'react';
import LayoutLK from '../components/LayoutLK/LayoutLK';
import theme from '../utils/styles/theme';
import Title from '../reusable/Title';

import RegionalLKForm from '../components/RegionalLK/RegionalLKForm';
import {connect} from 'react-redux';

import {
    fetchMunicipalDistrictStart,
    switchLkRegionEditForm,
} from '../redux/lk-regional/lk-regional.actions';
import {fetchRegionsStart} from '../redux/regions/regions.actions';
import {dispatchToken} from '../redux/login/login.actions';
import {
    fetchSpecialistsStart,
    fetchRoomsStart,
    fetchAppointmentsDatesStart,
    fetchAppointmentsStart
} from '../redux/appointments/appointments.actions';


import {createStructuredSelector} from 'reselect';
import {selectMunicipalData} from '../redux/lk-regional/lk-regional.selectors';
import {selectUserData} from '../redux/login/login.selectors';
import {withAuthSync} from '../utils/auth';
import FederalLK from '../components/FederalLK/FederalLK';
import {datesRange} from '../utils/formatDates';
import {userRoles} from '../utils/stubs';


const PersonalCabinet = (props) => {

    const {
        token,
        userData: {roles},
    } = props;

    let renderPage = null;
    let pageName = '';

    const userType = roles[0];

    switch (userType) {
    case userRoles.ROLE_FEDERAL_OPERATOR: {
        pageName = 'Личный кабинет федерального оператора';
        renderPage =  <FederalLK/>;
        break;
    }
    case userRoles.ROLE_REGIONAL_OPERATOR: {
        pageName = 'Личный кабинет регионального оператора';
        renderPage =  <RegionalLKForm/>;
        break;
    }
    default:
        pageName = 'Страница не найдена';
        break;
    }

    return (
        <LayoutLK token={token}>
            <div className='content'>
                <Title title={pageName}/>
                {renderPage}
            </div>
            <style jsx>{`
                    .error {
                        color: ${theme.colors.lavender.darkest};
                        font-size: ${theme.fontSize.h2};
                        text-align: center;
                    }
                    .content {
                    }
                `}</style>
        </LayoutLK>
    );
};


const mapDispatchToProps = (dispatch) => ({
    switchLkRegionEditForm: toggle => dispatch(switchLkRegionEditForm(toggle)),
    dispatchToken: token => dispatch(dispatchToken(token)),
});

const mapStateToProps = createStructuredSelector({
    selectMunicipalData: selectMunicipalData,
    userData: selectUserData,
});

PersonalCabinet.getInitialProps = async (ctx, token) => {
    const {store,res} = ctx;


    let userType = store.getState().login.userData.roles[0];

    switch (userType) {
    case userRoles.ROLE_ADMINISTRATOR: {
        res.writeHead(302, {Location: '/admin/users'});
        res.end();
        break;
    }
    case userRoles.ROLE_FEDERAL_OPERATOR: {
        store.dispatch(fetchSpecialistsStart());
        store.dispatch(fetchRoomsStart());
        store.dispatch(fetchAppointmentsDatesStart(token));
        store.dispatch(fetchAppointmentsStart({token, datesRange}));
        store.dispatch(fetchRegionsStart());
        break;
    }
    case userRoles.ROLE_REGIONAL_OPERATOR: {
        store.dispatch(fetchMunicipalDistrictStart(token));
        store.dispatch(fetchRegionsStart());
        break;
    }
    default:
        break;
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withAuthSync(PersonalCabinet));
