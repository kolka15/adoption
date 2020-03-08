import {takeLatest, call, put, all} from 'redux-saga/effects';
import fetch from 'isomorphic-unfetch';
import loginActionTypes from './login.types';
import {loginFailure, loginSuccess} from './login.actions';
import server from '../../utils/config';
import {login} from '../../utils/auth';
import Router from 'next/router';


function* loginAsync({payload}) {

    const {username, password} = payload;
    const url = `${server}/api/login_check`;

    try {
        const response = yield fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: username, password: password})
        });

        const data = yield response.json();

        const {token} = data;

        yield put(loginSuccess(token));

        login(token);


    } catch (err) {

        yield put(loginFailure('Неверный логин или пароль'));
        
        console.log (
            'err ',  err,
        );

        // Router.push('/login');
    }
}

export function* loginStart() {
    yield takeLatest(loginActionTypes.LOGIN_START, loginAsync);
}

export function* loginSagas() {
    yield all([
        call(loginStart),
    ]);
}