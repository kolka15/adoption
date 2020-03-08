import { createSelector } from 'reselect';
import formatSelectOptions from '../../utils/formatSelectOptions';

const selectEyes = (state) => state.eyes;

export const selectEyesOptions = createSelector(
    [selectEyes],
    (eyes) => eyes.eyesOptions ? formatSelectOptions(eyes.eyesOptions) : null
);
