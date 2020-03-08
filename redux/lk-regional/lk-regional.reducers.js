import lkRegionalActionTypes from './lk-regional.types';

const initialState = {
    editForm: false,
    isFetching: false,
    municipalities: [],
    selectedMunicipality: null,
    municipalData: [],
    errorMessage: null,
};

const lkRegionReducer = (state = initialState, action) => {
    switch (action.type) {
    case lkRegionalActionTypes.EDIT_FORM:
        return {...state, editForm: action.payload};

    case lkRegionalActionTypes.FETCH_MUNICIPAL_DISTRICTS_START:
        return {...state, isFetching: true};
    case lkRegionalActionTypes.FETCH_MUNICIPAL_DISTRICTS_SUCCESS:
        return {
            ...state,
            municipalities: action.payload,
            municipalData: action.payload,
            isFetching: false
        };
    case lkRegionalActionTypes.FETCH_MUNICIPAL_DISTRICTS_FAILURE:
        return {...state, errorMessage: action.payload, isFetching: false, municipalityCreated: false};


    case lkRegionalActionTypes.CREATE_MUNICIPALITY_START:
        return {...state, isFetching: true};
    case lkRegionalActionTypes.CREATE_MUNICIPALITY_SUCCESS: {
        const data = action.payload;
        return {...state, selectedMunicipality: {label: data.address, value: data.id}, isFetching: false};
    }
    case lkRegionalActionTypes.CREATE_MUNICIPALITY_FAILURE:
        return {...state, errorMessage: action.payload, isFetching: false};


    case lkRegionalActionTypes.DELETE_MUNICIPALITY_START:
        return {...state, isFetching: true};
    case lkRegionalActionTypes.DELETE_MUNICIPALITY_SUCCESS:
        return {...state, municipalities: action.payload, isFetching: false};
    case lkRegionalActionTypes.DELETE_MUNICIPALITY_FAILURE:
        return {...state, errorMessage: action.payload, isFetching: false};


    case lkRegionalActionTypes.MUNICIPALITY_SELECT_CONFIRM:
        return {...state, selectedMunicipality: action.payload, isFetching: false};

    case lkRegionalActionTypes.EDIT_MUNICIPALITY_DATA_START: {
        const payload = action.payload;
        const newMunicipalData = state.municipalData;
        const index = newMunicipalData.findIndex(municipality => municipality.id === payload.regionalFormDataState.id);
        newMunicipalData[index] = payload.regionalFormDataState;
        return {
            ...state,
            municipalData: newMunicipalData,
            selectedMunicipality: {...state.selectedMunicipality, label: newMunicipalData[index].address},
            isFetching: true
        };
    }
    case lkRegionalActionTypes.EDIT_MUNICIPALITY_DATA_SUCCESS:
        return {...state, isFetching: false};
    case lkRegionalActionTypes.EDIT_MUNICIPALITY_DATA_FAILURE:
        return {...state, errorMessage: action.payload, isFetching: false};

    case lkRegionalActionTypes.DISPATCH_TOKEN:
        return {...state, token: action.payload};

    default:
        return state;
    }
};

export default lkRegionReducer;
