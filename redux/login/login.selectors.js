import {createSelector} from 'reselect';

const selectLogin = (state) => state.login;

export const selectUserData = createSelector(
    [selectLogin],
    (login) => login.userData
);

export const selectIsFetching = createSelector(
    [selectLogin],
    (login) => login.isFetching
);

export const selectErrorMessage = createSelector(
    [selectLogin],
    (login) => login.errorMessage
);

export const selectToken = createSelector(
    [selectLogin],
    (login) => login.token
);