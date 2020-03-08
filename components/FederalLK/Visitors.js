import React, {useState, useEffect} from 'react';
import CustomSelect from '../../reusable/Select';
import Input from '../../reusable/Input';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectRegionOptions} from '../../redux/regions/regions.selectors';
import {
    selectAppointmentChosen,
    selectRooms,
    selectSpecialists,
    selectAppointmentSelectedId,
    selectAppointmentDatesRange,
    selectAppointmentAllDates,
} from '../../redux/appointments/appointments.selectors';
import {selectToken} from '../../redux/login/login.selectors';
import {deleteAppointmentStart, editAppointmentStart} from '../../redux/appointments/appointments.actions';
import theme from '../../utils/styles/theme';
import Button from '../../reusable/Button';
import Modal from '../../reusable/Modal';
import DatePicker, {registerLocale} from 'react-datepicker';

import ru from 'date-fns/locale/ru';
import format from 'date-fns/format';
import {formatTimeForApi, formatDateForApi} from '../../utils/formatDates';

registerLocale('ru', ru);

const Visitors = ({
    regions,
    appointmentChosen,
    specialists,
    rooms,
    appointmentSelectedId,
    deleteAppointmentStart,
    token,
    appointmentDatesRange,
    editAppointmentStart,
    appointmentAllDates,
}) => {

    const [data, setData] = useState({});
    const [validationErrors, toggleValidationErrors] = useState(false);
    const [changeDateModal, switchChangeDateModal] = useState(false);

    useEffect(() => {
        appointmentChosen.length ? setData({...appointmentChosen[0]}) : setData({});
    }, [appointmentSelectedId]);


    const onSpecialistChange = selectedOption => {
        setData({...data, specialist: {fio: selectedOption.label, id: selectedOption.value}});
    };

    const onCabinetChange = selectedOption => {
        setData({...data, room: {room_number: selectedOption.label, id: selectedOption.value}});
    };

    const onSelectChange = (val, name) => {
        setData({...data, [name]: val.value});
    };

    const onFieldChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        setData({...data, [name]: value});
    };

    const onRegionChange = selectedOptions => {
        let selected = selectedOptions ? selectedOptions.map(region => ({id: region.value})) : null;
        setData({...data, regions: selected});
    };

    const numberOptions = () => (
        [...Array(10).keys()].map((el, i) => ({value: i + 1, label: i + 1}))
    );

    const ageFromOptions = () => (
        [...Array(19).keys()].map((el, i) => ({
            value: i,
            label: i,
            isDisabled: data['desired_age_to'] && data['desired_age_to'] < i
        }))
    );

    const ageToOptions = () => (
        [...Array(19).keys()].map((el, i) => ({
            value: i,
            label: i,
            isDisabled: data['desired_age_from'] && data['desired_age_from'] > i
        }))
    );

    const selectedRegions = () => {
        const selected = [];
        data.regions && data.regions.forEach(id => {
            regions.forEach(region => {
                if (region.value === id.id) {
                    selected.push(region);
                }
            });
        });
        return selected;
    };

    const onDeleteAppointment = () => {
        if (window.confirm('Хотите удалить встречу?')) {
            deleteAppointmentStart({token, appointmentSelectedId, appointmentDatesRange});
        }
    };

    const onEditSave = () => {
        editAppointmentStart({token, appointmentSelectedId, appointmentDatesRange, data});
    };

    const desiredQuantityForSelect = (name) => {
        if (data[name])
            return {value: data[name], label: data[name]};
        return '';
    };


    const onRescheduleAppointment = () => {
        let validate = !!data.date.length && !!data.start_time.length;

        if (!validate) {
            toggleValidationErrors(true);
            return;
        }

        toggleValidationErrors(false);
        editAppointmentStart({token, appointmentSelectedId, appointmentDatesRange, data});
        switchChangeDateModal(false);
    };

    return (
        <div>

            <div className='visitors'>
                <h3 className='subtitle'>Посетители</h3>
                <div className='row'>
                    <CustomSelect
                        isMulti={true}
                        label='Регион'
                        name='regions'
                        options={regions}
                        value={selectedRegions() || null}
                        handleChange={onRegionChange}
                    />
                </div>
                <div className='row'>
                    <Input
                        label='Посетитель 1'
                        name='visitor_fio1'
                        handleChange={onFieldChange}
                        value={data['visitor_fio1'] || ''}
                    />
                </div>
                <div className='row'>
                    <Input
                        label='Посетитель 2'
                        name='visitor_fio2'
                        handleChange={onFieldChange}
                        value={data['visitor_fio2'] || ''}
                    />
                </div>
                <div className="row row_col">
                    <div className="col-6">
                        <Input
                            label='Телефон:'
                            name='phone'
                            handleChange={onFieldChange}
                            value={data.phone || ''}
                            type='tel'
                        />
                    </div>
                    <div className="col-6 email-col">
                        <Input
                            label='E-mail'
                            name='email'
                            handleChange={onFieldChange}
                            value={data.email || ''}
                            type='email'
                        />
                    </div>
                </div>
                <div className="row row_col">
                    <div className="children-number">
                        <CustomSelect
                            label='Количество детей'
                            name='children_quantity'
                            options={numberOptions()}
                            value={desiredQuantityForSelect('children_quantity')}
                            handleChange={val => onSelectChange(val, 'children_quantity')}
                        />
                    </div>
                    <div className="children-age">
                        <span className='children-select-inline-label'>от</span>
                        <div className='children-age-wrapper'>
                            <CustomSelect
                                label='Желаемый возраст ребенка'
                                name='desired_age_from'
                                options={ageFromOptions()}
                                value={desiredQuantityForSelect('desired_age_from')}
                                handleChange={val => onSelectChange(val, 'desired_age_from')}
                            />
                        </div>
                        <span className='children-select-inline-label'>до</span>
                        <div className='children-age-wrapper'>
                            <CustomSelect
                                label=''
                                name='desired_age_to'
                                options={ageToOptions()}
                                value={desiredQuantityForSelect('desired_age_to')}
                                handleChange={val => onSelectChange(val, 'desired_age_to')}
                            />
                        </div>
                        <span className='children-select-inline-label'>лет</span>
                    </div>
                </div>
            </div>

            <div className='visitors'>

                <h3 className='subtitle'>специалисты</h3>

                <div className="row row_specialist">
                    <div className="specialist">
                        <CustomSelect
                            label='ФИО специалиста'
                            name='specialist'
                            options={appointmentSelectedId ? specialists : []}
                            value={{
                                value: data.specialist ? data.specialist.id : '',
                                label: data.specialist ? data.specialist.fio : ''
                            }}
                            handleChange={onSpecialistChange}
                        />
                    </div>
                    <div className="cabinet">
                        <CustomSelect
                            label='Кабинет'
                            name='cabinet'
                            options={appointmentSelectedId ? rooms : []}
                            value={{
                                value: data.room ? data.room.id : '',
                                label: data.room ? data.room.room_number : ''
                            }}
                            handleChange={onCabinetChange}
                        />
                    </div>
                </div>
            </div>


            <div className="save-row">
                {
                    appointmentSelectedId &&
                    <>
                        <div className="btn-wrapper">
                            <Button
                                text='Сохранить'
                                handleClick={onEditSave}
                            />
                        </div>
                        <div className="btn-wrapper">
                            <Button
                                text='Перенести'
                                handleClick={() => switchChangeDateModal(true)}
                            />
                        </div>

                        <div className="btn-wrapper">
                            <Button
                                text='Удалить'
                                bgColor={theme.colors.lavender.light}
                                handleClick={onDeleteAppointment}
                            />
                        </div>
                    </>
                }
            </div>
            {
                changeDateModal &&
                <Modal setModalVisibility={switchChangeDateModal}>
                    <div className='add-appointment'>
                        <div className="add-appointment__inner-wrapper">
                            <h3 className='add-appointment__title'>Перенос приемных часов</h3>
                            <div className="row row_col appointment-date">
                                <div className="col-6">
                                    <DatePicker
                                        selected={new Date(data.date)}
                                        onChange={date => setData({...data, date: formatDateForApi(date)})}
                                        locale={ru}
                                        shouldCloseOnSelect={false}
                                        inline={true}
                                        dateFormat='dd.MM.yyyy'
                                        highlightDates={appointmentAllDates}
                                        forceShowMonthNavigation
                                        minDate={new Date()}

                                    />
                                    <div className="legend-row">
                                        <span className='legend-color'/>
                                        <span className='legend-text'>есть запись</span>
                                        {/*            <span className='legend-color legend-color_grey'/>
                                        <span className='legend-text'>занято</span>*/}

                                    </div>
                                </div>
                                <div className="col-5">
                                    <h4 className='date-selected'>
                                        {
                                            data.date &&
                                            format(new Date(data.date), 'd MMMM yyyy', {locale: ru})
                                        }
                                    </h4>
                                    <div className="time-select-label">
                                        Время
                                    </div>
                                    <DatePicker
                                        selected={new Date(`${data.date},${data.start_time}`)}
                                        onChange={time => setData({...data, start_time: formatTimeForApi(time)})}
                                        locale={ru}
                                        shouldCloseOnSelect={true}
                                        showTimeSelect
                                        showTimeSelectOnly
                                        timeIntervals={5}
                                        timeCaption="Время"
                                        dateFormat="HH:mm"
                                        minTime={new Date().setHours(9, 0)}
                                        maxTime={new Date().setHours(17, 0)}
                                        // includeDates={includeDates}
                                    />
                                </div>
                            </div>
                            <div className='btn-row'>
                                <span className='validation'>
                                    {
                                        validationErrors ? 'Все поля должны быть заполнены' : ''
                                    }
                                </span>
                                <Button
                                    text='Сохранить'
                                    handleClick={onRescheduleAppointment}
                                />
                            </div>
                        </div>
                    </div>

                </Modal>
            }
            <style jsx>{`
                .visitors {
                    background-color: #f1f5fe;
                    padding: 30px;
                    margin-bottom: 30px;
                }       
                .subtitle {
                    color: #154ec9;
                    font-size: 18px;
                    font-weight: 700;
                    line-height: 34px;
                    text-transform: uppercase;
                    margin-top: 0;
                }
                .row {
                    margin-bottom: 40px;
                }
                .row_col {
                    margin-right: -15px;
                    margin-left: -15px;
                    display: flex;
                    flex-wrap: wrap;
                }
                .col-6 {
                    max-width: 50%;
                    flex: 0 0 50%;
                    padding-left: 15px;
                    padding-right: 15px;
                }
                .children-number {
                    width: 165px;
                    padding-left: 15px;    
                    padding-right: 15px;
                    margin-right: 20px;
                }
                .children-select-inline-label {
                    color: #60678e;
                    margin-bottom: 10px;
                    margin-right: 10px;
                }
                .children-age-wrapper {
                    width: 90px;
                    margin-right: 30px;
                }
                .children-age-wrapper {
                    white-space: nowrap;
                }
                .children-age {
                    display: flex;
                    align-items: flex-end;
                }
                .visitors {
                    background-color: #f1f5fe;
                    padding: 30px;
                    margin-bottom: 30px;
                }       
                .subtitle {
                    color: #154ec9;
                    font-size: 18px;
                    font-weight: 700;
                    line-height: 34px;
                    text-transform: uppercase;
                    margin-top: 0;
                }
                .row {
                    margin-bottom: 40px;
                }
                .row_specialist {
                   display: flex;
                   justify-content: space-between;
                   flex-wrap: wrap;
                   align-items: center;
                }
                .specialist {
                    max-width: 82%;    
                    flex: 0 0 82%;
                }
                .cabinet {
                     max-width: 15%;    
                    flex: 0 0 15%;
                }
                 .save-row {
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    justify-content: center; 
                    margin-bottom: 40px;
                    height: 58px;
                }
                .btn-wrapper {
                    margin: 0 10px 10px;
                }
                .add-appointment {
                    border-radius: 4px;
                    border: 1px solid #d7dbe0;
                    background-color: #ffffff;
                    padding: 50px 0;
                }
                .add-appointment__inner-wrapper {
                    width: 80%;
                    margin-left: auto;
                    margin-right: auto;
                }
                .add-appointment__title {
                    color: #515971;
                    font-size: 30px;
                    font-weight: 400;
                    line-height: 30px;
                    text-align: center;
                    margin-bottom: 60px;
                }
                .row {
                    margin-bottom: 50px;
                }
                .row_specialist {
                   display: flex;
                   justify-content: space-between;
                   flex-wrap: wrap;
                   align-items: center;
                }
                .specialist {
                    max-width: 82%;    
                    flex: 0 0 82%;
                }
                .cabinet {
                     max-width: 15%;    
                    flex: 0 0 15%;
                }
                .row_col {
                    margin-right: -15px;
                    margin-left: -15px;
                    display: flex;
                    flex-wrap: wrap;
                }
                .col-6 {
                    max-width: 50%;
                    flex: 0 0 50%;
                    padding-left: 15px;
                    padding-right: 15px;
                }
                .col-5 {
                    max-width: 45%;
                    flex: 0 0 45%;
                    margin-left: auto;
                    padding-left: 15px;
                    padding-right: 15px;
                }
                .date-selected {
                    color: #154ec9;
                    font-size: 18px;
                    font-weight: 700;
                    line-height: 20.82px;
                    text-transform: uppercase;
                    margin-top: 0;
                    height: 20px;
                }
                .legend-row {
                    color: #60678e;
                    font-size: 14px;
                    font-weight: 400;
                    line-height: 24px;
                    display: flex;
                    align-items: center;
                }
                .legend-color {
                    width: 18px;
                    height: 16px;
                    background-color: #60678e;
                    display: inline-block;
                    margin-right: 8px;
                    
                }
                 .legend-color_grey {
                    background-color: #d7dbe0;
                }
                .legend-text {
                    margin-right: 20px;   
                }
                .time-select-label {
                    color: #60678e;
                    font-size: 16px;
                    font-weight: 400;
                    line-height: 22px;
                    margin-bottom: 10px;
                }
                .btn-row {
                    text-align: center;
                }
                .validation {
                    color: red;
                    font-size: 14px;
                    height: 16px;
                    display: inline-block;
                }
                
                .datepicker-col {
                    width: 150px;
                    margin-right: 10px;
                }
                .filter-date-error {
                    position: absolute;
                    font-size: 12px;
                  line-height: 1;
                  color: red;
                  top: calc(100% + 5px);
                }
                @media screen and (max-width: ${theme.media.phone}) {
                    .specialist {
                        max-width: 100%;
                        flex: 0 0 100%;
                        margin-bottom: 25px;
                    }
                    .cabinet {
                        max-width: 30%;    
                        flex: 0 0 30%;
                    }
                }
                @media screen and (max-width: ${theme.media.phoneS}) {
                    .children-age {
                        max-width: 100%;
                        flex: 0 0 100%;
                        margin-top: 30px;
                        margin-left: -10px;
                    }
                    .col-6 {
                        max-width: 100%;
                        flex: 0 0 100%;
                    }
                    .email-col {
                        margin-top: 30px;
                    }
                }
            `}</style>
        </div>
    );
};


const mapStateToProps = createStructuredSelector({
    regions: selectRegionOptions,
    appointmentChosen: selectAppointmentChosen,
    specialists: selectSpecialists,
    rooms: selectRooms,
    appointmentSelectedId: selectAppointmentSelectedId,
    token: selectToken,
    appointmentDatesRange: selectAppointmentDatesRange,
    appointmentAllDates: selectAppointmentAllDates
});

const mapDispatchToProps = (dispatch) => ({
    deleteAppointmentStart: id => dispatch(deleteAppointmentStart(id)),
    editAppointmentStart: data => dispatch(editAppointmentStart(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Visitors);
