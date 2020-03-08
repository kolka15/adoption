import React from 'react';
import SpinnerImg from '../static/images/spinner.svg';

const Spinner = () => {
    return (
        <div>
            <img src={SpinnerImg} alt="spinner"/>
            <style jsx>{`
                .spinner {
                    animation: spin 1s ease-in-out infinite;
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

export default Spinner;
