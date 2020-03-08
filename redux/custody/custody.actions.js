import custodyActionTypes from './custody.types';

export const fetchCustodyStart = () => ({
    type: custodyActionTypes.FETCH_CUSTODY_START
});

export const fetchCustodySuccess = (custodyOptions) => ({
    type: custodyActionTypes.FETCH_CUSTODY_SUCCESS,
    payload: custodyOptions
});

export const fetchCustodyFailure = (err) => ({
    type: custodyActionTypes.FETCH_CUSTODY_FAILURE,
    payload: err
});
