import documentsActionTypes from './documents.types';

export const fetchInternationalLawsStart = () => ({
    type: documentsActionTypes.FETCH_INTERNATIONAL_LAWS_START,
});

export const fetchInternationalLawsSuccess = (laws) => ({
    type: documentsActionTypes.FETCH_INTERNATIONAL_LAWS_SUCCESS,
    payload: laws
});

export const fetchInternationalLawsFailure = (err) => ({
    type: documentsActionTypes.FETCH_INTERNATIONAL_LAWS_FAILURE,
    payload: err
});
