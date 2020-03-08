import { takeLatest, call, put, all } from 'redux-saga/effects';
import fetch from 'isomorphic-unfetch';
import faqActionTypes from './faq.types';
import { fetchFAQFailure, fetchFAQSuccess } from './faq.actions';
import server from '../../utils/config';

function* fetchFAQAsync() {
    try {
        const response = yield fetch(`${server}/api/faq`);
        const data = yield response.json();
        yield put(fetchFAQSuccess(data));
    } catch (err) {
        yield put(fetchFAQFailure(err.message));
    }
}

export function* fetchFAQStart() {
    yield takeLatest(faqActionTypes.FETCH_FAQ_START, fetchFAQAsync);
}

export function* faqSagas() {
    yield all([
        call(fetchFAQStart)
    ]);
}
