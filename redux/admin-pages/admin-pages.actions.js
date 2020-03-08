import adminPagesTypes from './admin-pages.types';

export const fetchFAQStart = (token) => ({
    type: adminPagesTypes.FETCH_FAQ_START,
    payload: token
});
export const fetchFAQSuccess = (faq) => ({
    type: adminPagesTypes.FETCH_FAQ_SUCCESS,
    payload: faq
});
export const fetchFAQFailure = (err) => ({
    type: adminPagesTypes.FETCH_FAQ_FAILURE,
    payload: err
});


export const addFaqQuestionStart = (token, data) => ({
    type: adminPagesTypes.ADD_FAQ_QUESTION_START,
    payload: {token, data}
});
export const addFaqQuestionSuccess = () => ({
    type: adminPagesTypes.ADD_FAQ_QUESTION_SUCCESS,
});
export const addFaqQuestionFailure = (err) => ({
    type: adminPagesTypes.ADD_FAQ_QUESTION_FAILURE,
    payload: err
});


export const deleteFaqQuestionStart = (token, id) => ({
    type: adminPagesTypes.DELETE_FAQ_QUESTION_START,
    payload: {token, id}
});
export const deleteFaqQuestionSuccess = () => ({
    type: adminPagesTypes.DELETE_FAQ_QUESTION_SUCCESS,
});
export const deleteFaqQuestionFailure = (err) => ({
    type: adminPagesTypes.DELETE_FAQ_QUESTION_FAILURE,
    payload: err
});


export const editFaqQuestionStart = (token, id, data) => ({
    type: adminPagesTypes.EDIT_FAQ_QUESTION_START,
    payload: {token, id, data}
});
export const editFaqQuestionSuccess = () => ({
    type: adminPagesTypes.EDIT_FAQ_QUESTION_SUCCESS,
});
export const editFaqQuestionFailure = (err) => ({
    type: adminPagesTypes.EDIT_FAQ_QUESTION_FAILURE,
    payload: err
});


export const fetchDocumentTypesStart = (token) => ({
    type: adminPagesTypes.FETCH_DOCUMENT_TYPES_START,
    payload: token
});
export const fetchDocumentTypesSuccess = (data) => ({
    type: adminPagesTypes.FETCH_DOCUMENT_TYPES_SUCCESS,
    payload: data
});
export const fetchDocumentTypesFailure = (err) => ({
    type: adminPagesTypes.FETCH_DOCUMENT_TYPES_FAILURE,
    payload: err
});


export const fetchInterLawFilesStart = (token, category) => ({
    type: adminPagesTypes.FETCH_INTER_LAW_FILES_START,
    payload: {token, category}
});
export const fetchInterLawFilesSuccess = (data) => ({
    type: adminPagesTypes.FETCH_INTER_LAW_FILES_SUCCESS,
    payload: data
});
export const fetchInterLawFilesFailure = (err) => ({
    type: adminPagesTypes.FETCH_INTER_LAW_FILES_FAILURE,
    payload: err
});


export const submitInterLawFileStart = (token, data) => ({
    type: adminPagesTypes.SUBMIT_INTER_LAW_FILE_START,
    payload: {token, data}
});
export const submitInterLawFileSuccess = () => ({
    type: adminPagesTypes.SUBMIT_INTER_LAW_FILE_SUCCESS,
});
export const submitInterLawFileFailure = (err) => ({
    type: adminPagesTypes.SUBMIT_INTER_LAW_FILE_FAILURE,
    payload: err
});


export const deleteInterLawFileStart = (token, id) => ({
    type: adminPagesTypes.DELETE_INTER_LAW_FILE_START,
    payload: {token, id}
});
export const deleteInterLawFileSuccess = () => ({
    type: adminPagesTypes.DELETE_INTER_LAW_FILE_SUCCESS,
});
export const deleteInterLawFileFailure = (err) => ({
    type: adminPagesTypes.DELETE_INTER_LAW_FILE_FAILURE,
    payload: err
});


export const editInterLawFileStart = (token, data, id) => ({
    type: adminPagesTypes.EDIT_INTER_LAW_FILE_START,
    payload: {token, data, id}
});
export const editInterLawFileSuccess = () => ({
    type: adminPagesTypes.EDIT_INTER_LAW_FILE_SUCCESS,
});
export const editInterLawFileFailure = (err) => ({
    type: adminPagesTypes.EDIT_INTER_LAW_FILE_FAILURE,
    payload: err
});


export const fetchAdminContactsStart = (token) => ({
    type: adminPagesTypes.FETCH_ADMIN_CONTACTS_START,
    payload: token
});
export const fetchAdminContactsSuccess = (data) => ({
    type: adminPagesTypes.FETCH_ADMIN_CONTACTS_SUCCESS,
    payload: data
});
export const fetchAdminContactsFailure = (err) => ({
    type: adminPagesTypes.FETCH_ADMIN_CONTACTS_FAILURE,
    payload: err
});


export const submitContactsAdminStart = (token, data) => ({
    type: adminPagesTypes.SUBMIT_CONTACTS_ADMIN_START,
    payload: {token, data}
});
export const submitContactsAdminSuccess = () => ({
    type: adminPagesTypes.SUBMIT_CONTACTS_ADMIN_SUCCESS,
});
export const submitContactsAdminFailure = (err) => ({
    type: adminPagesTypes.SUBMIT_CONTACTS_ADMIN_FAILURE,
    payload: err
});


export const addNewsAdminStart = (token, data) => ({
    type: adminPagesTypes.ADD_NEWS_ADMIN_START,
    payload: {token, data}
});
export const addNewsAdminSuccess = () => ({
    type: adminPagesTypes.ADD_NEWS_ADMIN_SUCCESS,
});
export const addNewsAdminFailure = (err) => ({
    type: adminPagesTypes.ADD_NEWS_ADMIN_FAILURE,
    payload: err
});


export const deleteNewsAdminStart = (token, id) => ({
    type: adminPagesTypes.DELETE_NEWS_ADMIN_START,
    payload: {token, id}
});
export const deleteNewsAdminSuccess = () => ({
    type: adminPagesTypes.DELETE_NEWS_ADMIN_SUCCESS,
});
export const deleteNewsAdminFailure = (err) => ({
    type: adminPagesTypes.DELETE_NEWS_ADMIN_FAILURE,
    payload: err
});


