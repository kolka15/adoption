import React, { useState } from 'react';
import {withRouter} from 'next/router';
import { menuItems } from '../../utils/stubs';
import theme from '../../utils/styles/theme';
import BurgerItem from './BurgerItem';

const BurgerMenu = ({ router }) => {
    const [isActive, setIsActive] = useState(false);
    let [activeTab, setActiveTab] = useState(router.pathname.replace('/', ''));

    const handleTabClick = (path) => {
        setActiveTab(path);
    };

    const toggleActive = () => {
        setIsActive(!isActive);
    };

    return (
        <div className={`${isActive ? 'menu-open' : ''}`}>
            <button className={`js-menu menu ${isActive ? 'active' : ''}`} type="button" onClick={toggleActive}>
                <span className="bar"/>
            </button>

            <nav>
                <ul>
                    {menuItems.map((item, i) =>
                        <BurgerItem key={i} item={item} activeTab={activeTab} handleTabClick={handleTabClick}/>
                    )}
                </ul>
            </nav>

            <style jsx>{`
                .menu {
                  transition: 0.1s transform linear;
                  position: relative;
                  background: 0;
                  float: left;
                  height: 21px;
                  width: 31px;
                  z-index: 1;
                  outline: 0;
                  padding: 0;
                  border: 0;
                  cursor: pointer;
                }
                
                .bar, .bar::before, .bar::after {
                  transition: 0.2s background linear 0.1s, 0.2s top linear 0.2s, 0.2s transform linear;
                  position: absolute;
                  background: #fff;
                  margin: auto;
                  width: 100%;
                  height: 2px;
                  content: '';
                  top: 50%;
                  left: 0;
                }
                .menu {
                    z-index: 3;
                }
                .bar {
                  margin-top: -10px;
                }
                .bar::before {
                  top: 20px;
                }
                .bar::after {
                  top: 10px;
                }
                .bar::before, .bar::after {
                  transform: rotate(0deg);
                }
                .active .bar {
                  background: 0;
                  margin-top: 3%;
                }
                .active .bar::before {
                  transform: rotate(45deg);
                }
                .active .bar::after {
                  transform: rotate(-45deg);
                }
                .active .bar::before, .active .bar::after {
                  top: 0;
                }
                .active .bar, .active .bar::before, .active .bar::after {
                  transition: 0.2s background linear 0.1s, 0.2s top linear, 0.2s transform linear 0.2s;
                }
                
                nav {
                  width: 100vw;
                  z-index: 2;
                  height: 101%;
                  background: ${theme.colors.blue.burger};
                  color: ${theme.colors.lavender.light};
                  box-sizing: border-box;
                  position: fixed;
                  transform: translateX(0);
                  transition: transform 0.6s cubic-bezier(0.56, 0.1, 0.34, 0.91);
                  padding-top: 135px;
                  margin-left: 15%;
                  margin-top: -35px;
                }
                .menu-open nav {
                  transform: translateX(-100%);
                }
                ul {
                  margin: 0;
                  list-style: none;
                  padding: 0;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                }
                @media screen and (max-width: ${theme.media.phoneS}) {
                    nav {
                        margin-left: 16%;
                        height: 102%;
                    }
                }
            `}</style>
        </div>
    );
};

export default withRouter(BurgerMenu);
