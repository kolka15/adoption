import { createSelector } from 'reselect';
import formatSelectOptions from '../../utils/formatSelectOptions';

const selectGender = (state) => state.gender;

export const selectGenderOptions = createSelector(
    [selectGender],
    (gender) => gender.genderOptions ? formatSelectOptions(gender.genderOptions) : null
);
