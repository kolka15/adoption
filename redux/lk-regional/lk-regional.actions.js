import lkRegionalActionTypes from './lk-regional.types';

export const switchLkRegionEditForm = (toggle) => ({
    type: lkRegionalActionTypes.EDIT_FORM,
    payload: toggle
});


export const fetchMunicipalDistrictStart = (data) => ({
    type: lkRegionalActionTypes.FETCH_MUNICIPAL_DISTRICTS_START,
    payload: data
});
export const fetchMunicipalDistrictSuccess = (data) => ({
    type: lkRegionalActionTypes.FETCH_MUNICIPAL_DISTRICTS_SUCCESS,
    payload: data
});
export const fetchMunicipalDistrictFailure = (err) => ({
    type: lkRegionalActionTypes.FETCH_MUNICIPAL_DISTRICTS_FAILURE,
    payload: err
});


export const createMunicipalityStart = (fields) => ({
    type: lkRegionalActionTypes.CREATE_MUNICIPALITY_START,
    payload: fields
});
export const createMunicipalitySuccess = (data) => ({
    type: lkRegionalActionTypes.CREATE_MUNICIPALITY_SUCCESS,
    payload: data
});
export const createMunicipalityFailure = (err) => ({
    type: lkRegionalActionTypes.CREATE_MUNICIPALITY_FAILURE,
    payload: err
});


export const deleteMunicipalityStart = (id) => ({
    type: lkRegionalActionTypes.DELETE_MUNICIPALITY_START,
    payload: id
});
export const deleteMunicipalitySuccess = (data) => ({
    type: lkRegionalActionTypes.DELETE_MUNICIPALITY_SUCCESS,
    payload: data
});
export const deleteMunicipalityFailure = (err) => ({
    type: lkRegionalActionTypes.DELETE_MUNICIPALITY_FAILURE,
    payload: err
});


export const municipalitySelectConfirm = (municipality) => {
    return {
        type: lkRegionalActionTypes.MUNICIPALITY_SELECT_CONFIRM,
        payload: municipality
    };
};


export const editMunicipalityStart = (data) => {
    return {
        type: lkRegionalActionTypes.EDIT_MUNICIPALITY_DATA_START,
        payload: data
    };
};
export const editMunicipalitySuccess = (data) => ({
    type: lkRegionalActionTypes.EDIT_MUNICIPALITY_DATA_SUCCESS,
    payload: data
});
export const editMunicipalityFailure = (err) => ({
    type: lkRegionalActionTypes.EDIT_MUNICIPALITY_DATA_FAILURE,
    payload: err
});





