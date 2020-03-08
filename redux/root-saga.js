import {all, call} from 'redux-saga/effects';
import 'isomorphic-unfetch';

import {municipalitySagas} from './municipality/municipality.sagas';
import {appointmentsSagas} from './appointments/appointments.sagas';
import {appointmentSagas} from './appointment/appointment.sagas';
import {adminPagesSagas} from './admin-pages/admin-pages.sagas';
import {adminUsersSagas} from './admin-users/admin-users.sagas';
import {lkRegionalSagas} from './lk-regional/lk-regional.sagas';
import {adminDataSagas} from './admin-data/admin-data.sagas';
import {documentsSagas} from './documents/documents.sagas';
import {childrenSagas} from './children/children.sagas';
import {custodySagas} from './custody/custody.sagas';
import {regionSagas} from './regions/regions.sagas';
import {genderSagas} from './gender/gender.sagas';
import {childSagas} from './child/child.sagas';
import {totalSagas} from './total/total.sagas';
import {loginSagas} from './login/login.sagas';
import {eyesSagas} from './eyes/eyes.sagas';
import {hairSagas} from './hair/hair.sagas';
import {newsSagas} from './news/news.sagas';
import {faqSagas} from './faq/faq.sagas';

function* rootSaga() {
    yield all([
        call(municipalitySagas),
        call(appointmentsSagas),
        call(appointmentSagas),
        call(adminUsersSagas),
        call(lkRegionalSagas),
        call(adminPagesSagas),
        call(adminDataSagas),
        call(documentsSagas),
        call(childrenSagas),
        call(custodySagas),
        call(genderSagas),
        call(regionSagas),
        call(loginSagas),
        call(childSagas),
        call(totalSagas),
        call(eyesSagas),
        call(hairSagas),
        call(newsSagas),
        call(faqSagas)
    ]);
}

export default rootSaga;
