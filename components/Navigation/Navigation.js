import React from 'react';
import theme from '../../utils/styles/theme';
import NavItem from './NavItem';
import { dataNav } from '../../utils/stubs';

const Navigation = () => {
    return (
        <div className='navigation'>
            {
                dataNav.map((item, i) =>
                    <NavItem key={i} item={item} />
                )
            }

            <style jsx>{`
            .navigation {
                display: flex;
                justify-content: space-between;
                margin-top: 110px;
            }
            @media screen and (max-width: ${theme.media.tabletS}) {
                .navigation {
                    margin-top: 90px;
                }
            }
            @media screen and (max-width: ${theme.media.phone}) {
                .navigation {
                    flex-direction: column;
                    margin-top: 90px;
                }
            }
            @media screen and (max-width: ${theme.media.phoneS}) {
                .navigation {
                    margin-top: 30px;
                }
            }
        `}</style>
        </div>
    );
};

export default Navigation;
