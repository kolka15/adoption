import { takeLatest, call, put, all } from 'redux-saga/effects';
import fetch from 'isomorphic-unfetch';
import childrenActionTypes from './children.types';
import { fetchChildrenFailure, fetchChildrenSuccess } from './children.actions';
import server from '../../utils/config';

function* fetchChildrenAsync({ payload }) {
    try {
        const response = yield fetch(`${server}/api/children${payload ? payload : ''}`);
        const data = yield response.json();
        yield put(fetchChildrenSuccess(data));
    } catch (err) {
        yield put(fetchChildrenFailure(err.message));
    }
}

export function* fetchChildrenStart() {
    yield takeLatest(childrenActionTypes.FETCH_CHILDREN_START, fetchChildrenAsync);
}

export function* childrenSagas() {
    yield all([
        call(fetchChildrenStart)
    ]);
}
