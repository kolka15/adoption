import {createSelector} from 'reselect';
import appointment from '../../pages/appointment';

const selectAppointment = (state) => state.appointment;

export const selectDates = createSelector(
    [selectAppointment],
    (appointment) => appointment.dates ? appointment.dates.map(date => new Date(date)) : null
);

export const selectTime = createSelector(
    [selectAppointment],
    (appointment) => appointment.time ? appointment.time.sort((a,b) => parseInt(a.start_time, 10) - parseInt(b.start_time, 10)).map(el => el.start_time) : null
);

export const selectTimeArr = createSelector(
    [selectAppointment],
    (appointment) => appointment.time ? appointment.time.sort((a,b) => parseInt(a.start_time, 10) - parseInt(b.start_time, 10)) : null
);
