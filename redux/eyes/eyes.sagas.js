import { takeLatest, call, put, all } from 'redux-saga/effects';
import fetch from 'isomorphic-unfetch';
import eyesActionTypes from './eyes.types';
import { fetchEyesFailure, fetchEyesSuccess } from './eyes.actions';
import server from '../../utils/config';

function* fetchEyesAsync() {
    try {
        const response = yield fetch(`${server}/api/eyes`);
        const data = yield response.json();
        yield put(fetchEyesSuccess(data));
    } catch (err) {
        yield put(fetchEyesFailure(err.message));
    }
}

export function* fetchEyesStart() {
    yield takeLatest(eyesActionTypes.FETCH_EYES_START, fetchEyesAsync);
}

export function* eyesSagas() {
    yield all([
        call(fetchEyesStart)
    ]);
}
