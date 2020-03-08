import { createSelector } from 'reselect';
import { getChildrenTotal } from './children.utils';

const selectChildren = (state) => state.children;

export const selectChildrenData = createSelector(
    [selectChildren],
    (children) => children.childrenData ? children.childrenData.rows : null
);

export const selectChildrenMeta = createSelector(
    [selectChildren],
    (children) => children.childrenData ? children.childrenData.meta : null
);

export const selectFoundTotal = createSelector(
    [selectChildrenMeta],
    (meta) => meta && meta.total ? getChildrenTotal(meta.total) : ''
);

export const selectIsChildrenFetching = createSelector(
    [selectChildren],
    (children) => children.isFetching
);

export const selectChildrenQuery = createSelector(
    [selectChildren],
    (children) => children.query
);
