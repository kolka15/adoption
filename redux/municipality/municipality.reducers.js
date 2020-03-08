import municipalityActionTypes from './municipality.types';

const initialState = {
    municipalities: null,
    isFetching: false,
    errorMessage: '',
    municipalityOptions: null,
    isFetchingOptions: false,
    errorOptions: null
};

const municipalityReducer = (state = initialState, action) => {
    switch (action.type) {
    case municipalityActionTypes.FETCH_MUNICIPALITIES_START:
        return { ...state, isFetching: true };
    case municipalityActionTypes.FETCH_MUNICIPALITIES_SUCCESS:
        return { ...state, municipalities: action.payload, isFetching: false, errorMessage: '' };
    case municipalityActionTypes.FETCH_MUNICIPALITIES_FAILURE:
        return { ...state, errorMessage: action.payload, isFetching: false };
    case municipalityActionTypes.FETCH_MUNICIPALITY_OPTIONS_START:
        return { ...state, isFetchingOptions: true };
    case municipalityActionTypes.FETCH_MUNICIPALITY_OPTIONS_SUCCESS:
        return { ...state, municipalityOptions: action.payload, isFetchingOptions: false, errorOptions: '' };
    case municipalityActionTypes.FETCH_MUNICIPALITY_OPTIONS_FAILURE:
        return { ...state, errorOptions: action.payload, isFetchingOptions: false };
    default:
        return state;
    }
};

export default municipalityReducer;
