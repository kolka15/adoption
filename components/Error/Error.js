import React from 'react';

const ErrorPage = ({statusCode}) => {

    const error = () => {
        switch (statusCode) {
        case '404' :
            return <img src="/static/images/404.jpg" alt="404"/>;
        default:
            return <img src="/static/images/404.jpg" alt="404"/>;
        }
    };

    return (
        <div className='error-page'>

            {error()}

            {/*{statusCode
                ? `An error ${statusCode} occurred on server`
                : 'An error occurred on client'}*/}

            <style jsx>{`
                .error-page {
                  position: absolute;
                  display:flex;
                  height: 100%;
                  width: 100%;
                  background:#fff;
                  align-items: center;
                  justify-content:center;
                }
`}          </style>
        </div>
    );
};

export default ErrorPage;
