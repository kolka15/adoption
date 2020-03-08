import childrenActionTypes from './children.types';

export const fetchChildrenStart = (query) => ({
    type: childrenActionTypes.FETCH_CHILDREN_START,
    payload: query
});

export const fetchChildrenSuccess = (childrenData) => ({
    type: childrenActionTypes.FETCH_CHILDREN_SUCCESS,
    payload: childrenData
});

export const fetchChildrenFailure = (err) => ({
    type: childrenActionTypes.FETCH_CHILDREN_FAILURE,
    payload: err
});

export const setChildrenQuery = (query) => ({
    type: childrenActionTypes.SET_CHILDREN_QUERY,
    payload: query
});
