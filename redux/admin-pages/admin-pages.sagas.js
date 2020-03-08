import {takeLatest, call, put, all} from 'redux-saga/effects';
import fetch from 'isomorphic-unfetch';

import {
    fetchFAQSuccess,
    fetchFAQFailure,
    addFaqQuestionSuccess,
    addFaqQuestionFailure,
    deleteFaqQuestionSuccess,
    deleteFaqQuestionFailure,
    editFaqQuestionSuccess,
    editFaqQuestionFailure,
    fetchDocumentTypesSuccess,
    fetchDocumentTypesFailure,
    fetchInterLawFilesSuccess,
    fetchInterLawFilesFailure,
    submitInterLawFileSuccess,
    submitInterLawFileFailure,
    deleteInterLawFileSuccess,
    deleteInterLawFileFailure,
    editInterLawFileSuccess,
    editInterLawFileFailure,
    fetchAdminContactsSuccess,
    fetchAdminContactsFailure,
    submitContactsAdminSuccess,
    submitContactsAdminFailure,
    addNewsAdminSuccess,
    addNewsAdminFailure,
    deleteNewsAdminSuccess,
    deleteNewsAdminFailure,
} from './admin-pages.actions';
import server from '../../utils/config';
import adminPagesTypes from './admin-pages.types';
import {fetchAllNewsAsync} from '../news/news.sagas';


function* fetchAdminFAQAsync({payload}) {
    
    try {
        const response = yield fetch(`${server}/api/private/faq`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${payload}`,
            }
        });
        
        const data = yield response.json();
        
        yield put(fetchFAQSuccess(data));
        
    } catch (err) {
        yield put(fetchFAQFailure(err.message));
    }
}

export function* fetchAdminFAQStart() {
    yield takeLatest(adminPagesTypes.FETCH_FAQ_START, fetchAdminFAQAsync);
}

function* addFaqQuestionAsync({payload}) {
    
    const {token, data} = payload;
    
    try {
        const response = yield fetch(`${server}/api/private/faq`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data)
            
        });
        
        const res = yield response.json();
        
        yield put(addFaqQuestionSuccess(res));
        
        yield fetchAdminFAQAsync({payload: token});
        
    } catch (err) {
        yield put(addFaqQuestionFailure(err.message));
    }
}

export function* addFaqQuestionStart() {
    yield takeLatest(adminPagesTypes.ADD_FAQ_QUESTION_START, addFaqQuestionAsync);
}


function* deleteFaqQuestionAsync({payload}) {
    
    const {token, id} = payload;
    
    try {
        const response = yield fetch(`${server}/api/private/faq/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            
        });
        
        const res = yield response.json();
        
        yield put(deleteFaqQuestionSuccess(res));
        
        yield fetchAdminFAQAsync({payload: token});
        
    } catch (err) {
        yield put(deleteFaqQuestionFailure(err.message));
    }
}

export function* deleteFaqQuestionStart() {
    yield takeLatest(adminPagesTypes.DELETE_FAQ_QUESTION_START, deleteFaqQuestionAsync);
}

