import ru from 'date-fns/locale/ru';
import format from 'date-fns/format';
import addMonths from 'date-fns/addMonths';

export const formatTimeForApi = date =>
    format(new Date(date), 'H:mm', {locale: ru});


export const formatDateForApi = date =>
    format(new Date(date), 'yyyy-MM-dd', {locale: ru});

export const formatDateToDisplay = date =>
    format(new Date(date), 'dd / M /yyyy', {locale: ru});

export const formatDateToDisplayDots = date =>
    format(new Date(date), 'dd.MM.yyyy', {locale: ru});

export const formatBirthdayDate = date =>
    format(new Date(`${date}-01`), 'LLLL yyyy', {locale: ru});



export const formatDateNews = date =>
    format(new Date(date), 'dd MMMM yyyy', {locale: ru});

export const formatDateAppointment = date =>
    format(date, 'yyyy-MM-dd', {locale: ru});

export const formatDateAppointmentModal = date =>
    format(new Date(date), 'd MMMM yyyy', {locale: ru});

export const datesRange = {
    dateFrom: formatDateForApi(new Date()),
    dateTo: formatDateForApi(addMonths(new Date(), 2)),
};