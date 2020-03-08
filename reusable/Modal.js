import React, {useEffect} from 'react';
import getScrollbarWidth from '../utils/scrollWidth';


const Modal = ({setModalVisibility, children}) => {

    const escClose = (e) => {
        const key = e.key;
        if (key === 'Escape') {
            setModalVisibility(false);
        }
    };

    useEffect(() => {
        const body = document.body;
        if (window.innerWidth > document.documentElement.clientWidth) {
            body.style.paddingRight = getScrollbarWidth() + 'px';
        }
        body.style.overflow = 'hidden';

        document.addEventListener('keydown', e => escClose(e));

    }, []);

    useEffect(() => () => {
        const body = document.body;
        body.style.paddingRight = '';
        body.style.overflow = 'auto';
        document.removeEventListener('keydown', (e) => escClose(e));
    }, []);

    const handleClick = () => {
        if (!setModalVisibility) return;
        setModalVisibility(false);
    };

    return (
        <div className='modal' onClick={handleClick}>
            <div className='modal-content' onClick={e => e.stopPropagation()}>
                {setModalVisibility &&
                <img className='close'
                    onClick={() => setModalVisibility(false)}
                    src="/static/images/close-cross.png"
                    alt="закрыть"/>
                }

                {children}
            </div>
            <style jsx>
                {`
                    .modal {
                        position:fixed;
                        top: 0px;
                        bottom: 0px;
                        left: 0px;
                        right: 0px;
                        background: rgba(221, 232, 253, 0.7);
                        z-index: 1000;
                        animation: backgroundIn .3s forwards;
                        overflow-y: auto;
                    }
                    .modal-content {
                        animation: windowIn .3s forwards;
                        max-width: 870px;
                        margin: 60px auto 40px;
                        box-shadow:  0px 2px 2px rgba(0,0,0,0.12);
                    }
                    .close {
                        position:absolute;
                        top: 20px;
                        right: 20px;
                        cursor: pointer;
                        z-index: 1;
                    }
                     @keyframes backgroundIn {
                      0% {
                        opacity: 0;
                      }
                      100% {
                        opacity: 1;
                      }
                    }
                     @keyframes windowIn {
                      0% {
                        transform: translateY(-50%)
                      }
                      100% {
                        transform: translateY(0)
                      }
                    }
                    
                `}
            </style>
        </div>
    );
};

export default Modal;
