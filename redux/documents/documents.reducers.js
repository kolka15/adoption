import documentsActionTypes from './documents.types';

const initialState = {
    internationalLaws: null,
    isFetchingIntLaws: false,
    errorIntLaws: null
};

const documentsReducer = (state = initialState, action) => {
    switch (action.type) {
    case documentsActionTypes.FETCH_INTERNATIONAL_LAWS_START:
        return { ...state, isFetchingIntLaws: true };
    case documentsActionTypes.FETCH_INTERNATIONAL_LAWS_SUCCESS:
        return { ...state, internationalLaws: action.payload, isFetchingIntLaws: false, errorIntLaws: '' };
    case documentsActionTypes.FETCH_INTERNATIONAL_LAWS_FAILURE:
        return { ...state, errorIntLaws: action.payload, isFetchingIntLaws: false };
    default:
        return state;
    }
};

export default documentsReducer;
