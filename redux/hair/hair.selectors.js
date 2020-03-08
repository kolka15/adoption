import { createSelector } from 'reselect';
import formatSelectOptions from '../../utils/formatSelectOptions';

const selectHair = (state) => state.hair;

export const selectHairOptions = createSelector(
    [selectHair],
    (hair) => hair.hairOptions ? formatSelectOptions(hair.hairOptions) : null
);
