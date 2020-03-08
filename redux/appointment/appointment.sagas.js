import { takeLatest, call, put, all } from 'redux-saga/effects';
import fetch from 'isomorphic-unfetch';
import appointmentActionTypes from './appointment.types';
import { fetchDatesFailure, fetchDatesSuccess, fetchTimeFailure, fetchTimeSuccess, fetchNextDatesFailure, fetchNextDatesSuccess } from './appointment.actions';
import server from '../../utils/config';

function* fetchDatesAsync() {
    try {
        const response = yield fetch(`${server}/api/appointments_dates`);
        const data = yield response.json();
        yield put(fetchDatesSuccess(data));
    } catch (err) {
        yield put(fetchDatesFailure(err.message));
    }
}

export function* fetchDatesStart() {
    yield takeLatest(appointmentActionTypes.FETCH_DATES_START, fetchDatesAsync);
}

function* fetchTimeAsync({payload}) {
    try {
        const response = yield fetch(`${server}/api/appointments_free_dy_day/${payload}`);
        const data = yield response.json();
        yield put(fetchTimeSuccess(data));
    } catch (err) {
        yield put(fetchTimeFailure(err.message));
    }
}

export function* fetchTimeStart() {
    yield takeLatest(appointmentActionTypes.FETCH_TIME_START, fetchTimeAsync);
}

function* fetchNextDatesAsync() {
    try {
        const response = yield fetch(`${server}/api/appointments_next_date`);
        const data = yield response.json();
        yield put(fetchNextDatesSuccess(data));
    } catch (err) {
        yield put(fetchNextDatesFailure(err.message));
    }
}

export function* fetchNextDatesStart() {
    yield takeLatest(appointmentActionTypes.FETCH_NEXT_DATES_START, fetchNextDatesAsync);
}

export function* appointmentSagas() {
    yield all([
        call(fetchDatesStart),
        call(fetchTimeStart),
        call(fetchNextDatesStart)
    ]);
}
