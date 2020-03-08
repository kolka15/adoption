import React from 'react';
import SpinnerDark from './SpinnerDark';


const WithSpinner = WrappedComponent => {
    const SpinnerBlock = ({isLoading, ...otherProps}) => {
        return isLoading ? (
            <SpinnerDark/>
        ) : (
            <WrappedComponent {...otherProps}/>
        );
    };
    return SpinnerBlock;
};

export default WithSpinner;