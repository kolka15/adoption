import hairActionTypes from './hair.types';

export const fetchHairStart = () => ({
    type: hairActionTypes.FETCH_HAIR_START
});

export const fetchHairSuccess = (hairOptions) => ({
    type: hairActionTypes.FETCH_HAIR_SUCCESS,
    payload: hairOptions
});

export const fetchHairFailure = (err) => ({
    type: hairActionTypes.FETCH_HAIR_FAILURE,
    payload: err
});
