import loginActionTypes from './login.types';

const {
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    STORE_USER_DATA,
    DISPATCH_TOKEN
} = loginActionTypes;

export const loginStart = (data) => ({
    type: LOGIN_START,
    payload: data
});

export const loginSuccess = (token) => ({
    type: LOGIN_SUCCESS,
    payload: token
});

export const loginFailure = (err) => ({
    type: LOGIN_FAILURE,
    payload: err
});

export const storeUserData = (userData) => ({
    type: STORE_USER_DATA,
    payload: userData
});

export const dispatchToken = (token) => ({
    type: DISPATCH_TOKEN,
    payload: token
});
