import childActionTypes from './child.types';

const initialState = {
    childData: null,
    isFetching: false,
    errorMessage: '',
};

const childReducer = (state = initialState, action) => {
    switch (action.type) {
    case childActionTypes.FETCH_CHILD_START:
        return { ...state, isFetching: true };
    case childActionTypes.FETCH_CHILD_SUCCESS:
        return { ...state, childData: action.payload, isFetching: false, errorMessage: '' };
    case childActionTypes.FETCH_CHILD_FAILURE:
        return { ...state, errorMessage: action.payload, isFetching: false, childData: null };
    default:
        return state;
    }
};

export default childReducer;
