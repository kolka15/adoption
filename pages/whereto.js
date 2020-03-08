import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import Head from 'next/head';

import theme from '../utils/styles/theme';

import Layout from '../components/Layout/Layout';
import Breadcrumbs from '../reusable/Breadcrumbs';
import Title from '../reusable/Title';
import CustomSelect from '../reusable/Select';
import RegionBlock from '../components/RegionBlock/RegionBlock';

import {useDispatch, useSelector} from 'react-redux';
import { fetchRegionsStart, setRegion } from '../redux/regions/regions.actions';
import {fetchMunicipalitiesStart, fetchMunicipalityOptionsStart} from '../redux/municipality/municipality.actions';
import { selectRegionOptions } from '../redux/regions/regions.selectors';
import { selectMunicipalityOptions } from '../redux/municipality/municipality.selectors';

const WhereTo = () => {
    const pageName = 'Куда обратиться усыновителю';
    const {region} = useSelector(state => state.regions);
    const regionOptions = useSelector(selectRegionOptions);
    const municipalityOptions = useSelector(selectMunicipalityOptions);
    const {municipalities} = useSelector(state => state.municipality);
    const dispatch = useDispatch();

    const [ select, setSelect ] = useState({
        region: region,
        town: municipalityOptions ? municipalityOptions[0] : null
    });

    // console.log(select.region)
    // console.log(region)
    // console.log(select.town)

    useEffect(() => {
        // console.log(Router.router.query.regionId);
        if (regionOptions && Router.router.query.regionId) {
            const activeOption = regionOptions.filter(opt => opt.value == Router.router.query.regionId)[0];
            onSelectChange(activeOption, 'region');
        } else {
            dispatch(setRegion(null));
        }
    }, []);

    useEffect(() => {
        if (region) {
            dispatch(fetchMunicipalityOptionsStart(region.value));
            return;
        }
        setSelect({ ...select, region: null });
    }, [region]);

    useEffect(() => {
        if (!municipalityOptions) return;
        dispatch(fetchMunicipalitiesStart(municipalityOptions[0].value));
        if (!Router.router.query.regionId || (select.region && select.region.value)) return;
        const activeOption = regionOptions.filter(opt => opt.value == Router.router.query.regionId)[0];
        setSelect({region: activeOption, town: municipalityOptions[0]});
    }, [municipalityOptions && municipalityOptions.length]);


    const onSelectChange = (selectedOption, name) => {
        setSelect({ town: municipalityOptions ? municipalityOptions[0] : null, [name]: selectedOption});
        dispatch(setRegion(selectedOption));
    };

    const onMunicipalitySelect = (selectedOption) => {
        setSelect({ ...select, town: selectedOption});
        dispatch(fetchMunicipalitiesStart(selectedOption.value));
    };

    return (
        <Layout>
            <Head>
                <title>{pageName}</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                    key="viewport"
                />
            </Head>
            <section className='content'>
                <Breadcrumbs pageName={pageName} pageAddress='whereto' />
                <Title title={pageName} />

                <section className='general'>
                    <div className='top'>
                        <img src='/static/images/meeting.png' alt='встреча' className='general__img'/>
                        <div className='general__filter'>
                            <CustomSelect
                                options={regionOptions}
                                handleChange={onSelectChange}
                                value={select.region}
                                name='region'
                                label='Регион'
                            />
                            <CustomSelect
                                options={municipalityOptions}
                                handleChange={onMunicipalitySelect}
                                // value={select.town}
                                value={select.region ? select.town : null}
                                name='town'
                                label='Населенный пункт'
                                // isDisabled={!municipalityOptions}
                                isDisabled={!municipalityOptions || !select.region}
                            />
                        </div>
                    </div>

                    <section className='result'>
                        {
                            // municipalities && municipalities.sections.length > 0 && municipalities.sections.map((el, i) => (
                            select.region && select.town && municipalities && municipalities.sections.length > 0 && municipalities.sections.map((el, i) => (
                                <div key={i} className='result-item'>
                                    { i !== 0 && <hr/> }
                                    <RegionBlock {...el}/>
                                </div>
                            ))
                        }
                    </section>
                </section>

            </section>

            <style jsx>{`
                    .content {}
                    .general {
                        display: flex;
                        margin-top: 5rem;
                        flex-wrap: wrap;
                    }
                    .general__img {
                        margin-right: 4.5rem;
                    }
                    .general__filter {
                        width: 100%;
                        max-width: 560px;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-evenly;
                    }
                    .result {
                        margin: 5rem 0 8rem;
                        width: 100%;
                        max-width: 800px;
                    }
                    .Result-Item {
                        margin-bottom: 50px;
                    }
                    hr {
                        background-color: #d3d3d3;
                        opacity: .5;
                        margin: 4.4rem 0 3.9rem;
                    }
                    .top {
                        width: 100%;
                        display: flex;
                    }
                    @media screen and (max-width: 850px) {
                        .general__img {
                            margin-right: 32px;
                            width: 280px;
                        }
                        .result {
                            margin: 50px 0;
                        }
                        hr {
                            margin: 38px 0 42px;
                        }
                    }
                    @media screen and (max-width: ${theme.media.phoneS}) {
                        .top {
                            flex-direction: column;
                        }
                        .general__img {
                            margin-right: 0;
                            margin-bottom: 30px;
                            max-width: 316px;
                        }
                        .result {
                            margin: 10px 0 50px;
                        }
                        hr {
                            margin: 38px 0 42px;
                        }
                    }
                `}</style>
        </Layout>
    );
};

WhereTo.getInitialProps = async ({ ctx: { store, query } }) => {
    if (!store.getState().regions.regionOptions) {
        store.dispatch(fetchRegionsStart());
    }
    // if (store.getState().regions.regionOptions && query.regionId) {
    //     const activeOption = store.getState().regions.regionOptions.filter(opt => opt.value == query.regionId);
    //     store.dispatch(setRegion(activeOption));
    // }
};

export default WhereTo;
