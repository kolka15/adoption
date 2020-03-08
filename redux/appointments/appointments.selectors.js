import {createSelector} from 'reselect';
import {
    formatSpecialistsSelectOptions,
    formatRoomsSelectOptions,
    formatAppointmentsSelectOptions,
    filterAppointmentsList,
    convertDatesForDatepickerHighlight
} from './appointments.utils';

const selectAppointment = (state) => state.appointments;

export const selectSpecialists = createSelector(
    [selectAppointment],
    (appointment) => appointment.specialists.length ? formatSpecialistsSelectOptions(appointment.specialists) : null
);

export const selectRooms = createSelector(
    [selectAppointment],
    (appointment) => appointment.rooms.length ? formatRoomsSelectOptions(appointment.rooms) : null
);

export const selectAppointments = createSelector(
    [selectAppointment],
    (appointment) => appointment.appointments
);

export const selectAppointmentsIsFetching = createSelector(
    [selectAppointment],
    (appointment) => appointment.isFetching
);

export const selectAppointmentsForSelect = createSelector(
    [selectAppointment],
    (appointment) => appointment.appointments ? formatAppointmentsSelectOptions(appointment.appointments) : null
);

export const selectAppointmentChosen = createSelector(
    [selectAppointment],
    (appointment) => appointment.appointmentSelected ? filterAppointmentsList(appointment.appointments, appointment.appointmentSelected) : []
);

export const selectAppointmentSelectedId = createSelector(
    [selectAppointment],
    (appointment) => appointment.appointmentSelected
);

export const selectAppointmentDatesRange = createSelector(
    [selectAppointment],
    (appointment) => appointment.appointmentsDatesRange
);

export const selectAppointmentAllDates = createSelector(
    [selectAppointment],
    (appointment) => appointment.appointmentsAllDates ? convertDatesForDatepickerHighlight(appointment.appointmentsAllDates) : []
);