function* editFaqQuestionAsync({payload}) {
    
    const {token, id, data} = payload;
    
    try {
        const response = yield fetch(`${server}/api/private/faq/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data)
        });
        
        const res = yield response.json();
        
        yield put(editFaqQuestionSuccess(res));
        
        yield fetchAdminFAQAsync({payload: token});
        
    } catch (err) {
        yield put(editFaqQuestionFailure(err.message));
    }
}

export function* editFaqQuestionStart() {
    yield takeLatest(adminPagesTypes.EDIT_FAQ_QUESTION_START, editFaqQuestionAsync);
}


function* fetchDocumentTypesAsync() {
    
    try {
        const response = yield fetch(`${server}/api/law_category`, {method: 'GET'});
        
        const res = yield response.json();
        
        
        yield put(fetchDocumentTypesSuccess(res));
        
    } catch (err) {
        yield put(fetchDocumentTypesFailure(err.message));
    }
}

export function* fetchDocumentTypesStart() {
    yield takeLatest(adminPagesTypes.FETCH_DOCUMENT_TYPES_START, fetchDocumentTypesAsync);
}


function* fetchInterLawFilesAsync({payload}) {
    
    const {token, category} = payload;
    
    try {
        const response = yield fetch(`${server}/api/law${category ? '?categoryCode=' + category : ''}`, {
            method: 'GET',
        });
        
        const res = yield response.json();
        
        yield put(fetchInterLawFilesSuccess(res));
        
    } catch (err) {
        yield put(fetchInterLawFilesFailure(err.message));
    }
}

export function* fetchInterLawFilesStart() {
    yield takeLatest(adminPagesTypes.FETCH_INTER_LAW_FILES_START, fetchInterLawFilesAsync);
}


function* submitInterLawFileAsync({payload}) {
    
    const {token, data} = payload;
    
    try {
        const response = yield fetch(`${server}/api/private/law`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data)
            
        });
        
        const res = yield response.json();
        
        yield put(submitInterLawFileSuccess(res));
        
        yield fetchInterLawFilesAsync({payload: token});
        
        
    } catch (err) {
        yield put(submitInterLawFileFailure(err.message));
    }
}

export function* submitInterLawFileStart() {
    yield takeLatest(adminPagesTypes.SUBMIT_INTER_LAW_FILE_START, submitInterLawFileAsync);
}


function* deleteInterLawFileAsync({payload}) {
    
    const {token, id} = payload;
    
    try {
        const response = yield fetch(`${server}/api/private/law/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        
        const res = yield response.json();
        
        yield put(deleteInterLawFileSuccess(res));
        
        yield fetchInterLawFilesAsync({payload: token});
        
    } catch (err) {
        yield put(deleteInterLawFileFailure(err.message));
    }
}

export function* deleteInterLawFileStart() {
    yield takeLatest(adminPagesTypes.DELETE_INTER_LAW_FILE_START, deleteInterLawFileAsync);
}


function* editInterLawFileAsync({payload}) {
    
    const {token, data, id} = payload;
    
    try {
        const response = yield fetch(`${server}/api/private/law/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data)
        });
        
        const res = yield response.json();
        
        yield put(editInterLawFileSuccess(res));
        
        yield fetchInterLawFilesAsync({payload: token});
        
    } catch (err) {
        yield put(editInterLawFileFailure(err.message));
    }
}

export function* editInterLawFileStart() {
    yield takeLatest(adminPagesTypes.EDIT_INTER_LAW_FILE_START, editInterLawFileAsync);
}


function* fetchAdminContactsAsync({payload}) {
    
    try {
        const response = yield fetch(`${server}/api/private/contacts`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${payload}`,
            },
        });
        
        const res = yield response.json();
        
        yield put(fetchAdminContactsSuccess(res));
        
    } catch (err) {
        yield put(fetchAdminContactsFailure(err.message));
    }
}

export function* fetchAdminContactsStart() {
    yield takeLatest(adminPagesTypes.FETCH_ADMIN_CONTACTS_START, fetchAdminContactsAsync);
}


function* submitContactsAdminAsync({payload}) {
    
    const {token, data} = payload;
    
    try {
        const response = yield fetch(`${server}/api/private/contacts`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data)
            
        });
        
        const res = yield response.json();
        
        yield put(submitContactsAdminSuccess(res));
        
        yield fetchAdminContactsAsync({payload: token});
        
        
    } catch (err) {
        yield put(submitContactsAdminFailure(err.message));
    }
}

export function* submitContactsAdminStart() {
    yield takeLatest(adminPagesTypes.SUBMIT_CONTACTS_ADMIN_START, submitContactsAdminAsync);
}

const pageOptions = {payload: {year: '', month: '', limit: 10, page: 1}};

function* addNewsAdminAsync({payload}) {
    
    const {token, data} = payload;
    
    try {
        const response = yield fetch(`${server}/api/private/articles`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data)
            
        });
        
        const res = yield response.json();
        
        yield put(addNewsAdminSuccess(res));
        
        
        yield fetchAllNewsAsync(pageOptions);
        
        
    } catch (err) {
        yield put(addNewsAdminFailure(err.message));
    }
}

export function* addNewsAdminStart() {
    yield takeLatest(adminPagesTypes.ADD_NEWS_ADMIN_START, addNewsAdminAsync);
}




function* deleteNewsAdminAsync({payload}) {
    
    const {token, id} = payload;

    try {
        const response = yield fetch(`${server}/api/private/articles/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        
        const res = yield response.json();
        
        yield put(deleteNewsAdminSuccess(res));
    
        yield fetchAllNewsAsync(pageOptions);
        
    } catch (err) {
        yield put(deleteNewsAdminFailure(err.message));
    }
}

export function* deleteNewsAdminStart() {
    yield takeLatest(adminPagesTypes.DELETE_NEWS_ADMIN_START, deleteNewsAdminAsync);
}



export function* adminPagesSagas() {
    yield all([
        call(fetchAdminFAQStart),
        call(addFaqQuestionStart),
        call(deleteFaqQuestionStart),
        call(editFaqQuestionStart),
        call(fetchDocumentTypesStart),
        call(fetchInterLawFilesStart),
        call(submitInterLawFileStart),
        call(deleteInterLawFileStart),
        call(editInterLawFileStart),
        call(fetchAdminContactsStart),
        call(submitContactsAdminStart),
        call(addNewsAdminStart),
        call(deleteNewsAdminStart),
    ]);
}
