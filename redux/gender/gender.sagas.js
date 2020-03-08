import { takeLatest, call, put, all } from 'redux-saga/effects';
import fetch from 'isomorphic-unfetch';
import genderActionTypes from './gender.types';
import { fetchGenderFailure, fetchGenderSuccess } from './gender.actions';
import server from '../../utils/config';

function* fetchGenderAsync() {
    try {
        const response = yield fetch(`${server}/api/gender`);
        const data = yield response.json();
        yield put(fetchGenderSuccess(data));
    } catch (err) {
        yield put(fetchGenderFailure(err.message));
    }
}

export function* fetchGenderStart() {
    yield takeLatest(genderActionTypes.FETCH_GENDER_START, fetchGenderAsync);
}

export function* genderSagas() {
    yield all([
        call(fetchGenderStart)
    ]);
}
