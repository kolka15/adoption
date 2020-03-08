import hairActionTypes from './hair.types';

const initialState = {
    hairOptions: null,
    isFetching: false,
    errorMessage: ''
};

const hairReducer = (state = initialState, action) => {
    switch (action.type) {
    case hairActionTypes.FETCH_HAIR_START:
        return { ...state, isFetching: true };
    case hairActionTypes.FETCH_HAIR_SUCCESS:
        return { ...state, hairOptions: action.payload, isFetching: false, errorMessage: '' };
    case hairActionTypes.FETCH_HAIR_FAILURE:
        return { ...state, errorMessage: action.payload, isFetching: false };
    default:
        return state;
    }
};

export default hairReducer;
