import React from 'react';
import {userRoles} from '../utils/stubs';
import {withAuthSync} from '../utils/auth';

const Admin = () => {
    return (
        <div>
            Admin
        </div>
    );
};

Admin.getInitialProps = async (ctx, token) => {

    const {store, res} = ctx;

    let userType = store.getState().login.userData.roles[0];

    if (userType === userRoles.ROLE_ADMINISTRATOR) {
        res.writeHead(302, {
            Location: '/admin/users'
        });
        res.end();
        return;
    }

    res.writeHead(302, {
        Location: '/login'
    });
    res.end();

};

export default withAuthSync(Admin);
