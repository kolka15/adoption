import eyesActionTypes from './eyes.types';

export const fetchEyesStart = () => ({
    type: eyesActionTypes.FETCH_EYES_START
});

export const fetchEyesSuccess = (eyesOptions) => ({
    type: eyesActionTypes.FETCH_EYES_SUCCESS,
    payload: eyesOptions
});

export const fetchEyesFailure = (err) => ({
    type: eyesActionTypes.FETCH_EYES_FAILURE,
    payload: err
});
