import appointmentActionTypes from './appointment.types';

export const fetchDatesStart = () => ({
    type: appointmentActionTypes.FETCH_DATES_START,
});

export const fetchDatesSuccess = (dates) => ({
    type: appointmentActionTypes.FETCH_DATES_SUCCESS,
    payload: dates
});

export const fetchDatesFailure = (err) => ({
    type: appointmentActionTypes.FETCH_DATES_FAILURE,
    payload: err
});

export const fetchTimeStart = (date) => ({
    type: appointmentActionTypes.FETCH_TIME_START,
    payload: date
});

export const fetchTimeSuccess = (time) => ({
    type: appointmentActionTypes.FETCH_TIME_SUCCESS,
    payload: time
});

export const fetchTimeFailure = (err) => ({
    type: appointmentActionTypes.FETCH_TIME_FAILURE,
    payload: err
});

export const fetchNextDatesStart = () => ({
    type: appointmentActionTypes.FETCH_NEXT_DATES_START,
});

export const fetchNextDatesSuccess = (dates) => ({
    type: appointmentActionTypes.FETCH_NEXT_DATES_SUCCESS,
    payload: dates
});

export const fetchNextDatesFailure = (err) => ({
    type: appointmentActionTypes.FETCH_NEXT_DATES_FAILURE,
    payload: err
});
