import {takeLatest, call, put, all} from 'redux-saga/effects';
import fetch from 'isomorphic-unfetch';
import newsActionTypes from './news.types';
import {fetchNewsFailure, fetchNewsSuccess, fetchAllNewsFailure, fetchAllNewsSuccess} from './news.actions';
import server from '../../utils/config';
import query from '../../utils/makeQuery';


export function* fetchAllNewsAsync({payload}) {
    try {
        const response = yield fetch(`${server}/api/articles?${query(payload)}`);
        const data = yield response.json();
        yield put(fetchAllNewsSuccess(data));
    } catch (err) {
        yield put(fetchAllNewsFailure(err.message));
    }
}

export function* fetchAllNewsStart() {
    yield takeLatest(newsActionTypes.FETCH_ALL_NEWS_START, fetchAllNewsAsync);
}

function* fetchNewsAsync({payload}) {
    try {
        const response = yield fetch(`${server}/api/articles/${payload}`);
        const data = yield response.json();
        yield put(fetchNewsSuccess(data));
    } catch (err) {
        yield put(fetchNewsFailure(err.message));
    }
}

export function* fetchNewsStart() {
    yield takeLatest(newsActionTypes.FETCH_NEWS_START, fetchNewsAsync);
}

export function* newsSagas() {
    yield all([
        call(fetchAllNewsStart),
        call(fetchNewsStart)
    ]);
}
