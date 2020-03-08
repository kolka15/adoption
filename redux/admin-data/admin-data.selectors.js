import {createSelector} from 'reselect';

import {formatMunicipalitySelectOptions, filterMunicipalData} from './lk-regional.utils';


const adminData = (state) => state.adminData;

export const selectMunicipalities = createSelector(
    [adminData],
    (lkRegional) => lkRegional.municipalities
);

export const selectMunicipalDistrictOptions = createSelector(
    [adminData],
    (lkRegional) => lkRegional ? formatMunicipalitySelectOptions(lkRegional.municipalities) : null
);