import childActionTypes from './child.types';

export const fetchChildStart = (query) => ({
    type: childActionTypes.FETCH_CHILD_START,
    payload: query
});

export const fetchChildSuccess = (childData) => ({
    type: childActionTypes.FETCH_CHILD_SUCCESS,
    payload: childData
});

export const fetchChildFailure = (err) => ({
    type: childActionTypes.FETCH_CHILD_FAILURE,
    payload: err
});
