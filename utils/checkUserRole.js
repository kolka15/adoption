import {userRoles} from './stubs';

export const checkAdmin = (store, res) => {
    let userType = store.getState().login.userData.roles[0];

    if (userRoles.ROLE_ADMINISTRATOR !== userType) {
        res.writeHead(302, {
            Location: '/login'
        });
        res.end();
    }
};