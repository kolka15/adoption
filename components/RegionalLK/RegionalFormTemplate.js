import React, {Fragment} from 'react';
import Input from '../../reusable/Input';
import theme from '../../utils/styles/theme';
import Checkbox from '../../reusable/Checkbox';
import ButtonTransparent from '../../reusable/ButtonTransparent';


const RegionalFormTemplate = ({
    formSection,
    handleChangeAddressCheck,
    disabled,
    handleChangeField,
    handleAddSpecialist,
    setValue,
    i,
    region,
    fetching,
    regionalFormDataState,
    handleSpecialistFieldChange
}) => {

    const renderSpecialists = () => {



        return (

            regionalFormDataState &&
            regionalFormDataState.sections[2].specialists.map((specialistRow, i) => (
                <Fragment key={i}>

                    <div className='field-row field-row_md'>
                        <Input
                            label={'ФИО'}
                            name={'fio'}
                            value={specialistRow && specialistRow.fio ? specialistRow.fio : ''}
                            disabled={disabled}
                            handleChange={e => handleSpecialistFieldChange(e, i, 'fio')}
                        />
                    </div>
                    <div className='field-row field-row_sm'>
                        <Input
                            label={'Телефон'}
                            name={'phone'}
                            value={specialistRow && specialistRow.phone ? specialistRow.phone : ''}
                            disabled={disabled}
                            handleChange={e => handleSpecialistFieldChange(e, i, 'phone')}
                        />
                    </div>

                </Fragment>
            ))

        );
    };

    return (

        <div className='outer-wrapper'>
            <Fragment>
                <h3 className='section-title'>
                    {formSection.title.replace('...', `(${region.title})`)}
                </h3>

                <div className='wrapper'>
                    {
                        formSection && !formSection.specialists ?
                            formSection.fields.map((field, n) => {

                                const {type, label, name, checkLabel, checked, id} = field;

                                if (type === 'xl' || type === 'md' || type === 'sm' || type === 'lg') {
                                    return (
                                        <div className={`field-row field-row_${type}`} key={`${n}${name}`}>
                                            <Input
                                                label={label}
                                                name={name}
                                                value={setValue(name, i)}
                                                disabled={disabled}
                                                handleChange={e => handleChangeField(e, i, name)}
                                            />
                                        </div>
                                    );
                                }
                                if (type === 'address') {
                                    return (
                                        <div className={`field-row field-row_${type}`} key={`${n}${name}`}>
                                            <Input
                                                label={label}
                                                name={name}
                                                value={setValue(name, i)}
                                                disabled={disabled || checked}
                                                handleChange={e => handleChangeField(e, i, name)}

                                            />
                                            <div className='checkbox-wrapper'>
                                                <Checkbox
                                                    handleChange={e => handleChangeAddressCheck(e, i, n)}
                                                    id={id}
                                                    name={name}
                                                    label={checkLabel || 'Совпадает с указанным выше'}
                                                    disabled={disabled}
                                                    isChecked={checked}
                                                />
                                            </div>

                                        </div>
                                    );
                                }
                                /* if (type === 'addSpecialist') {
                                     return (
                                         <div className='add-specialist-row' key={`${n}${name}`}>
                                             <ButtonTransparent
                                                 text={name}
                                                 plus={true}
                                                 disabled={disabled}
                                                 handleClick={e => handleAddSpecialist(e, i, n)}
                                             />
                                         </div>
                                     );
                                 }*/

                                return false;
                            }) : (
                                <Fragment>
                                    {
                                        renderSpecialists()
                                    }
                                    <div className='add-specialist-row'>
                                        <ButtonTransparent
                                            text={'Добавить'}
                                            plus={true}
                                            disabled={disabled}
                                            handleClick={e => handleAddSpecialist()}
                                        />
                                    </div>

                                </Fragment>
                            )
                    }
                </div>
                {
                    fetching && <div className='loader'/>
                }
            </Fragment>
            <style jsx global>{`
                    .section-title {
                        color: ${formSection.isSubtitle ? theme.colors.lavender.darkest : theme.colors.blue.dark};
                        font-size: ${formSection.isSubtitle ? '18' : '20'}px;
                        font-weight: 700;
                        line-height: 24px;
                        margin-bottom: 40px;
                    }
                    .outer-wrapper {
                        margin-bottom: 70px;
                        position: relative;
                    }
                    .wrapper {
                        margin-bottom: 70px;
                        display: flex;
                        flex-wrap: wrap;
                        margin-right: -15px;
                        margin-left: -15px;
                    }
                    .field-row {
                        margin-bottom: 35px;
                        flex: 0 0 100%;
                        max-width: 100%;
                        padding-right: 15px;
                        padding-left: 15px;
                    }
                    .field-row_lg {
                        flex: 0 0 66.666666666%;
                        max-width: 66.666666666%;
                        margin-right: 10px;
                    }
                    .field-row_md {
                       flex: 0 0 66.666666666%;
                        max-width: 66.666666666%;
                    }
                    .field-row_sm {
                        flex: 0 0 33.33333%;
                        max-width: 33.33333%;
                    }
                    .field-row_address {
                        display: flex;
                        align-items: flex-end;
                    }
                    .checkbox-wrapper {
                        width: 200px;
                        margin-left: 20px;
                    }
                    .add-specialist-row {
                        padding-left: 15px;
                        margin-bottom: 40px;
                    }
                    .loader {
                        position: absolute;
                        background: rgba(255,255,255,.9);
                        width: 100%;
                        height: 100%;
                        top: 0;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        z-index: 9999;
                        animation: .2s screenIn forwards;
                   }
                   
                     @media screen and (max-width: ${theme.media.tabletS}) {
                        .field-row_address {
                            flex-wrap: wrap;
                        }
                       .checkbox-wrapper {
                            flex: 0 0 100%;
                            max-width: 100%;
                            margin-top: 10px;
                            margin-left: 0;
                       }
                    
                    }
                   
                   @media screen and (max-width: ${theme.media.phone}) {
                       .field-row_sm {
                            flex: 0 0 100%;
                            max-width: 100%;
                       }
                       .field-row_lg {
                            flex: 0 0 100%;
                            max-width: 100%;
                            margin-right: 0;
                       }
                        .field-row_md {
                            flex: 0 0 100%;
                            max-width: 100%;
                        }
                    }
                   
                   @keyframes screenIn {
                      0% {
                        opacity: 0;
                      }
                      100% {
                        opacity: 1;
                      }
                    }
        
                           
                    
                `}</style>
        </div>
    );
};

export default RegionalFormTemplate;
