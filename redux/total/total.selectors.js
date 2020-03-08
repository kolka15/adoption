import { createSelector } from 'reselect';
import { getChildrenTotal } from '../children/children.utils';

const selectTotal = (state) => state.total;

export const selectChildrenTotal = createSelector(
    [selectTotal],
    (total) => total.total ? getChildrenTotal(total.total.total) : ''
);

export const selectChildrenDate = createSelector(
    [selectTotal],
    (total) => total.total ? total.total.date : ''
);
