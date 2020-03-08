import { takeLatest, call, put, all } from 'redux-saga/effects';
import fetch from 'isomorphic-unfetch';
import regionsActionTypes from './regions.types';
import { fetchRegionsFailure, fetchRegionsSuccess } from './regions.actions';
import server from '../../utils/config';

function* fetchRegionsAsync() {
    try {
        const response = yield fetch(`${server}/api/regions`);
        const data = yield response.json();
        yield put(fetchRegionsSuccess(data));
    } catch (err) {
        yield put(fetchRegionsFailure(err.message));
    }
}

export function* fetchRegionsStart() {
    yield takeLatest(regionsActionTypes.FETCH_REGIONS_START, fetchRegionsAsync);
}

export function* regionSagas() {
    yield all([
        call(fetchRegionsStart)
    ]);
}
