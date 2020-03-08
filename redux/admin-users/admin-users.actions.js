import adminPagesTypes from './admin-users.types';

export const fetchUsersAdminStart = (token) => ({
    type: adminPagesTypes.FETCH_USERS_ADMIN_START,
    payload: token
});
export const fetchUsersAdminSuccess = (users) => ({
    type: adminPagesTypes.FETCH_USERS_ADMIN_SUCCESS,
    payload: users
});
export const fetchUsersAdminFailure = (err) => ({
    type: adminPagesTypes.FETCH_USERS_ADMIN_FAILURE,
    payload: err
});


export const filterUserRole = (role) => ({
    type: adminPagesTypes.FILTER_USER_ROLE,
    payload: role
});
export const filterSearchQuery = (query) => ({
    type: adminPagesTypes.FILTER_SEARCH_QUERY,
    payload: query
});
export const selectUser = (user) => ({
    type: adminPagesTypes.SELECT_USER,
    payload: user
});
export const editUser = (data) => ({
    type: adminPagesTypes.EDIT_USER,
    payload: data
});


export const submitUserEditionStart = (token, data) => ({
    type: adminPagesTypes.SUBMIT_USER_EDITION_START,
    payload: {token, data}
});
export const submitUserEditionSuccess = () => ({
    type: adminPagesTypes.SUBMIT_USER_EDITION_SUCCESS,
});
export const submitUserEditionFailure = (err) => ({
    type: adminPagesTypes.SUBMIT_USER_EDITION_FAILURE,
    payload: err
});