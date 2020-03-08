import {takeLatest, call, put, all} from 'redux-saga/effects';
import fetch from 'isomorphic-unfetch';
import appointmentsTypes from './appointments.types';
import {
    fetchAppointmentsDatesSuccess,
    fetchAppointmentsDatesFailure,
    createAppointmentSuccess,
    createAppointmentFailure,
    deleteAppointmentSuccess,
    deleteAppointmentFailure,
    fetchAppointmentsSuccess,
    fetchAppointmentsFailure,
    fetchSpecialistsSuccess,
    fetchSpecialistsFailure,
    editAppointmentSuccess,
    editAppointmentFailure,
    clearChosenAppointment,
    fetchRoomsSuccess,
    fetchRoomsFailure,
} from './appointments.actions';
import server from '../../utils/config';
// import Router from 'next/router';

function* createAppointmentAsync({payload}) {
    const {tempData, token, appointmentDatesRange} = payload;

    try {
        const response = yield fetch(`${server}/api/private/appointments`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(tempData)
        });

        const data = yield response.json();

        yield put(createAppointmentSuccess(data));

        yield fetchAppointmentsAsync({payload:{token, datesRange:appointmentDatesRange}});
        yield fetchAppointmentsDatesAsync({payload:token});


    } catch (err) {
        yield put(createAppointmentFailure(err.message));
    }
}
export function* createAppointmentStart() {
    yield takeLatest(appointmentsTypes.CREATE_APPOINTMENT_START, createAppointmentAsync);
}


function* deleteAppointmentAsync({payload}) {

    const {appointmentSelectedId, token, appointmentDatesRange} = payload;

    try {
        const response = yield fetch(`${server}/api/private/appointments/${appointmentSelectedId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = yield response.json();

        yield put(deleteAppointmentSuccess(data));

        yield fetchAppointmentsAsync({payload:{token, datesRange:appointmentDatesRange}});
        yield fetchAppointmentsDatesAsync({payload:token});

    } catch (err) {
        yield put(deleteAppointmentFailure(err.message));
    }
}
export function* deleteAppointmentStart() {
    yield takeLatest(appointmentsTypes.DELETE_APPOINTMENT_START, deleteAppointmentAsync);
}


function* editAppointmentAsync({payload}) {

    const {appointmentSelectedId, token, appointmentDatesRange, data} = payload;

    try {
        const response = yield fetch(`${server}/api/private/appointments/${appointmentSelectedId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data)
        });

        const answer = yield response.json();

        yield put(editAppointmentSuccess(answer));

        yield fetchAppointmentsAsync({payload:{token, datesRange:appointmentDatesRange}});
        yield fetchAppointmentsDatesAsync({payload:token});

    } catch (err) {
        yield put(editAppointmentFailure(err.message));
    }
}
export function* editAppointmentStart() {
    yield takeLatest(appointmentsTypes.EDIT_APPOINTMENT_START, editAppointmentAsync);
}


function* fetchAppointmentsAsync({payload}) {

    const {datesRange, token} = payload;

    const esc = encodeURIComponent;
    const query = Object.keys(datesRange)
        .map(key => esc(key) + '=' + esc(datesRange[key]))
        .join('&');

    try {

        const response = yield fetch(`${server}/api/private/appointments?${query}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        const data = yield response.json();

        yield put(clearChosenAppointment());

        yield put(fetchAppointmentsSuccess(data));

    } catch (err) {
        yield put(fetchAppointmentsFailure(err.message));
    }
}
export function* fetchAppointmentsStart() {
    yield takeLatest(appointmentsTypes.FETCH_APPOINTMENTS_START, fetchAppointmentsAsync);
}


function* fetchAppointmentsDatesAsync({payload}) {

    try {

        const response = yield fetch(`${server}/api/private/appointments/dates`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${payload}`,
            },
        });
        const data = yield response.json();

        yield put(fetchAppointmentsDatesSuccess(data));

    } catch (err) {
        yield put(fetchAppointmentsDatesFailure(err.message));
    }
}
export function* fetchAppointmentsDatesStart() {
    yield takeLatest(appointmentsTypes.FETCH_APPOINTMENTS_DATES_START, fetchAppointmentsDatesAsync);
}


function* fetchSpecialistsAsync() {
    try {
        const response = yield fetch(`${server}/api/specialists`, {
            method: 'GET',
        });

        const data = yield response.json();

        yield put(fetchSpecialistsSuccess(data));
    } catch (err) {
        yield put(fetchSpecialistsFailure(err.message));
    }
}
export function* fetchSpecialistsStart() {
    yield takeLatest(appointmentsTypes.FETCH_SPECIALISTS_START, fetchSpecialistsAsync);
}


function* fetchRoomsAsync() {
    try {
        const response = yield fetch(`${server}/api/rooms`, {
            method: 'GET',
        });

        const data = yield response.json();

        yield put(fetchRoomsSuccess(data));
    } catch (err) {
        yield put(fetchRoomsFailure(err.message));
    }
}
export function* fetchRoomsStart() {
    yield takeLatest(appointmentsTypes.FETCH_ROOMS_START, fetchRoomsAsync);
}


export function* appointmentsSagas() {
    yield all([
        call(fetchAppointmentsDatesStart),
        call(deleteAppointmentStart),
        call(createAppointmentStart),
        call(fetchAppointmentsStart),
        call(fetchSpecialistsStart),
        call(editAppointmentStart),
        call(fetchRoomsStart),
    ]);
}
