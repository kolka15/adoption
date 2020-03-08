import regionsActionTypes from './regions.types';

export const fetchRegionsStart = () => ({
    type: regionsActionTypes.FETCH_REGIONS_START
});

export const fetchRegionsSuccess = (regionOptions) => ({
    type: regionsActionTypes.FETCH_REGIONS_SUCCESS,
    payload: regionOptions
});

export const fetchRegionsFailure = (err) => ({
    type: regionsActionTypes.FETCH_REGIONS_FAILURE,
    payload: err
});

export const setRegion = (region) => ({
    type: regionsActionTypes.SET_REGION,
    payload: region
});
