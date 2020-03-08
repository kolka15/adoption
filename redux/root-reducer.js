import {combineReducers} from 'redux';

import municipalityReducer from './municipality/municipality.reducers';
import appointmentsReducer from './appointments/appointments.reducers';
import appointmentReducer from './appointment/appointment.reducers';
import adminPagesReducer from './admin-pages/admin-pages.reducers';
import adminUsersReducer from './admin-users/admin-users.reducers';
import lkRegionReducer from './lk-regional/lk-regional.reducers';
import adminDataReducer from './admin-data/admin-data.reducers';
import documentsReducer from './documents/documents.reducers';
import childrenReducer from './children/children.reducers';
import regionsReducer from './regions/regions.reducers';
import custodyReducer from './custody/custody.reducers';
import genderReducer from './gender/gender.reducers';
import childReducer from './child/child.reducers';
import totalReducer from './total/total.reducers';
import loginReducer from './login/login.reducers';
import eyesReducer from './eyes/eyes.reducers';
import hairReducer from './hair/hair.reducers';
import newsReducer from './news/news.reducers';
import faqReducer from './faq/faq.reducers';

const rootReducer = combineReducers({
    municipality: municipalityReducer,
    appointments: appointmentsReducer,
    appointment: appointmentReducer,
    adminUsers: adminUsersReducer,
    adminPages: adminPagesReducer,
    lkRegional: lkRegionReducer,
    adminData: adminDataReducer,
    documents: documentsReducer,
    children: childrenReducer,
    regions: regionsReducer,
    custody: custodyReducer,
    gender: genderReducer,
    child: childReducer,
    total: totalReducer,
    login: loginReducer,
    eyes: eyesReducer,
    hair: hairReducer,
    news: newsReducer,
    faq: faqReducer,
});

export default rootReducer;
