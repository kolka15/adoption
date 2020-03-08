import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import { createStructuredSelector } from 'reselect';

import { fetchChildrenStart, setChildrenQuery } from '../../redux/children/children.actions';
import { selectRegionOptions } from '../../redux/regions/regions.selectors';
import { selectCustodyOptions } from '../../redux/custody/custody.selectors';
import { selectChildrenQuery } from '../../redux/children/children.selectors';
import { selectGenderOptions } from '../../redux/gender/gender.selectors';
import { selectEyesOptions } from '../../redux/eyes/eyes.selectors';
import { selectHairOptions } from '../../redux/hair/hair.selectors';

import CustomSelect from '../../reusable/Select';
import RadioGroup from '../../reusable/RadioGroup';
import RangeInput from '../../reusable/RangeInput';
import SelectRange from '../../reusable/SelectRange';
import Button from '../../reusable/Button';
import Input from '../../reusable/Input';

import useRange from '../../hooks/useRange';

import { selectGroup, siblingOptions, rangeMarks, ageOptions } from './data';
import theme from '../../utils/styles/theme';
import parseQuery from '../../utils/parseQuery';

const SearchForm = ({ regionOptions, custodyOptions, genderOptions, eyesOptions, hairOptions, fetchChildrenStart, setChildrenQuery, query }) => {
    const { start, end, onRangeUpdate, onSelectFrom, onSelectTo } = useRange({ start: 0, end: 17 });
    const [ gender, setGender ] = useState( -1 );
    const [ name, setName ] = useState('');
    const [ select, setSelect ] = useState({
        region: null,
        adoption: { value: -1, label: 'не имеет значения' },
        siblings: siblingOptions[0],
        eyes: { value: -1, label: 'не имеет значения' },
        hair: { value: -1, label: 'не имеет значения' }
    });

    const updateRegionFilter = (regionsId) => {
        const regionsArr = regionsId.split(',');
        const regionsSelected = [];
        regionsArr.forEach(regionId => {
            regionsSelected.push(...regionOptions.filter(option => option.value == regionId));
        });
        return regionsSelected;
    };

    const updateFilters = (query) => {
        const { regionId = '', genderId = -1, ageFrom = 0, ageTo = 17, custodyFormId = -1, eyeId = -1, hairId = -1, isSibling = -1, name = '' } = query;
        onRangeUpdate([parseInt(ageFrom, 10), parseInt(ageTo, 10)]);
        const genderOption = genderOptions && genderOptions.filter(option => option.value == genderId)[0];
        const adoption = custodyOptions && custodyOptions.filter(option => option.value == custodyFormId)[0] ;
        const eyes = eyesOptions && eyesOptions.filter(option => option.value == eyeId)[0];
        const hair = hairOptions && hairOptions.filter(option => option.value == hairId)[0];
        const siblings = siblingOptions && siblingOptions.filter(option => option.value.toString() === isSibling.toString())[0];
        const region = updateRegionFilter(regionId);
        setGender((genderOption && genderOption.value) ? genderOption.value : -1);
        setSelect({ ...select, adoption, siblings, region, eyes, hair });
        setName(name);
    };

    useEffect(() => {
        (() => {
            // console.log(query);
            // console.log(Router.query);
            if (Object.keys(Router.query).length > 0) {
                updateFilters(Router.query);
            } else if (query) {
                const queryObj = parseQuery(query);
                updateFilters(queryObj);
            }

        })();
    }, []);

    const options = [
        custodyOptions,
        siblingOptions,
        eyesOptions,
        hairOptions
    ];

    const onSelectChange = (selectedOption, name) => {
        setSelect({ ...select, [name]: selectedOption});
    };

    const onRadioUpdate = (value) => {
        setGender(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { region, adoption, siblings, eyes, hair } = select;
        let regionId = '';
        if (region && region.length) {
            regionId = 'regionId=';
            region.forEach(item => regionId += item.value + ',');
            regionId =regionId.slice(0, regionId.length - 1);
            regionId += '&';
        }
        const eyeId = `${(eyes && eyes.value != -1) ? `eyeId=${eyes.value}&` : ''}`;
        const hairId = `${(hair && hair.value != -1) ? `hairId=${hair.value}&` : ''}`;
        const genderId = `${gender != -1 ? `genderId=${gender}&` : ''}`;
        const custodyFormId = `${(adoption && adoption.value !== -1) ? `custodyFormId=${adoption.value}&` : ''}`;
        const isSibling = `${(siblings && siblings.value != -1) ? `isSibling=${siblings.value}&` : ''}`;
        const ageFrom = `ageFrom=${start}&`;
        const ageTo = `ageTo=${end}&`;
        const nameStr = `name=${name}&`;
        const query = `?${regionId}${eyeId}${hairId}${genderId}${custodyFormId}${isSibling}${ageFrom}${ageTo}${nameStr}`;
        // console.log(3333333333, query);
        setChildrenQuery(query);
        fetchChildrenStart(encodeURI(query));
    };
    
    return (
        <div className='filter'>
            <form onSubmit={(e) => handleSubmit(e)}>
                <CustomSelect
                    options={regionOptions}
                    handleChange={onSelectChange}
                    value={select.region}
                    name='region'
                    label='Регион'
                    isMulti
                />

                <RadioGroup
                    label='Пол'
                    options={genderOptions}
                    selectedValue={gender}
                    onUpdate={onRadioUpdate}
                    name='gender'
                    margin={'3rem 0 2.2rem'}
                />

                <div className='Input-Wrapper'>
                    <Input
                        type='text'
                        value={name}
                        name='name'
                        label='Имя'
                        handleChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className='range-input'>
                    <RangeInput
                        start={start}
                        end={end}
                        min={0}
                        max={17}
                        label='Возраст'
                        measure='лет'
                        marks={rangeMarks}
                        onUpdate={onRangeUpdate}
                    />
                </div>

                <div className='select-range'>
                    <SelectRange
                        label='Возраст'
                        ageOptions={ageOptions}
                        from={start}
                        to={end}
                        onSelectFrom={onSelectFrom}
                        onSelectTo={onSelectTo}
                    />
                </div>

                <div className='select-group'>
                    {
                        selectGroup.map((item, i) =>
                            <div className='select' key={i}>
                                <CustomSelect
                                    options={options[i]}
                                    handleChange={onSelectChange}
                                    value={select[item.name]}
                                    name={item.name}
                                    label={item.label}
                                />
                            </div>
                        )
                    }
                </div>

                <div className='btn'>
                    <Button
                        type='submit'
                        text='Искать'
                    />
                </div>
            </form>

            <style jsx>{`
                .filter {
                    padding: 37px 35px;
                    background: #f1f5fe;
                }
                .select-group {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                    margin: 3rem 0 0;
                }
                .select {
                    width: 50%;
                    max-width: 500px;
                    margin-bottom: 3rem;
                }
                .btn {
                    text-align: center;
                    margin-top: .5rem;
                }
                .select-range {
                    display: none;
                }
                .no-dates {
                    position: absolute;
                    bottom: 0;
                    color: #000;
                }
                .Input-Wrapper {
                    margin-bottom: 3rem;
                    max-width: 400px;
                } 
                @media screen and (max-width: ${theme.media.desktop}) {
                    .select {
                        max-width: 49%;
                    }
                }
                @media screen and (max-width: ${theme.media.tabletS}) {
                    .filter {
                        padding: 19px 17px;
                    }
                    .select {
                        width: 100%;
                        margin-bottom: 2rem;
                        max-width: 520px;
                    }
                    .radio-group {
                        margin: 2rem 0;
                    }
                    .range-input {
                        display: none;
                    }
                    .select-range {
                        display: block;
                    }
                }
            `}</style>
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    regionOptions: selectRegionOptions,
    custodyOptions: selectCustodyOptions,
    genderOptions: selectGenderOptions,
    eyesOptions: selectEyesOptions,
    hairOptions: selectHairOptions,
    query: selectChildrenQuery
});

const mapDispatchToProps = (dispatch) => ({
    fetchChildrenStart: (query) => dispatch(fetchChildrenStart(query)),
    setChildrenQuery: (query) => dispatch(setChildrenQuery(query))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);
