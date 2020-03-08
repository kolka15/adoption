import appointmentsTypes from './appointments.types';

const initialState = {
    specialists: [],
    rooms: [],
    appointments: [],
    isFetching: false,
    appointmentSelected: null,
    appointmentsDatesRange: null,
    appointmentsAllDates: [],
};

const appointmentsReducer = (state = initialState, action) => {
    switch (action.type) {

    case appointmentsTypes.CREATE_APPOINTMENT_START:
        return {...state, isFetching: true};
    case appointmentsTypes.CREATE_APPOINTMENT_SUCCESS:
        return {...state};
    case appointmentsTypes.CREATE_APPOINTMENT_FAILURE:
        return {...state, errorMessage: action.payload, isFetching: false};

    case appointmentsTypes.DELETE_APPOINTMENT_START:
        return {...state, isFetching: true};
    case appointmentsTypes.DELETE_APPOINTMENT_SUCCESS:
        return {...state};
    case appointmentsTypes.DELETE_APPOINTMENT_FAILURE:
        return {...state, errorMessage: action.payload, isFetching: false};

    case appointmentsTypes.EDIT_APPOINTMENT_START:
        return {...state, isFetching: true};
    case appointmentsTypes.EDIT_APPOINTMENT_SUCCESS:
        return {...state};
    case appointmentsTypes.EDIT_APPOINTMENT_FAILURE:
        return {...state, errorMessage: action.payload, isFetching: false};

    case appointmentsTypes.FETCH_APPOINTMENTS_START:
        return {...state, appointmentsDatesRange: action.payload.datesRange, isFetching: true};
    case appointmentsTypes.FETCH_APPOINTMENTS_SUCCESS:
        return {...state, appointments: action.payload, isFetching: false};
    case appointmentsTypes.FETCH_APPOINTMENTS_FAILURE:
        return {...state, errorMessage: action.payload, isFetching: false};

    case appointmentsTypes.FETCH_APPOINTMENTS_DATES_START:
        return {...state, isFetching: true};
    case appointmentsTypes.FETCH_APPOINTMENTS_DATES_SUCCESS:
        return {...state, appointmentsAllDates: action.payload, isFetching: false};
    case appointmentsTypes.FETCH_APPOINTMENTS_DATES_FAILURE:
        return {...state, errorMessage: action.payload, isFetching: false};

    case appointmentsTypes.CHOOSE_APPOINTMENT:
        return {...state, appointmentSelected: action.payload};

    case appointmentsTypes.CLEAR_CHOSEN_APPOINTMENT:
        return {...state, appointmentSelected: null};

    case appointmentsTypes.FETCH_SPECIALISTS_START:
        return {...state, isFetching: true};
    case appointmentsTypes.FETCH_SPECIALISTS_SUCCESS:
        return {...state, specialists: action.payload, isFetching: false};
    case appointmentsTypes.FETCH_SPECIALISTS_FAILURE:
        return {...state, errorMessage: action.payload, isFetching: false};

    case appointmentsTypes.FETCH_ROOMS_START:
        return {...state, isFetching: true};
    case appointmentsTypes.FETCH_ROOMS_SUCCESS:
        return {...state, rooms: action.payload, isFetching: false};
    case appointmentsTypes.FETCH_ROOMS_FAILURE:
        return {...state, errorMessage: action.payload, isFetching: false};


    default:
        return state;
    }
};

export default appointmentsReducer;
