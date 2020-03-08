import React from 'react';
import SpinnerImg from '../static/images/spinner-dark.svg';

const SpinnerDark= () => {
    return (
        <div className='spinner-wrapper'>
            <img src={SpinnerImg} alt="spinner"/>
            <style jsx>{`
                .spinner {
                    animation: spin 1s ease-in-out infinite;
                }
                .spinner-wrapper {
                    text-align: center;
                    margin: 40px 0;
                    width: 100%;
                }
                @keyframes spin {
                  to {
                        transform: rotate(360deg);
                    }
                }
                
            `}</style>
        </div>
    );
};

export default SpinnerDark;