import adminDataTypes from './admin-data.types';

export const fetchFilesListStart = (token) => ({
    type: adminDataTypes.FETCH_FILES_LIST_START,
    payload: token
});
export const fetchFilesListSuccess = (filesList) => ({
    type: adminDataTypes.FETCH_FILES_LIST_SUCCESS,
    payload: filesList
});
export const fetchFilesListFailure = (err) => ({
    type: adminDataTypes.FETCH_FILES_LIST_FAILURE,
    payload: err
});


export const fetchLastUploadStart = (token) => ({
    type: adminDataTypes.FETCH_LAST_UPLOAD_START,
    payload: token
});
export const fetchLastUploadSuccess = (data) => ({
    type: adminDataTypes.FETCH_LAST_UPLOAD_SUCCESS,
    payload: data
});
export const fetchLastUploadFailure = (err) => ({
    type: adminDataTypes.FETCH_LAST_UPLOAD_FAILURE,
    payload: err
});


export const editLastUploadStart = (data, token) => ({
    type: adminDataTypes.EDIT_LAST_UPLOAD_START,
    payload: {data, token}
});
export const editLastUploadSuccess = () => ({
    type: adminDataTypes.EDIT_LAST_UPLOAD_SUCCESS,
});
export const editLastUploadFailure = (err) => ({
    type: adminDataTypes.EDIT_LAST_UPLOAD_FAILURE,
    payload: err
});

