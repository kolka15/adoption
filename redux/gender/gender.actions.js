import genderActionTypes from './gender.types';

export const fetchGenderStart = () => ({
    type: genderActionTypes.FETCH_GENDER_START
});

export const fetchGenderSuccess = (genderOptions) => ({
    type: genderActionTypes.FETCH_GENDER_SUCCESS,
    payload: genderOptions
});

export const fetchGenderFailure = (err) => ({
    type: genderActionTypes.FETCH_GENDER_FAILURE,
    payload: err
});
