import regionsActionTypes from './regions.types';

const initialState = {
    regionOptions: null,
    isFetching: false,
    errorMessage: '',
    region: null
};

const regionsReducer = (state = initialState, action) => {
    switch (action.type) {
    case regionsActionTypes.FETCH_REGIONS_START:
        return { ...state, isFetching: true };
    case regionsActionTypes.FETCH_REGIONS_SUCCESS:
        return { ...state, regionOptions: action.payload, isFetching: false, errorMessage: '' };
    case regionsActionTypes.FETCH_REGIONS_FAILURE:
        return { ...state, errorMessage: action.payload, isFetching: false };
    case regionsActionTypes.SET_REGION:
        return { ...state, region: action.payload };
    default:
        return state;
    }
};

export default regionsReducer;
