import React from 'react';
import theme from '../utils/styles/theme';

const VideoLink = ({ videoUrl, row = false }) => {
    return (
        <div>
            <a className='action-item video' href={videoUrl} target='_blank' aria-label='Открыть видео'>
                <div className='video-outer btn'>
                    <div className='video-middle'>
                        <div className='video-inner'>
                            <div className="arrow-right"/>
                        </div>
                    </div>
                </div>
                <span className='text'>Видеоанкета</span>
            </a>

            <style jsx>{`
                .btn {
                    border-radius: 50%;
                    margin-bottom: 13px;
                    margin-right: ${row ? '15px' : '0'};
                }
                .action-item {
                    display: flex;
                    flex-direction: ${row ? 'row' : 'column'};
                    align-items: ${row ? 'baseline' : 'center'};
                }
                .video {
                    pointer-events: ${videoUrl ? 'auto' : 'none'};
                }
                .video-outer {
                    background: ${videoUrl ? theme.colors.video.plain.outer : theme.colors.video.disabled.outer};
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 88px;
                    height: 88px;
                }
                .video-middle {
                    border-radius: 50%;
                    background: ${videoUrl ? theme.colors.video.plain.middle : theme.colors.video.disabled.middle};
                    width: 62px;
                    height: 62px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .video-inner {
                    border-radius: 50%;
                    background: ${videoUrl ? theme.colors.video.plain.inner : theme.colors.video.disabled.inner};
                    width: 40px;
                    height: 40px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding-left: 5px;
                }
                .arrow-right {
                    width: 0; 
                    height: 0; 
                    border-top: 8px solid transparent;
                    border-bottom: 8px solid transparent;
                    border-left: 12px solid #fff;
                }
                .video:hover .video-outer,
                .video:active .video-outer {
                    background: ${theme.colors.video.active.outer};
                }
                .video:hover .video-middle,
                .video:active .video-middle {
                    background: ${theme.colors.video.active.middle};
                }
                .video:hover .video-inner,
                .video:active .video-inner {
                    background: ${theme.colors.video.active.inner};
                }
                .text {
                    font-size: 18px;
                    color: ${theme.colors.grey.dark};
                    text-decoration: underline;
                    line-height: ${theme.lineHeight.h3};
                }
                @media screen and (max-width: ${theme.media.phoneS}) {
                    .video-outer {
                        width: 75px;
                        height: 75px;
                    }
                    .video-middle {
                        width: 52px;
                        height: 52px;
                    }
                    .video-inner {
                        width: 34px;
                        height: 34px;
                    }
                    .btn {
                        margin-bottom: 9px;
                    }
                }
            `}</style>
        </div>
    );
};

export default VideoLink;
