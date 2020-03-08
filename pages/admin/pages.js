import React from 'react';
import {userRoles} from '../../utils/stubs';
import {withAuthSync} from '../../utils/auth';

const Pages = () => {
    return (
        <div>
            Pages
        </div>
    );
};

Pages.getInitialProps = async (ctx, token) => {

    const {store, res} = ctx;

    let userType = store.getState().login.userData.roles[0];

    if (userType === userRoles.ROLE_ADMINISTRATOR) {
        console.log (
            ' admin'
        );
        res.writeHead(302, {
            Location: '/admin/pages/faq'
        });
        res.end();
        return;
    }

    res.writeHead(302, {
        Location: '/login'
    });
    res.end();

};

export default withAuthSync(Pages);
