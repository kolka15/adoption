import {takeLatest, call, put, all} from 'redux-saga/effects';
import fetch from 'isomorphic-unfetch';
import lkRegionalActionTypes from './lk-regional.types';
import {
    fetchMunicipalDistrictSuccess,
    fetchMunicipalDistrictFailure,
    createMunicipalitySuccess,
    createMunicipalityFailure,
    editMunicipalitySuccess,
    editMunicipalityFailure,
    deleteMunicipalitySuccess,
    deleteMunicipalityFailure
} from './lk-regional.actions';
import server from '../../utils/config';
import {convertDataToCreateMunicipalDistrict} from './lk-regional.utils';


function* fetchMunicipalDistrictsAsync({payload}) {

    try {
        const response = yield fetch(`${server}/api/private/municipalities`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${payload}`,
            }
        });

        const data = yield response.json();

        yield put(fetchMunicipalDistrictSuccess(data));

    } catch (err) {
        yield put(fetchMunicipalDistrictFailure(err.message));
    }
}

export function* fetchMunicipalDistrictsStart() {
    yield takeLatest(lkRegionalActionTypes.FETCH_MUNICIPAL_DISTRICTS_START, fetchMunicipalDistrictsAsync);
}

function* createMunicipalDistrictsAsync({payload}) {

    const {newMunicipality, token} = payload;

    try {
        const createMunicipality = yield fetch(`${server}/api/private/municipalities`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(convertDataToCreateMunicipalDistrict(newMunicipality))
        });

        const data = yield createMunicipality.json();

        yield put(createMunicipalitySuccess(data));

        yield fetchMunicipalDistrictsAsync({payload: token});

    } catch (err) {
        yield put(createMunicipalityFailure(err.message));
    }
}

export function* createMunicipalDistrictsStart() {
    yield takeLatest(lkRegionalActionTypes.CREATE_MUNICIPALITY_START, createMunicipalDistrictsAsync);
}


function* deleteMunicipalDistrictsAsync({payload}) {

    const {props: {value}, token} = payload;

    try {
        const deleteMunicipality = yield fetch(`${server}/api/private/municipalities/${value}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = yield deleteMunicipality.json();

        yield put(deleteMunicipalitySuccess(data));

        yield fetchMunicipalDistrictsAsync({payload: token});

    } catch (err) {
        yield put(deleteMunicipalityFailure(err.message));

    }
}

export function* deleteMunicipalDistrictsStart() {
    yield takeLatest(lkRegionalActionTypes.DELETE_MUNICIPALITY_START, deleteMunicipalDistrictsAsync);
}


function* editMunicipalityDataAsync({payload}) {

    const {regionalFormDataState, token} = payload;

    const id = regionalFormDataState.id;

    try {
        const editMunicipality = yield fetch(`${server}/api/private/municipalities/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(regionalFormDataState)
        });

        const data = yield editMunicipality.json();

        yield put(editMunicipalitySuccess(data));

        yield fetchMunicipalDistrictsAsync({payload: token});

    } catch (err) {
        yield put(editMunicipalityFailure(err.message));
    }
}

export function* editMunicipalityDataStart() {
    yield takeLatest(lkRegionalActionTypes.EDIT_MUNICIPALITY_DATA_START, editMunicipalityDataAsync);
}


export function* lkRegionalSagas() {
    yield all([
        call(fetchMunicipalDistrictsStart),
        call(createMunicipalDistrictsStart),
        call(editMunicipalityDataStart),
        call(deleteMunicipalDistrictsStart),
    ]);
}
