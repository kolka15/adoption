// import {filterUserRole} from "../redux/admin-users/admin-users.actions"

export const filterUsersAdmin = (users, role, searchQuery) => {
    
    if (role === 'ALL' && !searchQuery) return users;
    
    if (role !== 'ALL') {
        return users.filter(user => user.roles[0] === role);
    } else {
        return users.filter(user => {
            if (user.region) {
                return user.region.title.toLowerCase().includes(searchQuery.toLowerCase());
            } else {
                return user.roles[0].toLowerCase().includes(searchQuery.toLowerCase());
            }
        });
    }
};