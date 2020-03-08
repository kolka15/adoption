import React, { useState, useEffect } from 'react';
import Router from 'next/dist/client/router';

import theme from '../utils/styles/theme';

const Accordion = ({ question, children, id, style = {}, scrollable = false }) => {
    const [isOpen, toggleIsOpen] = useState(false);

    const handleClick = () => {
        toggleIsOpen(!isOpen);
    };

    useEffect(() => {
        const index = Router.router.asPath.indexOf('#');
        if (index === -1) return;
        const faqId = Router.router.asPath.slice(index+1);
        if (faqId != id) return;
        toggleIsOpen(true);
    }, []);

    return (
        <div className='accordion'>
            <div className='block-1' onClick={handleClick}>
                <div className='title'>{question}</div>
                <i className='arrow'/>
            </div>
            <div className='underline'/>
            <div className='block-2'>
                <div className='text'>{children}</div>
            </div>
            <style jsx>{`
                .accordion {
                    padding: 37px 40px;
                    background: ${style.background || '#f3f4f9'};
                }
                .block-1 {
                    display: flex;
                    justify-content: space-between;
                    cursor: pointer;
                    position: relative;
                }
                .block-2 {
                    display: ${isOpen ? 'block' : 'none'};
                    max-height: ${scrollable ? '315px' : 'auto'};
                    overflow-y: auto;
                }
                .title {
                    color: ${theme.colors.blue.darkest};
                    font-size: 18px;
                    font-weight: 700;
                    line-height: 22px;
                    width: 95%;
                }
                
                .underline {
                    width: 76px;
                    height: 2px;
                    background: ${scrollable ? 'transparent' : theme.colors.orange};
                    margin: 10px 0;
                    margin-bottom: ${scrollable ? '15px' : '30px'};
                }
                
                .text {
                    color: ${theme.colors.lavender.dark};
                    font-size: 16px;
                    font-weight: 300;
                    line-height: 20px;
                }
                .arrow {
                    display: inline-block;
                    width: 1rem;
                    height: 1rem;
                    border: .09rem solid;
                    border-bottom: 0;
                    border-left: 0;
                    border-radius: .5px;
                    color: rgba(81, 89, 113, 0.99);
                    transform: ${isOpen ? 'rotate(-45deg)' : 'rotate(135deg)'};
                    transition: transform .2s;
                    position: absolute;
                    right: -1rem;
                }
                @media screen and (max-width: ${theme.media.tabletS}) {
                    .accordion {
                        padding: 30px 25px;
                    }
                    .underline {
                        margin-bottom: 10px;
                    }
                    .arrow {
                        width: 13px;
                        height: 13px;
                        right: -7px;
                    }
                    .text {
                        margin-top: 25px;
                    }
                }
                @media screen and (max-width: ${theme.media.phoneS}) {
                    .accordion {
                        padding: 20px 25px;
                    }
                    .underline {
                        margin-bottom: 5px;
                    }
                    .text {
                        margin-top: 15px;
                    }
                    .title {
                        font-size: 16px;
                    }
                }
            `}</style>
        </div>
    );
};

export default Accordion;
