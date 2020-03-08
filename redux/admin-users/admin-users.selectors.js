import {createSelector} from 'reselect';
import {filterUsersAdmin} from '../../reusable/filterUsersAdmin';

const adminUsers = (state) => state.adminUsers;

export const selectUsers = createSelector(
    [adminUsers],
    (adminUsers) => adminUsers.users ? filterUsersAdmin(adminUsers.users, adminUsers.userRole, adminUsers.searchQuery) : null
);