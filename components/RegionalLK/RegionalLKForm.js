import React, {useState, useEffect} from 'react';
import {regionalLKFormView, regionalLocalLKFormView} from './formFields';
import RegionalFormTemplate from './RegionalFormTemplate';
import {connect} from 'react-redux';
import Button from '../../reusable/Button';
import {
    switchLkRegionEditForm,
    editMunicipalityStart,
    createMunicipalityStart
} from '../../redux/lk-regional/lk-regional.actions';
import {createStructuredSelector} from 'reselect';
import {
    selectEditForm, selectMunicipalData, selectIsFetching, selectSelectedMunicipality, selectMunicipalities
} from '../../redux/lk-regional/lk-regional.selectors';
import {selectToken} from '../../redux/login/login.selectors';
import {selectUserData} from '../../redux/login/login.selectors';
import GuardianshipSelect from '../MunicipalityAddAndSelectRow/MunicipalityAddAndSelectRow';
import theme from '../../utils/styles/theme';
import Modal from '../../reusable/Modal';
import Input from '../../reusable/Input';


const RegionalLKForm = ({
    editForm,
    switchLkRegionEditForm,
    selectMunicipalData,
    editMunicipality,
    token,
    userData: {region},
    fetching,
    selectedMunicipality,
    createMunicipalityStart,
    selectMunicipalities
}) => {

    const [regionalFormDataState, setRegionalLKFormDataState] = useState(null);
    const [regionalLKFormViewState, setRegionalLKFormViewState] = useState(null);
    const [modalIsVisible, setModalVisibility] = useState(false);
    const [nameEditBtnVisible, setNameEditBtnVisibility] = useState(false);
    const [municipalityName, setMunicipalityName] = useState('');
    const [municipalityNameError, setMunicipalityNameError] = useState(false);

    const handleChangeAddressCheck = (e, i, n) => {
        let checked = e.target.checked;
        const tempState = JSON.parse(JSON.stringify(regionalFormDataState));

        const tempView = tempState && tempState.address ? [...regionalLocalLKFormView] : [...regionalLKFormView];
        const currentSection = tempState.sections[i];

        tempView[i].fields[n].checked = checked;

        if (checked) {
            if (i === 0) {
                currentSection.address_2 = currentSection.address_1;
            } else {
                currentSection.address_2 = tempState.sections[0].address_2;
            }
        }
        setRegionalLKFormDataState(tempState);
        setRegionalLKFormViewState(tempView);
    };

    const handleChangeField = (e, i, name) => {
        const value = e.target.value;
        const tempState = JSON.parse(JSON.stringify(regionalFormDataState));
        let formView = null;

        if (tempState && tempState.address) {
            formView = regionalLocalLKFormView;
        } else {
            formView = regionalLKFormView;
        }

        tempState.sections[i][name] = value;

        setRegionalLKFormDataState(tempState);
        setRegionalLKFormViewState(formView);
    };

    const specialistItem = {
        fio: '',
        phone: ''
    };

    const handleAddSpecialist = () => {
        const tempState = JSON.parse(JSON.stringify(regionalFormDataState));

        tempState.sections[2].specialists.push(specialistItem);
        setRegionalLKFormDataState(tempState);
    };

    const handleSpecialistFieldChange = (e, i, name) => {
        const value = e.target.value;
        const tempState = JSON.parse(JSON.stringify(regionalFormDataState));

        tempState.sections[2].specialists[i][name] = value;
        setRegionalLKFormDataState(tempState);
    };

    const setValue = (name, i) => {
        if (regionalFormDataState) {
            if (regionalFormDataState.sections[i]) {
                return regionalFormDataState.sections[i][name]
                    ? regionalFormDataState.sections[i][name]
                    : '';
            }
            return '';
        }
        return '';
    };

    const onSwitchLkRegionEditForm = () => {
        if (editForm) {
            editMunicipality({token, regionalFormDataState});
            switchLkRegionEditForm(!editForm);
        } else {
            switchLkRegionEditForm(!editForm);
        }
    };

    const onClickChangeName = () => {
        setModalVisibility(true);
    };

    const onChangeMunicipalityName = name => {
        setMunicipalityName(name);
        setMunicipalityNameError(false);
    };

    const onEditMunicipalityName = () => {
        if (municipalityName.length < 1) {
            setMunicipalityNameError(true);
            return false;
        }

        editMunicipality({token, regionalFormDataState: {...regionalFormDataState, address: municipalityName}});
        setModalVisibility(false);

    };

    useEffect(() => {

        const regionalLevel = selectMunicipalities.length &&
            selectMunicipalities.some(el => !el.address);

        if (!regionalLevel) {
            const newMunicipality = {address: '', level_code: 'region'};
            createMunicipalityStart({newMunicipality, token});
        }

    }, []);

    useEffect(() => {
        if (selectedMunicipality && selectedMunicipality.label !== 'Региональный уровень' && selectedMunicipality.label !== '') {
            setMunicipalityName(selectedMunicipality ? selectedMunicipality.label : '');
            setNameEditBtnVisibility(true);
        } else {
            setNameEditBtnVisibility(false);
        }
    }, [selectedMunicipality]);

    useEffect(() => {
        const tempState = selectMunicipalData[0];
        let numberOfSections = null;
        let formView = null;

        if (tempState && tempState.address) {
            formView = regionalLocalLKFormView;
            numberOfSections = regionalLocalLKFormView.length;
        } else {
            formView = regionalLKFormView;
            numberOfSections = regionalLKFormView.length;
        }

        if (tempState && tempState.sections) {
            for (let n = 0; n < numberOfSections; n += 1) {
                if (tempState && !tempState.sections || !tempState.sections.length || !tempState.sections[n]) {
                    tempState.sections.push({});
                }
                tempState.sections[n].title = formView[n].title.replace('...', `(${region.title})`);

                if (!tempState.sections[n].sort)
                    tempState.sections[n].sort = n;

                if (n === 2 && !tempState.sections[n].specialists) {
                    tempState.sections[n].specialists = [];
                }
                if (n === 2 && !tempState.sections[n].specialists.length) {
                    tempState.sections[n].specialists.push(specialistItem);
                }

            }
        }

        if (tempState) {
            setRegionalLKFormDataState(tempState);
            setRegionalLKFormViewState(formView);
        }

    }, [selectMunicipalData]);

    return (
        <div>
            <h2 className='lk-subtitle'>
                {region.title}
                {
                    selectedMunicipality && (selectedMunicipality.label !== 'Региональный уровень') &&
                    `, ${selectedMunicipality.label}`
                }

            </h2>

            <GuardianshipSelect/>

            <div className='upper-btn-row'>
                <div className='btn-wrapper'>
                    <Button
                        handleClick={onSwitchLkRegionEditForm}
                        text={editForm ? 'Сохранить' : 'Редактировать'}
                    />
                </div>
                {
                    nameEditBtnVisible &&
                    <div className='btn-wrapper'>
                        <Button
                            handleClick={onClickChangeName}
                            text={'Редактировать название'}
                        />
                    </div>
                }
            </div>

            {
                regionalLKFormViewState &&
                regionalLKFormViewState.map((formSection, i) => (
                    <RegionalFormTemplate
                        key={i}
                        i={i}
                        setValue={setValue}
                        formSection={formSection}
                        regionalFormDataState={regionalFormDataState}
                        handleChangeAddressCheck={handleChangeAddressCheck}
                        disabled={!editForm}
                        region={region}
                        handleChangeField={handleChangeField}
                        fetching={fetching}
                        handleAddSpecialist={handleAddSpecialist}
                        handleSpecialistFieldChange={handleSpecialistFieldChange}
                    />
                ))
            }

            <div className='lower-btn-row'>
                <Button
                    handleClick={onSwitchLkRegionEditForm}
                    text={editForm ? 'Сохранить' : 'Редактировать'}
                />
            </div>
            {
                modalIsVisible &&
                <Modal
                    setModalVisibility={setModalVisibility}
                >
                    <div className='add-item-content-wrapper'>
                        <h4 className='add-item-title'>Редактирование ООиП</h4>

                        <div className='add-item-row'>
                            <Input
                                handleChange={e => onChangeMunicipalityName(e.target.value)}
                                name='name'
                                label='Наименование'
                                value={municipalityName || ''}
                            />
                        </div>
                        <div className='add-item-row add-item-row_text-center'>
                            {
                                municipalityNameError &&
                                <span className='validation-error'>Необходимо заполнить поле</span>

                            }
                            <Button
                                handleClick={onEditMunicipalityName}
                                text='Сохранить'
                            />
                        </div>
                    </div>
                </Modal>
            }
            <style jsx global>{`
                .lower-btn-row {
                        text-align: center;
                        margin-bottom: 100px;
                    }
                .upper-btn-row {
                    margin-bottom: 40px;
                    text-align: center;
                    display:flex;
                    justify-content:center;
                }
                .btn-wrapper {
                  margin-left: 10px;
                  margin-right: 10px;
                }
                .lk-subtitle {
                    color: ${theme.colors.lavender.darkest};
                    font-size: ${theme.fontSize.h4};
                    font-weight: 700;
                    line-height: 36px;
                    text-transform: uppercase;
                }
                .section-title {
                    color: ${theme.colors.blue.dark};
                    font-size: 20px;
                    font-weight: 700;
                    line-height: 24px;
                    margin-bottom: 40px;
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
                    left: 50%;
                    transform: translateX(-50%);
                    bottom: 100%;
                }
                
                @media screen and (max-width: ${theme.media.phone}) {
                    .add-item-content-wrapper {
                        padding-left: 5%;       
                        padding-right: 5%;       
                    }
                }
            `}</style>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    switchLkRegionEditForm: toggle => dispatch(switchLkRegionEditForm(toggle)),
    editMunicipality: data => dispatch(editMunicipalityStart(data)),
    createMunicipalityStart: data => dispatch(createMunicipalityStart(data)),
});

const mapStateToProps = createStructuredSelector({
    editForm: selectEditForm,
    selectMunicipalData: selectMunicipalData,
    token: selectToken,
    userData: selectUserData,
    fetching: selectIsFetching,
    selectedMunicipality: selectSelectedMunicipality,
    selectMunicipalities: selectMunicipalities,
});

export default connect(mapStateToProps, mapDispatchToProps)(RegionalLKForm);
