import faqActionTypes from './faq.types';

export const fetchFAQStart = () => ({
    type: faqActionTypes.FETCH_FAQ_START
});

export const fetchFAQSuccess = (faqList) => ({
    type: faqActionTypes.FETCH_FAQ_SUCCESS,
    payload: faqList
});

export const fetchFAQFailure = (err) => ({
    type: faqActionTypes.FETCH_FAQ_FAILURE,
    payload: err
});


