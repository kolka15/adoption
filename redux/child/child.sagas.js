import { takeLatest, call, put, all } from 'redux-saga/effects';
import fetch from 'isomorphic-unfetch';
import childActionTypes from './child.types';
import { fetchChildFailure, fetchChildSuccess } from './child.actions';
import server from '../../utils/config';

function* fetchChildAsync({ payload }) {
    try {
        const response = yield fetch(`${server}/api/children/${payload}`);
        const data = yield response.json();
        yield put(fetchChildSuccess(data));
    } catch (err) {
        yield put(fetchChildFailure(err.message));
    }
}

export function* fetchChildStart() {
    yield takeLatest(childActionTypes.FETCH_CHILD_START, fetchChildAsync);
}

export function* childSagas() {
    yield all([
        call(fetchChildStart)
    ]);
}
