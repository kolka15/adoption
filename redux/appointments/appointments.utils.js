import format from 'date-fns/format';
import ru from 'date-fns/locale/ru';


export const formatSpecialistsSelectOptions = (options) => (
    options && options.reduce((result, option) => {
        if (option.active) {
            result.push({
                value: option.id,
                label: option.fio,
            });
        }
        return result;
    }, [])
);

export const formatRoomsSelectOptions = (options) => (
    options && options.map(option => ({value: option.id, label: option.room_number}))
);

export const formatAppointmentsSelectOptions = (options) => (
    options && options.map(option => {
        return {
            appointmentSelect: {...option},
            value: option.id,
            label: `${format(new Date(option.date), 'dd.M.yyyy', {locale: ru})} ${option.start_time} ${option.room.room_number}`
        };
    }
    )
);

export const filterAppointmentsList = (appointments, id) => {
    return appointments && appointments.filter(appointment => appointment.id === id);
};

export const convertDatesForDatepickerHighlight = (dates) => dates.map(date => new Date(date));