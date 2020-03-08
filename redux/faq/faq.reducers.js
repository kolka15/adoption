import faqActionTypes from './faq.types';

const initialState = {
    faqList: null,
    isFetching: false,
    error: ''
};

const faqReducer = (state = initialState, action) => {
    switch (action.type) {
    case faqActionTypes.FETCH_FAQ_START:
        return { ...state, isFetching: true };
    case faqActionTypes.FETCH_FAQ_SUCCESS:
        return { ...state, faqList: action.payload, isFetching: false, error: '' };
    case faqActionTypes.FETCH_FAQ_FAILURE:
        return { ...state, error: action.payload, isFetching: false };
    default:
        return state;
    }
};

export default faqReducer;
