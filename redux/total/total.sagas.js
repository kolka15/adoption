import { takeLatest, call, put, all } from 'redux-saga/effects';
import fetch from 'isomorphic-unfetch';
import totalActionTypes from './total.types';
import { fetchTotalFailure, fetchTotalSuccess } from './total.actions';
import server from '../../utils/config';

function* fetchTotalAsync() {
    try {
        const response = yield fetch(`${server}/api/children_total_date`);
        const data = yield response.json();
        yield put(fetchTotalSuccess(data));
    } catch (err) {
        yield put(fetchTotalFailure(err.message));
    }
}

export function* fetchTotalStart() {
    yield takeLatest(totalActionTypes.FETCH_TOTAL_START, fetchTotalAsync);
}

export function* totalSagas() {
    yield all([
        call(fetchTotalStart)
    ]);
}
