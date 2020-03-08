import theme from '../../utils/styles/theme';

const Footer = () => (
    <footer className='footer'>
        <div className='footer__inner'>
            <div className='logo'>
                <div className='logo__img'>
                    <img src='/static/images/logo_footer.svg' alt='Логотип МинПрос'/>
                </div>
                <div className='logo__text'>
                    Министерство просвещения
                    РОССИЙСКОЙ ФЕДЕРАЦИИ
                </div>
            </div>
            <div className='contacts'>
                <div className='contacts__tel'>
                    <img src='/static/images/phone.png' alt='phone icon' className='icon'/>
                    +7 (495) 539-55-20
                </div>
                <div className='contacts__email'>
                    <img src='/static/images/mail.png' alt='mail icon' className='icon'/>
                    <a className='underline white' href="mailto:aist@edu.gov.ru">Вопросы по технической поддержке сайта</a>
                </div>
            </div>
        </div>

        <style jsx>{`
            .footer {
                background: ${theme.colors.blue.footer};
                color: #fff;
            }
            .white {
                color: white;
                cursor: pointer;
            }
            .footer__inner {
                max-width: 1140px;
                margin: 0 auto;
                display: flex;
                justify-content: space-between;
                padding: 54px 10px;
            }
            
            .logo {
                display: flex;
                align-items: flex-end;
            }
            
            .logo__img {
                margin-right: 15px;
                width: 42px;
                height: 48px;
            }
            
            .logo__text {
                text-transform: uppercase;
                width: 220px;
                font-size: 14px;
                line-height: 19px;
            }
            
            .contacts {
                display: flex;
                flex-direction: column;
            }
            
            contacts__tel, contacts__email {
                display: flex;
                align-items: center;
            }
            
            .icon {
                margin-right: 10px;
            }
            .underline {
                text-decoration: underline;
            }
            @media screen and (max-width: ${theme.media.desktop}) {
                .footer__inner {
                    max-width: 90%;
                }
            }
            @media screen and (max-width: ${theme.media.tablet}) {
                .footer__inner {
                    max-width: 95%;
                }
            }
            @media screen and (max-width: ${theme.media.phoneS}) {
                .footer__inner {
                    max-width: 95%;
                    flex-direction: column;
                }
                .logo {
                    margin-bottom: 50px;
                }
                .contacts__tel {
                    margin-bottom: 20px;
                }
            }
        `}</style>
    </footer>
);

export default Footer;
