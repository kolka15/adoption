import adminPagesTypes from './admin-pages.types';

const initialState = {
    interLawFiles: null,
    faq: null,
    documentTypes: null,
    contactsAdmin: null,
    newsAdmin: null,
    isFetching: false,
    error: null,
};

const adminPagesReducer = (state = initialState, action) => {
    switch (action.type) {
        
    case adminPagesTypes.FETCH_FAQ_START:
        return {...state, isFetching: true};
    case adminPagesTypes.FETCH_FAQ_SUCCESS:
        return {...state, faq: action.payload, isFetching: false,};
    case adminPagesTypes.FETCH_FAQ_FAILURE:
        return {...state, error: action.payload, isFetching: false};
        
    case adminPagesTypes.ADD_FAQ_QUESTION_START:
        return {...state, isFetching: true};
    case adminPagesTypes.ADD_FAQ_QUESTION_SUCCESS:
        return {...state, isFetching: false};
    case adminPagesTypes.ADD_FAQ_QUESTION_FAILURE:
        return {...state, error: action.payload, isFetching: false};
        
    case adminPagesTypes.DELETE_FAQ_QUESTION_START:
        return {...state, isFetching: true};
    case adminPagesTypes.DELETE_FAQ_QUESTION_SUCCESS:
        return {...state};
    case adminPagesTypes.DELETE_FAQ_QUESTION_FAILURE:
        return {...state, error: action.payload, isFetching: false};
        
    case adminPagesTypes.EDIT_FAQ_QUESTION_START:
        return {...state, isFetching: true};
    case adminPagesTypes.EDIT_FAQ_QUESTION_SUCCESS:
        return {...state};
    case adminPagesTypes.EDIT_FAQ_QUESTION_FAILURE:
        return {...state, error: action.payload, isFetching: false};
        
    case adminPagesTypes.FETCH_DOCUMENT_TYPES_START:
        return {...state, isFetching: true};
    case adminPagesTypes.FETCH_DOCUMENT_TYPES_SUCCESS:
        return {...state, documentTypes: action.payload, isFetching: false};
    case adminPagesTypes.FETCH_DOCUMENT_TYPES_FAILURE:
        return {...state, error: action.payload, isFetching: false};
        
    case adminPagesTypes.FETCH_INTER_LAW_FILES_START:
        return {...state, isFetching: true};
    case adminPagesTypes.FETCH_INTER_LAW_FILES_SUCCESS:
        return {...state, interLawFiles: action.payload, isFetching: false};
    case adminPagesTypes.FETCH_INTER_LAW_FILES_FAILURE:
        return {...state, error: action.payload, isFetching: false};
        
    case adminPagesTypes.SUBMIT_INTER_LAW_FILE_START:
        return {...state, isFetching: true};
    case adminPagesTypes.SUBMIT_INTER_LAW_FILE_SUCCESS:
        return {...state, isFetching: false};
    case adminPagesTypes.SUBMIT_INTER_LAW_FILE_FAILURE:
        return {...state, error: action.payload, isFetching: false};
        
        
    case adminPagesTypes.DELETE_INTER_LAW_FILE_START:
        return {...state, isFetching: true};
    case adminPagesTypes.DELETE_INTER_LAW_FILE_SUCCESS:
        return {...state, isFetching: false};
    case adminPagesTypes.DELETE_INTER_LAW_FILE_FAILURE:
        return {...state, error: action.payload, isFetching: false};
        
        
    case adminPagesTypes.EDIT_INTER_LAW_FILE_START:
        return {...state, isFetching: true};
    case adminPagesTypes.EDIT_INTER_LAW_FILE_SUCCESS:
        return {...state, isFetching: false};
    case adminPagesTypes.EDIT_INTER_LAW_FILE_FAILURE:
        return {...state, error: action.payload, isFetching: false};
        
        
    case adminPagesTypes.FETCH_ADMIN_CONTACTS_START:
        return {...state, isFetching: true};
    case adminPagesTypes.FETCH_ADMIN_CONTACTS_SUCCESS:
        return {...state, contactsAdmin: action.payload, isFetching: false,};
    case adminPagesTypes.FETCH_ADMIN_CONTACTS_FAILURE:
        return {...state, error: action.payload, isFetching: false};
        
        
    case adminPagesTypes.SUBMIT_CONTACTS_ADMIN_START:
        return {...state, isFetching: true};
    case adminPagesTypes.SUBMIT_CONTACTS_ADMIN_SUCCESS:
        return {...state, isFetching: false};
    case adminPagesTypes.SUBMIT_CONTACTS_ADMIN_FAILURE:
        return {...state, error: action.payload, isFetching: false};
        
        
    case adminPagesTypes.ADD_NEWS_ADMIN_START:
        return {...state, isFetching: true};
    case adminPagesTypes.ADD_NEWS_ADMIN_SUCCESS:
        return {...state, isFetching: false};
    case adminPagesTypes.ADD_NEWS_ADMIN_FAILURE:
        return {...state, error: action.payload, isFetching: false};
        
    case adminPagesTypes.DELETE_NEWS_ADMIN_START:
        return {...state, isFetching: true};
    case adminPagesTypes.DELETE_NEWS_ADMIN_SUCCESS:
        return {...state, isFetching: false};
    case adminPagesTypes.DELETE_NEWS_ADMIN_FAILURE:
        return {...state, error: action.payload, isFetching: false};
        
    default:
        return state;
    }
};

export default adminPagesReducer;
