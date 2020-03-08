import appointmentActionTypes from './appointment.types';

const initialState = {
    dates: null,
    isFetchingDates: false,
    errorDates: null,
    time: null,
    isFetchingTime: false,
    errorTime: null,
    nextDates: null,
    isFetchingNextDates: false,
    errorNextDates: null
};

const appointmentReducer = (state = initialState, action) => {
    switch (action.type) {
    case appointmentActionTypes.FETCH_DATES_START:
        return { ...state, isFetchingDates: true };
    case appointmentActionTypes.FETCH_DATES_SUCCESS:
        return { ...state, dates: action.payload, isFetchingDates: false, errorDates: '' };
    case appointmentActionTypes.FETCH_DATES_FAILURE:
        return { ...state, errorDates: action.payload, isFetchingDates: false };
    case appointmentActionTypes.FETCH_TIME_START:
        return { ...state, isFetchingTime: true };
    case appointmentActionTypes.FETCH_TIME_SUCCESS:
        return { ...state, time: action.payload, isFetchingTime: false, errorTime: '' };
    case appointmentActionTypes.FETCH_TIME_FAILURE:
        return { ...state, errorTime: action.payload, isFetchingTime: false };
    case appointmentActionTypes.FETCH_NEXT_DATES_START:
        return { ...state, isFetchingNextDates: true };
    case appointmentActionTypes.FETCH_NEXT_DATES_SUCCESS:
        return { ...state, nextDates: action.payload, isFetchingNextDates: false, errorNextDates: '' };
    case appointmentActionTypes.FETCH_NEXT_DATES_FAILURE:
        return { ...state, errorNextDates: action.payload, isFetchingNextDates: false };
    default:
        return state;
    }
};

export default appointmentReducer;
