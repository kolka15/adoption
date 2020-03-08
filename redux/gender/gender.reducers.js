import genderActionTypes from './gender.types';

const initialState = {
    genderOptions: null,
    isFetching: false,
    errorMessage: ''
};

const genderReducer = (state = initialState, action) => {
    switch (action.type) {
    case genderActionTypes.FETCH_GENDER_START:
        return { ...state, isFetching: true };
    case genderActionTypes.FETCH_GENDER_SUCCESS:
        return { ...state, genderOptions: action.payload, isFetching: false, errorMessage: '' };
    case genderActionTypes.FETCH_GENDER_FAILURE:
        return { ...state, errorMessage: action.payload, isFetching: false };
    default:
        return state;
    }
};

export default genderReducer;
