import totalActionTypes from './total.types';

const initialState = {
    total: '',
    isFetching: false,
    errorMessage: ''
};

const totalReducer = (state = initialState, action) => {
    switch (action.type) {
    case totalActionTypes.FETCH_TOTAL_START:
        return { ...state, isFetching: true };
    case totalActionTypes.FETCH_TOTAL_SUCCESS:
        return { ...state, total: action.payload, isFetching: false, errorMessage: '' };
    case totalActionTypes.FETCH_TOTAL_FAILURE:
        return { ...state, errorMessage: action.payload, isFetching: false };
    default:
        return state;
    }
};

export default totalReducer;
