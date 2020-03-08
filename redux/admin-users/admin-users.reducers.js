import adminPagesTypes from './admin-users.types';

const initialState = {
    users: null,
    userRole: 'ALL',
    searchQuery: '',
    selectedUser: null,
    isFetching: false,
    error: null,
    invalidEmail: true,
};

const adminUsersReducer = (state = initialState, action) => {
    switch (action.type) {
        
    case adminPagesTypes.FETCH_USERS_ADMIN_START:
        return {...state, isFetching: true};
    case adminPagesTypes.FETCH_USERS_ADMIN_SUCCESS:
        return {...state, users: action.payload, isFetching: false,};
    case adminPagesTypes.FETCH_USERS_ADMIN_FAILURE:
        return {...state, error: action.payload, isFetching: false};
        
        
    case adminPagesTypes.FILTER_USER_ROLE:
        return {...state, userRole: action.payload, searchQuery: ''};
    case adminPagesTypes.FILTER_SEARCH_QUERY:
        return {...state, searchQuery: action.payload, userRole: 'ALL'};
    case adminPagesTypes.SELECT_USER:
        return {...state, selectedUser: action.payload};
    case adminPagesTypes.EDIT_USER:
        return {...state, selectedUser: action.payload};
        
        
    case adminPagesTypes.SUBMIT_USER_EDITION_START:
        return {...state, isFetching: true};
    case adminPagesTypes.SUBMIT_USER_EDITION_SUCCESS:
        return {...state, isFetching: false, invalidEmail: false};
    case adminPagesTypes.SUBMIT_USER_EDITION_FAILURE:
        return {...state, error: action.payload, isFetching: false};
        
        
    default:
        return state;
    }
};

export default adminUsersReducer;
