import loginActionTypes from './login.types';

const {
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    STORE_USER_DATA,
    DISPATCH_TOKEN
} = loginActionTypes;

const initialState = {
    token: '',
    isFetching: false,
    userData: null,
    errorMessage: null,
};

const loginReducer = (state = initialState, action) => {
    switch (action.type) {

    case LOGIN_START:
        return {...state, userData: action.payload, isFetching: true};
    case LOGIN_SUCCESS:
        return {...state, token: action.payload, isFetching: false};
    case LOGIN_FAILURE:
        return {...state, errorMessage: action.payload, isFetching: false};
    case STORE_USER_DATA:
        return {...state, userData: action.payload};
    case DISPATCH_TOKEN:
        return {...state, token: action.payload};
    default:
        return state;
    }
};

export default loginReducer;
