import Link from 'next/link';
import ReactHtmlParser from 'react-html-parser';
import theme from '../../utils/styles/theme';

import cutText from '../../utils/cutText';

const FAQItem = ({ item }) => {
    const { question, answer, id } = item;
    let charAmount = 300;
    if (process.browser) {
        if (window.innerWidth < 1090 && window.innerWidth > 630) {
            charAmount = 280;
        } else if (window.innerWidth < 631 && window.innerWidth > 530) {
            charAmount = 300;
        } else if (window.innerWidth < 531 && window.innerWidth > 450) {
            charAmount = 220;
        } else if (window.innerWidth < 451 && window.innerWidth > 350) {
            charAmount = 150;
        } else if (window.innerWidth < 351) {
            charAmount = 100;
        }
    }

    const text = (ReactHtmlParser(answer)[0].props && typeof ReactHtmlParser(answer)[0].props.children[0] === 'string') ? cutText(ReactHtmlParser(answer)[0].props.children[0], charAmount) : ReactHtmlParser(answer);

    return (
        <div className='faq-item'>
            <div className='content'>
                <div className='title'>{question}</div>
                <div className='underline' />
                <div className='text'>{text}</div>
            </div>
            <Link href={`/questions#${id}`}>
                <a aria-label='Открыть вопрос'>
                    <div className='btn'>
                        <img src='/static/images/arrow.png' alt='стрелочка'/>
                    </div>
                </a>
            </Link>

            <style jsx>{`
            .faq-item {
                display: flex;
                flex-direction: column;
                margin: 0 15px 10px;
                background: #fff;
                padding: 33px 24px;
                height: 350px;
                box-shadow: 0 0 17px rgba(0, 0, 0, 0.16);
                justify-content: space-between;
            }
            .content {
                max-height: 240px;
                overflow: hidden;
            }
            .title {
                color: ${theme.colors.blue.darkest};
                font-size: 18px;
                font-weight: 700;
                line-height: 22px;
            }
            
            .underline {
                width: 76px;
                height: 2px;
                background: ${theme.colors.orange};
                margin: 10px 0;
            }
            
            .text {
                color: ${theme.colors.grey.darkest};
                font-size: 16px;
                font-weight: 300;
                line-height: 20px;
            }
            
            .btn {
                width: 67px;
                height: 32px;
                background: ${theme.colors.orange};
                margin: 0 auto;
                margin-top: 20px;
                border-radius: 4px;
                position: relative;
                cursor: pointer;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            a:hover .btn, a:active .btn {
                background: ${theme.colors.orangeAccented};
            }
            @media screen and (max-width: ${theme.media.desktop}) {
                .faq-item {
                    height: 380px;
                }
            }
            @media screen and (max-width: 1100px) {
                .item-item {
                    height: 333px;
                }
            }
            @media screen and (max-width: ${theme.media.phone}) {
                .faq-item {
                    height: 400px;
                }
            }
            @media screen and (max-width: 630px) {
                .faq-item {
                    height: 300px;
                }
                .faq-item {
                    margin-bottom: 26px;
                }
            }
        `}</style>
        </div>
    );
};

export default FAQItem;
