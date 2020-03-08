import { takeLatest, call, put, all } from 'redux-saga/effects';
import fetch from 'isomorphic-unfetch';
import documentsActionTypes from './documents.types';
import { fetchInternationalLawsFailure, fetchInternationalLawsSuccess } from './documents.actions';
import server from '../../utils/config';

function* fetchInternationalLawsAsync() {
    try {
        const response = yield fetch(`${server}/api/international_laws`);
        const data = yield response.json();
        yield put(fetchInternationalLawsSuccess(data));
    } catch (err) {
        yield put(fetchInternationalLawsFailure(err.message));
    }
}

export function* fetchInternationalLawsStart() {
    yield takeLatest(documentsActionTypes.FETCH_INTERNATIONAL_LAWS_START, fetchInternationalLawsAsync);
}

export function* documentsSagas() {
    yield all([
        call(fetchInternationalLawsStart)
    ]);
}
