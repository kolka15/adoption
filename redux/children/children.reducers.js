import childrenActionTypes from './children.types';

const initialState = {
    childrenData: null,
    isFetching: false,
    errorMessage: '',
    query: ''
};

const childrenReducer = (state = initialState, action) => {
    switch (action.type) {
    case childrenActionTypes.FETCH_CHILDREN_START:
        return { ...state, isFetching: true };
    case childrenActionTypes.FETCH_CHILDREN_SUCCESS:
        return { ...state, childrenData: action.payload, isFetching: false, errorMessage: '' };
    case childrenActionTypes.FETCH_CHILDREN_FAILURE:
        return { ...state, errorMessage: action.payload, isFetching: false, childrenData: null };
    case childrenActionTypes.SET_CHILDREN_QUERY:
        return { ...state, query: action.payload };
    default:
        return state;
    }
};

export default childrenReducer;
