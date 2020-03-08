import { takeLatest, call, put, all } from 'redux-saga/effects';
import fetch from 'isomorphic-unfetch';
import municipalityActionTypes from './municipality.types';
import { fetchMunicipalitiesFailure, fetchMunicipalitiesSuccess, fetchMunicipalityOptionsFailure, fetchMunicipalityOptionsSuccess } from './municipality.actions';
import server from '../../utils/config';

function* fetchMunicipalitiesAsync({payload}) {
    try {
        const response = yield fetch(`${server}/api/municipalities/${payload}`);
        const data = yield response.json();
        yield put(fetchMunicipalitiesSuccess(data));
    } catch (err) {
        yield put(fetchMunicipalitiesFailure(err.message));
    }
}

export function* fetchMunicipalitiesStart() {
    yield takeLatest(municipalityActionTypes.FETCH_MUNICIPALITIES_START, fetchMunicipalitiesAsync);
}

function* fetchMunicipalityOptionsAsync({payload}) {
    try {
        const response = yield fetch(`${server}/api/municipalities/select?regionId=${payload}`);
        const data = yield response.json();
        yield put(fetchMunicipalityOptionsSuccess(data));
    } catch (err) {
        yield put(fetchMunicipalityOptionsFailure(err.message));
    }
}

export function* fetchMunicipalityOptionsStart() {
    yield takeLatest(municipalityActionTypes.FETCH_MUNICIPALITY_OPTIONS_START, fetchMunicipalityOptionsAsync);
}

export function* municipalitySagas() {
    yield all([
        call(fetchMunicipalitiesStart),
        call(fetchMunicipalityOptionsStart)
    ]);
}
