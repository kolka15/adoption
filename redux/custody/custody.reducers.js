import custodyActionTypes from './custody.types';

const initialState = {
    custodyOptions: null,
    isFetching: false,
    errorMessage: ''
};

const custodyReducer = (state = initialState, action) => {
    switch (action.type) {
    case custodyActionTypes.FETCH_CUSTODY_START:
        return { ...state, isFetching: true };
    case custodyActionTypes.FETCH_CUSTODY_SUCCESS:
        return { ...state, custodyOptions: action.payload, isFetching: false, errorMessage: '' };
    case custodyActionTypes.FETCH_CUSTODY_FAILURE:
        return { ...state, errorMessage: action.payload, isFetching: false };
    default:
        return state;
    }
};

export default custodyReducer;
