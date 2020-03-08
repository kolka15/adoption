import React  from 'react';
import CustomSelect from './Select';

const SelectRange = ({ label, ageOptions,from, to, onSelectFrom, onSelectTo }) => {

    return (
        <div className='select-range'>
            <div className='label'>{label}</div>
            <div className='select-group'>
                <div className='select'>
                    <CustomSelect
                        label='от'
                        name='from'
                        value={ageOptions.filter(opt => opt.value === from)[0]}
                        options={ageOptions.filter(opt => opt.value < to)}
                        handleChange={onSelectFrom}
                        row
                    />
                </div>
                <div className='select'>
                    <CustomSelect
                        label='до'
                        name='to'
                        value={ageOptions.filter(opt => opt.value === to)[0]}
                        options={ageOptions.filter(opt => opt.value > from)}
                        handleChange={onSelectTo}
                        row
                    />
                </div>
            </div>

            <style jsx>{`
                .label {
                    margin-bottom: 7px;
                    color: #60678e;
                }
                .select-group {
                    display: flex;
                    justify-content: space-between;
                    widthL 100%;
                    max-width: 250px;
                    
                }
                .select {
                    width: 42%;
                }
            `}</style>
        </div>
    );
};

export default SelectRange;
