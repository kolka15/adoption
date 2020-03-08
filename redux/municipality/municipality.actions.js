import municipalityActionTypes from './municipality.types';

export const fetchMunicipalitiesStart = (regionId) => ({
    type: municipalityActionTypes.FETCH_MUNICIPALITIES_START,
    payload: regionId
});

export const fetchMunicipalitiesSuccess = (municipalities) => ({
    type: municipalityActionTypes.FETCH_MUNICIPALITIES_SUCCESS,
    payload: municipalities
});

export const fetchMunicipalitiesFailure = (err) => ({
    type: municipalityActionTypes.FETCH_MUNICIPALITIES_FAILURE,
    payload: err
});

export const fetchMunicipalityOptionsStart = (regionId) => ({
    type: municipalityActionTypes.FETCH_MUNICIPALITY_OPTIONS_START,
    payload: regionId
});

export const fetchMunicipalityOptionsSuccess = (municipalityOptions) => ({
    type: municipalityActionTypes.FETCH_MUNICIPALITY_OPTIONS_SUCCESS,
    payload: municipalityOptions
});

export const fetchMunicipalityOptionsFailure = (err) => ({
    type: municipalityActionTypes.FETCH_MUNICIPALITY_OPTIONS_FAILURE,
    payload: err
});
