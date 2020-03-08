import {createSelector} from 'reselect';
import {formatMunicipalitySelectOptions, filterMunicipalData} from './lk-regional.utils';


const selectMunicipal = (state) => state.lkRegional;

export const selectMunicipalities = createSelector(
    [selectMunicipal],
    (lkRegional) => lkRegional.municipalities
);

export const selectMunicipalDistrictOptions = createSelector(
    [selectMunicipal],
    (lkRegional) => lkRegional ? formatMunicipalitySelectOptions(lkRegional.municipalities) : null
);

export const selectEditForm = createSelector(
    [selectMunicipal],
    (lkRegional) => lkRegional.editForm
);

export const selectMunicipalData = createSelector(
    [selectMunicipal],
    (lkRegional) => {
        return lkRegional ? filterMunicipalData(lkRegional) : null;
    }
);

export const selectIsFetching = createSelector(
    [selectMunicipal],
    (lkRegional) => lkRegional.isFetching
);

export const selectSelectedMunicipality = createSelector(
    [selectMunicipal],
    (lkRegional) => lkRegional.selectedMunicipality
);