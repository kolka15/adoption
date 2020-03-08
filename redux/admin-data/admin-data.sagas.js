import {takeLatest, call, put, all} from 'redux-saga/effects';
import fetch from 'isomorphic-unfetch';

import {
    fetchFilesListFailure,
    fetchFilesListSuccess,
    fetchLastUploadSuccess,
    fetchLastUploadFailure,
    editLastUploadSuccess,
    editLastUploadFailure,
} from './admin-data.actions';
import server from '../../utils/config';
import adminDataTypes from './admin-data.types';

function* fetchFilesListAsync({payload}) {
    try {
        const response = yield fetch(`${server}/api/private/upload`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${payload}`,
            }
        });

        const data = yield response.json();

        yield put(fetchFilesListSuccess(data));

    } catch (err) {
        yield put(fetchFilesListFailure(err.message));
    }
}

export function* fetchAdminFilesStart() {
    yield takeLatest(adminDataTypes.FETCH_FILES_LIST_START, fetchFilesListAsync);
}


function* fetchLastUploadAsync({payload}) {
    try {
        const response = yield fetch(`${server}/api/private/upload_last`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${payload}`,
            }
        });

        const data = yield response.json();

        yield put(fetchLastUploadSuccess(data));

    } catch (err) {
        yield put(fetchLastUploadFailure(err.message));
    }
}

export function* fetchLatUploadStart() {
    yield takeLatest(adminDataTypes.FETCH_LAST_UPLOAD_START, fetchLastUploadAsync);
}


function* editLastUploadAsync({payload}) {

    const {token, data} = payload;

    try {
        const response = yield fetch(`${server}/api/private/upload/last`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data)
        });

        const res = yield response.json();

        yield put(editLastUploadSuccess(res));

    } catch (err) {
        yield put(editLastUploadFailure(err.message));
    }
}

export function* editLatUploadStart() {
    yield takeLatest(adminDataTypes.EDIT_LAST_UPLOAD_START, editLastUploadAsync);
}




export function* adminDataSagas() {
    yield all([
        call(fetchAdminFilesStart),
        call(fetchLatUploadStart),
        call(editLatUploadStart),
    ]);
}
