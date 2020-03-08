import React from 'react';
import theme from '../utils/styles/theme';

const Title = ({ title, marginBottom = '3rem', type = 'default' }) => {
    return (
        <div className={`title title_type_${type}`}>
            <h1 className='text'>{title}</h1>
            <div className='underline'/>
            <style jsx>{`
                .title {
                    color: ${theme.colors.lavender.darkest};
                    text-transform: uppercase;
                    margin-bottom: ${marginBottom};
                }
                .text {
                    font-size: ${theme.fontSize.h1};
                    line-height: ${theme.lineHeight.h2};
                    margin: 3rem 0 1.3rem;
                }
                .underline {
                    width: 76px;
                    height: 3px;
                    background: ${theme.colors.orange};
                }
                @media screen and (max-width: ${theme.media.tabletS}) {
                    .text {
                        font-size: 30px;
                        margin: 25px 0 18px;
                    }
                }
                @media screen and (max-width: ${theme.media.phoneS}) {
                    .title {
                        margin-bottom: 1rem;
                    }
                    .title_type_small .text {
                        font-size: 24px;
                    }
                }
            `}</style>
        </div>
    );
};

export default Title;
