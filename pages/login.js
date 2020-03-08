import React, {useState} from 'react';
import Head from 'next/head';
import LayoutLK from '../components/LayoutLK/LayoutLK';
import {connect, useSelector} from 'react-redux';
import {loginStart} from '../redux/login/login.actions';
import {createStructuredSelector} from 'reselect';
import {selectIsFetching, selectErrorMessage} from '../redux/login/login.selectors';
import {dispatchToken} from '../redux/login/login.actions';

import Button from '../reusable/Button';
import Spinner from '../reusable/Spinner';
import nextCookie from 'next-cookies';


function Login({loginStart, isFetching, errorMessage = ''}) {
    const [userData, setUserData] = useState({username: '', password: '', error: ''});

    const {token} = useSelector(state => {
        return state.login;
    });

    const onLoginStart = (e) => {
        e.preventDefault();
        loginStart(userData);
    };

    return (
        <LayoutLK token={token}>
            <Head>
                <title>Усыновление в Российской Федерации | логин</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                    key="viewport"
                />
            </Head>
            <div className='login'>
                <form onSubmit={e => onLoginStart(e)}>
                    <label htmlFor='username'>Логин</label>

                    <input
                        type='text'
                        id='username'
                        name='username'
                        value={userData.username}
                        onChange={event =>
                            setUserData(
                                Object.assign({}, userData, {username: event.target.value})
                            )
                        }
                    />
                    <label htmlFor='username'>Пароль</label>

                    <input
                        type='password'
                        id='password'
                        name='password'
                        value={userData.password}
                        onChange={event =>
                            setUserData(
                                Object.assign({}, userData, {password: event.target.value})
                            )
                        }
                    />
                    <div className='error-row'>
                        {errorMessage}
                    </div>

                    <div className="submit-row">
                        <Button type='submit'
                            fixedHeight={48}
                            text={isFetching ? <Spinner/> : 'Войти'}/>
                    </div>

                    {userData.error && <p className='error'>Error: {userData.error}</p>}
                </form>
            </div>
            <style jsx>{`
                .login {
                  max-width: 340px;
                  margin: 60px auto;
                  padding: 1rem;
                  border: 1px solid #ccc;
                  border-radius: 4px;
                  background: #fff;
                  
                }
                form {
                  display: flex;
                  flex-flow: column;
                }
                label {
                  font-weight: 600;
                }
                input {
                  padding: 8px;
                  margin: 0.3rem 0 1rem;
                  border: 1px solid #ccc;
                  border-radius: 4px;
                }
                .error {
                  margin: 0.5rem 0 0;
                  color: brown;
                }
                .submit-row {
                    text-align: center;
                }
                .error-row {
                    text-align: center;
                    font-size: 13px;
                    color: red;
                    height: 23px;
                }
      `}</style>
        </LayoutLK>
    );
}

const mapDispatchToProps = (dispatch) => ({
    loginStart: (query) => dispatch(loginStart(query)),
});

const mapStateToProps = createStructuredSelector({
    isFetching: selectIsFetching,
    errorMessage: selectErrorMessage,
});

Login.getInitialProps = async ({ctx}) => {
    const {token} = nextCookie(ctx);
    const {store} = ctx;

    if (token) {
        store.dispatch(dispatchToken(token));
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
