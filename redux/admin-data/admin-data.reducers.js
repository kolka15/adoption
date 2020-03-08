import adminDataTypes from './admin-data.types';

const initialState = {
    filesList: null,
    lastUpload: null,
    isFetching: false,
    error: null
};

const adminDataReducer = (state = initialState, action) => {
    switch (action.type) {

    case adminDataTypes.FETCH_FILES_LIST_START:
        return { ...state, isFetching: true };
    case adminDataTypes.FETCH_FILES_LIST_SUCCESS:
        return { ...state, filesList: action.payload, isFetching: false, };
    case adminDataTypes.FETCH_FILES_LIST_FAILURE:
        return { ...state, error: action.payload, isFetching: false };

    case adminDataTypes.FETCH_LAST_UPLOAD_START:
        return { ...state, isFetching: true };
    case adminDataTypes.FETCH_LAST_UPLOAD_SUCCESS:
        return { ...state, lastUpload: action.payload, isFetching: false, };
    case adminDataTypes.FETCH_LAST_UPLOAD_FAILURE:
        return { ...state, error: action.payload, isFetching: false };

    case adminDataTypes.EDIT_LAST_UPLOAD_START:
        return { ...state, isFetching: true };
    case adminDataTypes.EDIT_LAST_UPLOAD_SUCCESS:
        return { ...state, isFetching: false, };
    case adminDataTypes.EDIT_LAST_UPLOAD_FAILURE:
        return { ...state, error: action.payload, isFetching: false };

    default:
        return state;
    }
};

export default adminDataReducer;
