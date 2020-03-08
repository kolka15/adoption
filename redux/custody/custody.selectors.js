import { createSelector } from 'reselect';
import formatSelectOptions from '../../utils/formatSelectOptions';

const selectCustody = (state) => state.custody;

export const selectCustodyOptions = createSelector(
    [selectCustody],
    (custody) => custody.custodyOptions ? formatSelectOptions(custody.custodyOptions) : null
);
