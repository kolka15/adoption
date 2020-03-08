import Link from 'next/link';
import theme from '../../utils/styles/theme';

const NavItem = ({ item }) => {
    const { link, title, img } = item;
    return (
        <div className='nav-item'>
            <Link href={`/${link}`}>
                <a aria-label={`Ссылка на раздел "${title}"`}>
                    <img src={img} alt={title} className='image'/>
                    <h3 className='title'>{title}</h3>
                </a>
            </Link>

            <style jsx>{`
            .nav-item {
                display: flex;
                flex-direction: column;
            }
            
            .title {
                font-size: ${theme.fontSize.h3};
                line-height: ${theme.lineHeight.h3};
                text-transform: uppercase;
                max-width: 250px;
                font-weight: 700;
                margin: ${item.marginTop} 0 0;
                color: ${theme.colors.lavender.darkest};
                text-align: center;
            }
            
            a:hover .title, a:active .title {
                color: ${theme.colors.blue.plain};
            }
            
            a {
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            @media screen and (max-width: ${theme.media.desktop}) {
                .nav-item {
                    max-width: 32%;
                }
            }
            @media screen and (max-width: ${theme.media.tabletS}) {
                .image {
                    max-width: 95%;
                }
                .title {
                    font-size: 20px;
                    line-height: 30px;
                }
            }
            @media screen and (max-width: ${theme.media.phone}) {
                .nav-item {
                    max-width: 100%;
                    margin-bottom: 30px;
                }
                .image {
                    max-width: 60%;
                }
                .title {
                    margin-top: 10px;
                }
            }
            @media screen and (max-width: 400px) {
                .nav-item {
                    margin-bottom: 20px;
                }
                .image {
                    max-width: 70%;
                }
            }
        `}</style>
        </div>
    );
};

export default NavItem;
