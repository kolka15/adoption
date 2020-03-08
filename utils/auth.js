import {useEffect} from 'react';
import Router from 'next/router';
import nextCookie from 'next-cookies';
import cookie from 'js-cookie';
import fetch from 'isomorphic-unfetch';
import server from './config';
import {storeUserData, dispatchToken} from '../redux/login/login.actions';


export const login = (token) => {
    cookie.set('token', token, {expires: 30});
    window.location.href = '/lk';
};

export const auth = (ctx) => {
    const {token} = nextCookie(ctx);

    /*
     * If `ctx.req` is available it means we are on the server.
     * Additionally if there's no token it means the user is not logged in.
     */
    if (ctx.req && !token) {
        ctx.res.writeHead(302, {Location: '/login'});
        ctx.res.end();
    }

    // We already checked for server. This should only happen on client.
    if (!token) {
        Router.push('/login');
    }

    return token;
};

export const logout = () => {
    cookie.remove('token');
    // to support logging out from all windows
    window.localStorage.setItem('logout', Date.now());
    Router.push('/login');
};

export const withAuthSync = WrappedComponent => {
    const Wrapper = props => {
        const syncLogout = event => {
            if (event.key === 'logout') {
                console.log('logged out from storage!');
                Router.push('/login');
            }
        };

        useEffect(() => {
            window.addEventListener('storage', syncLogout);

            return () => {
                window.removeEventListener('storage', syncLogout);
                window.localStorage.removeItem('logout');
            };
        }, [null]);

        return <WrappedComponent {...props} />;
    };

    Wrapper.getInitialProps = async ({ctx}) => {

        const token = auth(ctx);
        const {store} = ctx;
        const redirectOnError = () => {
            if (typeof window !== 'undefined') {
                Router.push('/login');
            } else {
                ctx.res.writeHead(302, {Location: '/login'});
                ctx.res.end();
            }
        };

        try {
            const response = await fetch(`${server}/api/private/current_user`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const userData = await response.json();

                store.dispatch(dispatchToken(token));
                store.dispatch(storeUserData(userData));

                const componentProps =
                    WrappedComponent.getInitialProps &&
                    (await WrappedComponent.getInitialProps(ctx, token));

                return {...componentProps, token};


            } else {
                return await redirectOnError();
            }
        } catch (error) {
            // Implementation or Network error
            return redirectOnError();
        }
    };

    return Wrapper;
};