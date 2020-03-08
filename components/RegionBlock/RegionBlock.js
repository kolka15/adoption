import React, {Fragment} from 'react';
import theme from '../../utils/styles/theme';
import {regionalOperatorRow} from '../../utils/stubs';

const RegionBlock = (props) => {
    const {title} = props;
    const row = () => (
        <Fragment>
            {
                Object.keys(regionalOperatorRow).map((rowKey, i) => {
                    if (rowKey === 'name') {
                        if (props[rowKey]) {
                            return <h3 className='name' key={i}>{props[rowKey]}</h3>;
                        }
                        return false;
                    }
                    if (rowKey === 'specialists') {
                        if (props[rowKey].length) {
                            return (
                                <div key={i} className='details-p'>
                                    <span className='data-type'>{regionalOperatorRow[rowKey]}</span>
                                    <span className='data'>
                                        {
                                            props[rowKey].map((specialist, j) => (
                                                <Fragment key={j}>
                                                    <div className='specialist-fio'>{specialist.fio}</div>
                                                    <div className='specialist-phone'>{specialist.phone}</div>
                                                </Fragment>
                                            ))
                                        }
                                    </span>
                                </div>
                            );
                        }
                        return false;
                    }
                    if (props[rowKey]) {
                        return (
                            <p key={i} className='details-p'>
                                <span className='data-type'>{regionalOperatorRow[rowKey]}</span>
                                <span className='data'>
                                    {
                                        rowKey === 'website' ?
                                            <a className='website' target='_blank'  rel='noopener nofollow' href={props[rowKey]}>
                                                {props[rowKey]}
                                            </a> :
                                            <>
                                                {props[rowKey]}
                                            </>
                                    }
                                </span>
                            </p>
                        );
                    }
                    return false;
                })
            }
        </Fragment>
    );

    return (
        <div className='block'>
            {/*<h3 className='info'>{info}</h3>*/}
            <h2 className='title'>{title}</h2>
            <div className='details'>
                {row()}
            </div>

            <style jsx global>{`
                .info {
                    color: ${theme.colors.lavender.darkest};
                    font-size: ${theme.fontSize.h5};
                    font-weight: 400;
                    line-height: ${theme.lineHeight.plain};
                }
                .title {
                    color: ${theme.colors.lavender.dark};
                    font-size: ${theme.fontSize.h5};
                    font-weight: 400;
                    line-height: ${theme.lineHeight.plain};
                    margin-bottom: 15px;
                }
                .details-p {
                    display: flex;
                    font-weight: 300;
                    line-height: 20px;
                    margin: 2.2rem 0;
                }
                .data-type {
                    width: 40%;
                    color: ${theme.colors.grey.plain};
                }
                .data {
                    color: ${theme.colors.grey.dark};
                    display: flex;
                    flex-direction: column;
                }
                .data span {
                    color: ${theme.colors.grey.plain};
                    margin-top: .5rem;
                }
                .name {
                    color: #154ec9;
                    font-size: 24px;
                    font-weight: 700;
                    margin-bottom: 50px;
                    line-height: 1.2;   
                }
                .specialist-fio {
                    margin-bottom: 5px;
                }
                .specialist-phone {
                  font-style:italic;
                  margin-bottom: 20px;  
                }
                .website {
                  text-decoration:underline;
                }
                .website:hover {
                  text-decoration:none;
                }
                @media screen and (max-width: 850px) {
                    .details-p {
                        flex-direction: column;
                        margin: 15px 0;
                    }
                    .data-type {
                        margin-bottom: 5px;
                    }
                    .title {
                        margin: 22px 0 34px;
                    }
                }
                @media screen and (max-width: ${theme.media.phoneS}) {
                    .info {
                        font-size: 18px;
                    }
                    .title {
                        font-size: 22px;
                        margin: 15px 0 24px;
                    }
                }
            `}</style>
        </div>
    );
};

export default RegionBlock;
