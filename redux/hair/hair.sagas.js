import { takeLatest, call, put, all } from 'redux-saga/effects';
import fetch from 'isomorphic-unfetch';
import hairActionTypes from './hair.types';
import { fetchHairFailure, fetchHairSuccess } from './hair.actions';
import server from '../../utils/config';

function* fetchHairAsync() {
    try {
        const response = yield fetch(`${server}/api/hair`);
        const data = yield response.json();
        yield put(fetchHairSuccess(data));
    } catch (err) {
        yield put(fetchHairFailure(err.message));
    }
}

export function* fetchHairStart() {
    yield takeLatest(hairActionTypes.FETCH_HAIR_START, fetchHairAsync);
}

export function* hairSagas() {
    yield all([
        call(fetchHairStart)
    ]);
}
