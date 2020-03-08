import { createSelector } from 'reselect';

const selectChild = (state) => state.child;

export const selectChildData = createSelector(
    [selectChild],
    (child) => child.childData
);

export const selectIsChildFetching = createSelector(
    [selectChild],
    (child) => child.isFetching
);
