import { takeLatest, call, put, all } from 'redux-saga/effects';
import fetch from 'isomorphic-unfetch';
import custodyActionTypes from './custody.types';
import { fetchCustodyFailure, fetchCustodySuccess } from './custody.actions';
import server from '../../utils/config';

function* fetchCustodyAsync() {
    try {
        const response = yield fetch(`${server}/api/custody_form`);
        const data = yield response.json();
        yield put(fetchCustodySuccess(data));
    } catch (err) {
        yield put(fetchCustodyFailure(err.message));
    }
}

export function* fetchCustodyStart() {
    yield takeLatest(custodyActionTypes.FETCH_CUSTODY_START, fetchCustodyAsync);
}

export function* custodySagas() {
    yield all([
        call(fetchCustodyStart)
    ]);
}
