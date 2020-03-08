import React from 'react';
import Slider from 'rc-slider';

const Range = Slider.Range;

import theme from '../utils/styles/theme';
// import '../static/css/rangeInput.css';

const RangeInput = ({ start, end, min, max, marks, onUpdate, measure, label }) => {

    return (
        <div>
            <label>
                <span className='label'>{label}</span>
                <div className='info'>
                    от <span className='number'>{start}</span> до <span className='number'>{end}</span> {measure}
                </div>
                <div className='range'>
                    <Range
                        min={min}
                        max={max}
                        marks={marks}
                        step={1}
                        value={[start, end]}
                        onChange={onUpdate}
                    />
                </div>
            </label>

            <style jsx>{`
            .label {
                display: inline-block;
                color: ${theme.colors.lavender.plain};
            }
            .info {
                text-align: center;
                margin: 0 0 1.5rem;
                font-size: 23px;
                line-height: 28.16px;
                margin-bottom: 4rem;
            }
            .number {
                color: ${theme.colors.blue.header};
                font-size: 26px;
            }
        `}</style>
        </div>
    );
};

export default RangeInput;
