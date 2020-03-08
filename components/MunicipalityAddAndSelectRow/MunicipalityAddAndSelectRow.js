import React, {useState, useEffect} from 'react';

import CustomSelect from '../../reusable/Select';
import Button from '../../reusable/Button';
import ButtonTransparent from '../../reusable/ButtonTransparent';
import Modal from '../../reusable/Modal';
import Input from '../../reusable/Input';
import {localityType} from './localityTypes';
import {
    createMunicipalityStart,
    fetchMunicipalDistrictStart,
    municipalitySelectConfirm,
    deleteMunicipalityStart,
} from '../../redux/lk-regional/lk-regional.actions';
import {createStructuredSelector} from 'reselect';
import {
    selectEditForm,
    selectMunicipalData,
    selectMunicipalDistrictOptions,
    selectSelectedMunicipality,
} from '../../redux/lk-regional/lk-regional.selectors';
import {selectToken} from '../../redux/login/login.selectors';
import {connect} from 'react-redux';
import theme from '../../utils/styles/theme';


const MunicipalityAddAndSelectRow = ({
    selectMunicipalDistrictOptions,
    createMunicipalityStart,
    token,
    municipalitySelectConfirm,
    fetchMunicipalDistrictStart,
    deleteMunicipalityStart,
    selectedMunicipality
}) => {

    const [select, setSelect] = useState({
        localityType: null,
        municipalDistrict: selectMunicipalDistrictOptions ? selectMunicipalDistrictOptions[0] : []
    });
    const [newMunicipality, setNewMunicipality] = useState({
        name: '',
        level_code: 'municipality'
    });
    const [validationError, setValidateError] = useState(false);

    const [modalIsVisible, setModalVisibility] = useState(false);

    const onSelectChange = (selectedOption, name) => {
        setSelect({...select, [name]: selectedOption});
    };
    const onSelectRegionTypeChange = (selectedOption, name) => {
        const tempSelect = select;
        const tempNewMunicipality = newMunicipality;

        if (selectedOption.value !== '0') {
            delete tempNewMunicipality['city'];
        } else {
            tempNewMunicipality.city = '';
        }

        setSelect({...select, localityType: selectedOption.value});
        setSelect({...tempSelect, [name]: selectedOption});
        setValidateError(false);
    };


    const handleInputChange = (name, val) => {

        setNewMunicipality({...newMunicipality, [name]: val});
        setValidateError(false);
    };

    const onCreateMunicipality = () => {

        const fieldsNotEmpty = Object.keys(newMunicipality).every(el => {
            return !!newMunicipality[el];
        });

        if (!fieldsNotEmpty || !select.localityType) {
            setValidateError(true);
            return false;
        }

        createMunicipalityStart({newMunicipality, token});
        setModalVisibility(false);
    };

    const onMunicipalitySelectConfirm = () => {
        const tempSelect = select;

        tempSelect.municipalDistrict.localityType = select.localityType;
        // setSelect({...select, municipalDistrict: {...select.municipalDistrict, localityType: 3}})
        municipalitySelectConfirm(tempSelect.municipalDistrict);
        fetchMunicipalDistrictStart(token);
    };

    const onDelete = (e, props) => {
        e.preventDefault();
        e.stopPropagation();
        if (window.confirm(`Хотите удалить ${props.data.label}?`)) {

            setSelect({...select, municipalDistrict: selectMunicipalDistrictOptions[0]});

            municipalitySelectConfirm(selectMunicipalDistrictOptions[0]);
            fetchMunicipalDistrictStart(token);

            deleteMunicipalityStart({props, token});
        }
    };

    useEffect(() => {
        if (selectedMunicipality) {
            setSelect({
                ...select,
                municipalDistrict: {label: selectedMunicipality.label ? selectedMunicipality.label : 'Региональный уровень', value: selectedMunicipality.value}
            });
        }
    }, [selectedMunicipality]);
    
    return (
        <div className='guardianship-select'>
            <div className='guardianship-select__row'>
                <div className='guardianship-select__select-wrapper'>
                    <CustomSelect
                        options={selectMunicipalDistrictOptions}
                        handleChange={onSelectChange}
                        value={select.municipalDistrict}
                        name='municipalDistrict'
                        label='Выберите орган опеки и попечительства'
                        defaultValue={selectMunicipalDistrictOptions ? selectMunicipalDistrictOptions[0] : {label: 'Региональный уровень'}}
                        deleteIcon={'×'}
                        onDelete={onDelete}
                    />
                </div>
                <Button
                    handleClick={() => onMunicipalitySelectConfirm(select.municipalDistrict)}
                    text='Выбрать'
                />
                <div className='add-municipality-btn'>
                    <ButtonTransparent
                        plus={true}
                        text='Добавить муниципальное образование'
                        handleClick={() => setModalVisibility(true)}
                    />
                </div>
                {
                    modalIsVisible &&
                    <Modal
                        setModalVisibility={setModalVisibility}
                    >
                        <div className='add-item-content-wrapper'>
                            <h4 className='add-item-title'>Добавление ООиП</h4>
                            <div className='add-item-row'>
                                <CustomSelect
                                    options={localityType}
                                    handleChange={onSelectRegionTypeChange}
                                    value={select.localityType}
                                    name='localityType'
                                    label='Тип населенного пункта'
                                />
                            </div>
                            <div className='add-item-row'>
                                <Input
                                    handleChange={e => handleInputChange(e.target.name, e.target.value)}
                                    name='name'
                                    label='Наименование'
                                    value={newMunicipality.name || ''}
                                />
                            </div>
                            {
                                select.localityType && select.localityType.value === '0' &&
                                <div className='add-item-row'>
                                    <Input
                                        handleChange={e => handleInputChange(e.target.name, e.target.value)}
                                        label='Наименование города'
                                        name='city'
                                        value={newMunicipality.city || ''}
                                    />
                                </div>
                            }

                            <div className='add-item-row add-item-row_text-center'>
                                {
                                    validationError &&
                                    <span className='validation-error'>Необходимо заполнить все поля</span>

                                }
                                <Button
                                    handleClick={onCreateMunicipality}
                                    text='Сохранить'
                                />
                            </div>
                        </div>
                    </Modal>
                }
            </div>

            <style jsx>{`
                .guardianship-select {
                    background-color: #f1f5fe;
                    color: #60678e;
                    font-size: 16px;
                    font-weight: 400;
                    line-height: 22px;
                    margin-bottom: 35px;
                    padding: 20px 20px 50px;
                }
                .guardianship-select__row {
                    display: flex;
                    align-items: flex-end;
                    flex-wrap: wrap;
                    justify-content: space-between;
                }
                .guardianship-select__select-wrapper {
                    flex-basis: 45%;
                }
                .add-item-content-wrapper {
                    padding: 20px 180px;
                    background: #fff;
                }
                .add-item-title {
                    color: #515971;
                    font-size: 30px;
                    font-weight: 400;
                    line-height: 30px;
                    text-align: center;
                    margin-bottom: 70px;
                }
                .add-item-row {
                    margin-bottom: 40px;
                    position: relative;
                }
                .add-item-row_text-center {
                    text-align: center;
                }
                .validation-error {
                    font-size: 14px;
                    color: red;
                    position: absolute;
                    color: red;
                    left: 50%;
                    transform: translateX(-50%);
                    bottom: 100%;
                }
                @media screen and (max-width: ${theme.media.desktop}) {
                    .guardianship-select__row {
                        flex-wrap: wrap;
                        justify-content: start;
                    }
                    .guardianship-select__select-wrapper {
                       flex: 0 1 70%;
                       margin-right: 20px;
                    }    
                    .add-municipality-btn {
                        flex: 0 0 100%;
                        margin-top: 20px;
                        
                    }  
                }
                
                @media screen and (max-width: ${theme.media.phone}) {
                    .add-item-content-wrapper {
                        padding-left: 5%;       
                        padding-right: 5%;       
                    }
                }
                @media screen and (max-width: ${theme.media.phoneS}) {
                   .guardianship-select__select-wrapper {
                        flex: 0 0 100%;
                        margin-bottom: 20px;
                   }
                }
            `}</style>
        </div>
    );
};


const mapDispatchToProps = (dispatch) => ({
    municipalitySelectConfirm: data => dispatch(municipalitySelectConfirm(data)),
    fetchMunicipalDistrictStart: data => dispatch(fetchMunicipalDistrictStart(data)),
    createMunicipalityStart: data => dispatch(createMunicipalityStart(data)),
    deleteMunicipalityStart: data => dispatch(deleteMunicipalityStart(data)),
});

const mapStateToProps = createStructuredSelector({
    editForm: selectEditForm,
    selectMunicipalData: selectMunicipalData,
    token: selectToken,
    selectMunicipalDistrictOptions: selectMunicipalDistrictOptions,
    selectedMunicipality: selectSelectedMunicipality
});

export default connect(mapStateToProps, mapDispatchToProps)(MunicipalityAddAndSelectRow);
