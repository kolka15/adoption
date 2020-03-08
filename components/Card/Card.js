import React from 'react';

import Link from 'next/link';
import VideoLink from '../../reusable/VideoLink';

import server from '../../utils/config';
import theme from '../../utils/styles/theme';

import cutText from '../../utils/cutText';
import {formatBirthdayDate} from '../../utils/formatDates';

const Card = ({name, region, gender, character, video_link, photo_path, id, birthday}) => {
    
    let charAmount = 380;
    if (process.browser) {
        if (window.innerWidth < 1100 && window.innerWidth > 780) {
            charAmount = 220;
        } else if (window.innerWidth < 781 && window.innerWidth > 530) {
            charAmount = 180;
        } else if (window.innerWidth < 531) {
            charAmount = 115;
            // } else if (window.innerWidth < 451 && window.innerWidth > 350) {
            //     charAmount = 150;
            // } else if (window.innerWidth < 351) {
            //     charAmount = 100;
        }
    }
    
    return (
        <div className='card' id={id}>
            <div className='info'>
                {
                    name ?
                        <h3 className='name'>{name}</h3> : ''
                }
                
                {
                    region && region.title ?
                        <span className='region'>{region.title}</span> : null
                }
                
                <span className='age'>Дата
                    рождения: {formatBirthdayDate(birthday)}, {gender.title.charAt(0).toLowerCase() + gender.title.slice(1)}</span>
                <div className='detail'>{cutText(character, charAmount)}</div>
            </div>
            <div className='photo'>
                <div className='image'/>
            </div>
            <div className='action'>
                <VideoLink videoUrl={video_link}/>
                <Link href="/children/[id]" as={`/children/${id}`}>
                    <a className='action-item meet' aria-label='Открыть анкету'>
                        <div className='meet-btn btn'>
                            <div className='meet-img'/>
                        </div>
                        <span className='text'>Познакомиться</span>
                    </a>
                </Link>
            </div>
            
            <style jsx>{`
                .card {
                    box-shadow: 0 0 24px rgba(0, 0, 0, 0.16);
                    width: 100%;
                    color: ${theme.colors.grey.dark};
                    margin-bottom: 29px;
                    display: flex;
                    justify-content: space-between;
                    height: 355px;
                }
                .info {
                    padding: 2.4rem 2.1rem;
                    display: flex;
                    flex-direction: column;
                    width: 45%;
                }
                .photo {
                    padding: .94rem;
                    width: 45%;
                    height: 100%;
                }
                .action {
                    padding: 1.8rem 2.8rem 1.8rem 1.8rem;
                }
                h3 {
                    margin: 0;
                    font-size: ${theme.fontSize.h4};
                    line-height: ${theme.lineHeight.h3};
                    margin: 0 0 13px;
                }
                span {
                    font-size: 18px;
                    line-height: 20px;
                }
                .age {
                    color: ${theme.colors.blue.dark};
                    margin: 10px 0 22px;
                }
                .image {
                    max-width: 422px;
                    height: 100%;
                    background: url('${server}/${photo_path}') no-repeat;
                    background-position: center;
                    background-size: contain;
                }
                .action {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: space-between;
                }
                .btn {
                    border-radius: 50%;
                    margin-bottom: 13px;
                }
                .text {
                    font-size: 18px;
                    color: ${theme.colors.grey.dark};
                    text-decoration: underline;
                    line-height: ${theme.lineHeight.h3};
                }
                .detail {
                    line-height: 20px;
                }
                .action-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .meet-btn {
                    border: 2px solid ${theme.colors.meet};
                    width: 79px;
                    height: 79px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .meet-img {
                    background-image: url('/static/images/hands.png');
                    background-repeat: no-repeat;
                    background-position: center;
                    background-size: cover;
                    width: 44px;
                    height: 44px;
                }
                .meet:hover .meet-btn,
                .meet:active .meet-btn {
                    background-color: ${theme.colors.meet};
                }
                .meet:hover .meet-img,
                .meet:active .meet-img {
                    background-image: url('/static/images/hands_inverse.svg');
                }
                @media screen and (max-width: ${theme.media.tabletS}) {
                    .card {
                        padding: 30px;
                    }
                    .info {
                        padding: 0;
                    }
                    .photo {
                        padding: 0;
                    }
                    .action {
                        padding: 0;
                    }
                }
                @media screen and (max-width: 740px) {
                    .card {
                        flex-wrap: wrap;
                        height: auto;
                    }
                    .photo {
                        padding: 0;
                        order: 1;
                        height: 325px;
                        margin-bottom: 17px;
                        width: 70%;
                    }
                    .action {
                        padding: 0;
                        order: 2;
                        justify-content: flex-start;
                        width: 30%;
                    }
                    .image {
                        background-size: contain;
                    }
                    .info {
                        order: 3;
                        margin-top: 20px;
                        width: 100%;
                    }
                    .action-item {
                        margin-top: 25px;
                    }
                }
                @media screen and (max-width: 500px) {
                    .card {
                        padding: 17px 13px;
                    }
                    .info, .photo, .action {
                        width: 100%;
                    }
                    .photo {
                        padding: 0;
                        order: 1;
                        height: 400px;
                        margin-bottom: 17px;
                    }
                    .action {
                        padding: 0;
                        order: 2;
                        flex-direction: row;
                        justify-content: space-between;
                    }
                    .info {
                        order: 3;
                        margin-top: 20px;
                    }
                    .card {
                        flex-direction: column;
                    }
                    .meet-btn {
                        width: 73px;
                        height: 73px;
                    }
                    .meet-img {
                        width: 40px;
                        height: 40px;
                    }
                    .text {
                        font-size: 16px;
                    }
                    .action-item {
                        margin-top: 0;
                    }
                    .image {
                        background-size: contain;
                    }
                }
            `}</style>
        </div>
    );
};

export default Card;
