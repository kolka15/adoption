import eyesActionTypes from './eyes.types';

const initialState = {
    eyesOptions: null,
    isFetching: false,
    errorMessage: ''
};

const eyesReducer = (state = initialState, action) => {
    switch (action.type) {
    case eyesActionTypes.FETCH_EYES_START:
        return { ...state, isFetching: true };
    case eyesActionTypes.FETCH_EYES_SUCCESS:
        return { ...state, eyesOptions: action.payload, isFetching: false, errorMessage: '' };
    case eyesActionTypes.FETCH_EYES_FAILURE:
        return { ...state, errorMessage: action.payload, isFetching: false };
    default:
        return state;
    }
};

export default eyesReducer;
