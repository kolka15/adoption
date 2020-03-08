import {takeLatest, call, put, all} from 'redux-saga/effects';
import fetch from 'isomorphic-unfetch';

import {fetchUsersAdminSuccess, fetchUsersAdminFailure} from './admin-users.actions';
import server from '../../utils/config';
import adminUsersTypes from './admin-users.types';
import {submitUserEditionSuccess, submitUserEditionFailure} from './admin-users.actions';


function* fetchUsersAdminAsync({payload}) {
    
    try {
        const response = yield fetch(`${server}/api/private/users`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${payload}`,
            }
        });
        
        const data = yield response.json();
        
        yield put(fetchUsersAdminSuccess(data));
        
    } catch (err) {
        yield put(fetchUsersAdminFailure(err.message));
    }
}

export function* fetchUsersAdminStart() {
    yield takeLatest(adminUsersTypes.FETCH_USERS_ADMIN_START, fetchUsersAdminAsync);
}


function* submitUserEditionAsync({payload}) {
    
    const {token, data} = payload;
    const {id} = data;
    
    try {
        const response = yield fetch(`${server}/api/private/user/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data)
        });
        
        const res = yield response.json();
        
        yield put(submitUserEditionSuccess(res));
        
        yield fetchUsersAdminAsync({payload: token});
        
    } catch (err) {
        yield put(submitUserEditionFailure(err.message));
    }
}

export function* submitUserEditionStart() {
    yield takeLatest(adminUsersTypes.SUBMIT_USER_EDITION_START, submitUserEditionAsync);
}


export function* adminUsersSagas() {
    yield all([
        call(fetchUsersAdminStart),
        call(submitUserEditionStart),
    
    ]);
}
