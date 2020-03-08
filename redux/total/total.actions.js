import totalActionTypes from './total.types';

export const fetchTotalStart = () => ({
    type: totalActionTypes.FETCH_TOTAL_START
});

export const fetchTotalSuccess = (total) => ({
    type: totalActionTypes.FETCH_TOTAL_SUCCESS,
    payload: total
});

export const fetchTotalFailure = (err) => ({
    type: totalActionTypes.FETCH_TOTAL_FAILURE,
    payload: err
});
