import appointmentsTypes from './appointments.types';

export const createAppointmentStart = (data) => ({
    type: appointmentsTypes.CREATE_APPOINTMENT_START,
    payload: data
});
export const createAppointmentSuccess = (data) => ({
    type: appointmentsTypes.CREATE_APPOINTMENT_SUCCESS,
    payload: data
});
export const createAppointmentFailure = (err) => ({
    type: appointmentsTypes.CREATE_APPOINTMENT_FAILURE,
    payload: err
});


export const deleteAppointmentStart = (data) => ({
    type: appointmentsTypes.DELETE_APPOINTMENT_START,
    payload: data
});
export const deleteAppointmentSuccess = () => ({
    type: appointmentsTypes.DELETE_APPOINTMENT_SUCCESS,
});
export const deleteAppointmentFailure = (err) => ({
    type: appointmentsTypes.DELETE_APPOINTMENT_FAILURE,
    payload: err
});


export const editAppointmentStart = (data) => ({
    type: appointmentsTypes.EDIT_APPOINTMENT_START,
    payload: data
});
export const editAppointmentSuccess = () => ({
    type: appointmentsTypes.EDIT_APPOINTMENT_SUCCESS,
});
export const editAppointmentFailure = (err) => ({
    type: appointmentsTypes.EDIT_APPOINTMENT_FAILURE,
    payload: err
});


export const fetchAppointmentsDatesStart = (data) => ({
    type: appointmentsTypes.FETCH_APPOINTMENTS_DATES_START,
    payload: data
});
export const fetchAppointmentsDatesSuccess = (data) => ({
    type: appointmentsTypes.FETCH_APPOINTMENTS_DATES_SUCCESS,
    payload: data
});
export const fetchAppointmentsDatesFailure = (err) => ({
    type: appointmentsTypes.FETCH_APPOINTMENTS_DATES_FAILURE,
    payload: err
});


export const fetchAppointmentsStart = (data) => ({
    type: appointmentsTypes.FETCH_APPOINTMENTS_START,
    payload: data
});
export const fetchAppointmentsSuccess = (data) => ({
    type: appointmentsTypes.FETCH_APPOINTMENTS_SUCCESS,
    payload: data
});
export const fetchAppointmentsFailure = (err) => ({
    type: appointmentsTypes.FETCH_APPOINTMENTS_FAILURE,
    payload: err
});


export const chooseAppointment = (id) => ({
    type: appointmentsTypes.CHOOSE_APPOINTMENT,
    payload: id
});

export const clearChosenAppointment = () => ({
    type: appointmentsTypes.CLEAR_CHOSEN_APPOINTMENT,
});


export const fetchSpecialistsStart = () => ({
    type: appointmentsTypes.FETCH_SPECIALISTS_START,
});
export const fetchSpecialistsSuccess = (specialists) => ({
    type: appointmentsTypes.FETCH_SPECIALISTS_SUCCESS,
    payload: specialists
});
export const fetchSpecialistsFailure = (err) => ({
    type: appointmentsTypes.FETCH_SPECIALISTS_FAILURE,
    payload: err
});


export const fetchRoomsStart = () => ({
    type: appointmentsTypes.FETCH_ROOMS_START,
});
export const fetchRoomsSuccess = (rooms) => ({
    type: appointmentsTypes.FETCH_ROOMS_SUCCESS,
    payload: rooms
});
export const fetchRoomsFailure = (err) => ({
    type: appointmentsTypes.FETCH_ROOMS_FAILURE,
    payload: err
});


