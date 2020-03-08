import { createSelector } from 'reselect';
import formatSelectOptions from '../../utils/formatSelectOptions';

const selectRegions = (state) => state.regions;

export const selectRegionOptions = createSelector(
    [selectRegions],
    (regions) => regions.regionOptions ? formatSelectOptions(regions.regionOptions, false) : null
);