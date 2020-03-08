import { createSelector } from 'reselect';
import formatSelectOptions from '../../utils/formatSelectOptions';

const selectMunicipality = (state) => state.municipality;

export const selectMunicipalityOptions = createSelector(
    [selectMunicipality],
    (municipality) => municipality.municipalityOptions ? formatSelectOptions(municipality.municipalityOptions, false) : null
);
