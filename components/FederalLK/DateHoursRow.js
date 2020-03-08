import React, {useState} from 'react';

import DatePicker, {registerLocale} from 'react-datepicker';
import {connect} from 'react-redux';
import '../../static/css/datepicker.css';

import Button from '../../reusable/Button';
import Modal from '../../reusable/Modal';
import CustomSelect from '../../reusable/Select';

import ru from 'date-fns/locale/ru';
import format from 'date-fns/format';

registerLocale('ru', ru);

import theme from '../../utils/styles/theme';
import {createStructuredSelector} from 'reselect';
import {
    selectSpecialists,
    selectRooms,
    selectAppointmentDatesRange,
    selectAppointmentAllDates
} from '../../redux/appointments/appointments.selectors';
import {selectToken} from '../../redux/login/login.selectors';
import {createAppointmentStart, fetchAppointmentsStart} from '../../redux/appointments/appointments.actions';
import {formatDateForApi, formatTimeForApi} from '../../utils/formatDates';

const DateHoursRow = ({
    specialists,
    rooms,
    token,
    createAppointmentStart,
    fetchAppointmentsStart,
    appointmentDatesRange,
    appointmentAllDates,
}) => {
    
    const [modalIsVisible, setModalVisibility] = useState(false);
    
    const [data, setData] = useState({
        date: null,
        room: null,
        specialist: null,
        start_time: null,
    });
    
    
    const [dateRangeError, toggleDateRangeValidationError] = useState(false);
    
    const [validationErrors, toggleValidationErrors] = useState(false);
    
    const onSelectChange = (selectedOption, name) => {
        setData({...data, [name]: selectedOption});
    };
    
    const onSaveAppointment = () => {
        const tempData = {};
        let validate = !!data.date && !!data.room && !!data.start_time;
        
        if (!validate) {
            toggleValidationErrors(true);
            return;
        }
        
        toggleValidationErrors(false);
        if (data.specialist) tempData.specialist = {id: data.specialist.value};
        tempData.room = {id: data.room.value};
        tempData.date = formatDateForApi(data.date);
        tempData.start_time = formatTimeForApi(data.start_time);

        createAppointmentStart({tempData, token, appointmentDatesRange});
        setModalVisibility(false);
    };
    
    const onFetchAppointmentsStart = () => {
        const datesRange = {
            dateFrom: data.dateFrom ? formatDateForApi(data.dateFrom) : '',
            dateTo: data.dateTo ? formatDateForApi(data.dateTo) : '',
        };
        
        if (!datesRange.dateFrom) {
            toggleDateRangeValidationError(true);
        } else {
            fetchAppointmentsStart({token, datesRange});
        }
    };
    
   
    return (
        <div className='date-hours-row datepicker-light'>
            <div className='date-hours-row__date-block'>
                <div className="datepicker-col">
                    <DatePicker
                        selected={data.dateFrom}
                        onChange={date => {
                            setData({...data, dateFrom: date});
                            toggleDateRangeValidationError(false);
                        }}
                        locale={ru}
                        shouldCloseOnSelect={true}
                        dateFormat='dd.MM.yyyy'
                        forceShowMonthNavigation
                        // minDate={new Date()}
                        maxDate={data.dateTo}
                        name='newAppointmentDate'
                        startDate={data.dateFrom}
                        endDate={data.dateTo}
                        autoComplete='off'
                        highlightDates={appointmentAllDates}
                        selectsStart
                        popperModifiers={{
                            flip: {
                                behavior: ['bottom']
                            },
                            preventOverflow: {
                                enabled: false
                            },
                            hide: {
                                enabled: false
                            }
                        }}
                    />
                </div>
                
                <div className="datepicker-col">
                    <DatePicker
                        selected={data.dateTo}
                        onChange={date => setData({...data, dateTo: date})}
                        locale={ru}
                        shouldCloseOnSelect={true}
                        dateFormat='dd.MM.yyyy'
                        forceShowMonthNavigation
                        name='newAppointmentDate'
                        startDate={data.dateFrom}
                        endDate={data.dateTo}
                        minDate={data.dateFrom}
                        autoComplete='off'
                        highlightDates={appointmentAllDates}
                        selectsEnd
                        popperModifiers={{
                            flip: {
                                behavior: ['bottom']
                            },
                            preventOverflow: {
                                enabled: false
                            },
                            hide: {
                                enabled: false
                            }
                        }}
                    />
                </div>
                
                
                <div className='date-hours-row__date-apply-wrapper'>
                    {
                        dateRangeError &&
                        <div className='filter-date-error'>
                            Необходимо ввести начальную дату
                        </div>
                    }
                    
                    <Button
                        text='Применить'
                        handleClick={onFetchAppointmentsStart}
                    />
                </div>
            </div>
            <div className='add-btn-wrapper'>
                <Button
                    text='Добавить приемные часы'
                    plus={true}
                    bgColor='#007bff'
                    handleClick={() => setModalVisibility(true)}
                />
            </div>
            
            {
                modalIsVisible &&
                <Modal
                    setModalVisibility={setModalVisibility}
                >
                    <div className='add-appointment'>
                        <div className="add-appointment__inner-wrapper">
                            <h3 className='add-appointment__title'>Добавить приемные часы</h3>
                            
                            <div className="row row_specialist">
                                <div className="specialist">
                                    <CustomSelect
                                        label='ФИО специалиста'
                                        name='specialist'
                                        options={specialists}
                                        value={data['specialist'] || ''}
                                        handleChange={onSelectChange}
                                    />
                                </div>
                                <div className="cabinet">
                                    <CustomSelect
                                        label='Кабинет'
                                        name='room'
                                        options={rooms}
                                        value={data['room'] || ''}
                                        handleChange={onSelectChange}
                                    />
                                </div>
                            </div>
                            <div className="row row_col appointment-date">
                                <div className="col-6">
                                    <DatePicker
                                        selected={data.date}
                                        onChange={date => setData({...data, date: date})}
                                        locale={ru}
                                        shouldCloseOnSelect={false}
                                        inline={true}
                                        dateFormat='dd.MM.yyyy'
                                        highlightDates={appointmentAllDates}
                                        forceShowMonthNavigation
                                        minDate={new Date()}
                                        popperModifiers={{
                                            flip: {
                                                behavior: ['bottom'] // don't allow it to flip to be above
                                            },
                                            preventOverflow: {
                                                enabled: false // tell it not to try to stay within the view (this prevents the popper from covering the element you clicked)
                                            },
                                            hide: {
                                                enabled: false // turn off since needs preventOverflow to be enabled
                                            }
                                        }}
                                        // minDate={new Date()}
                                        // onMonthChange
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
                                            format(data.date, 'd MMMM yyyy', {locale: ru})
                                        }
                                    </h4>
                                    <div className="time-select-label">
                                        Время
                                    </div>
                                    <DatePicker
                                        selected={data.start_time}
                                        onChange={time => setData({...data, start_time: time})}
                                        locale={ru}
                                        shouldCloseOnSelect={true}
                                        showTimeSelect
                                        showTimeSelectOnly
                                        timeIntervals={5}
                                        timeCaption="Время"
                                        dateFormat="HH:mm"
                                        // // minDate={new Date()}
                                        minTime={new Date().setHours(9, 0)}
                                        maxTime={new Date().setHours(17, 0)}
                                        popperModifiers={{
                                            flip: {
                                                behavior: ['bottom'] // don't allow it to flip to be above
                                            },
                                            preventOverflow: {
                                                enabled: false // tell it not to try to stay within the view (this prevents the popper from covering the element you clicked)
                                            },
                                            hide: {
                                                enabled: false // turn off since needs preventOverflow to be enabled
                                            }
                                        }}
                                        // minDate={new Date()}
                                        // onMonthChange
                                    />
                                </div>
                            </div>
                            <div className='btn-row'>
                                <span className='validation'>
                                    {
                                        validationErrors ? 'Заполните необходимые поля' : ''
                                    }
                                </span>
                                <Button
                                    text='Сохранить'
                                    handleClick={onSaveAppointment}
                                />
                            </div>
                        </div>
                    
                    </div>
                </Modal>
            }
            
            <style jsx>{`
                .date-hours-row {
                    margin-bottom: 45px;
                    display: flex;
                    justify-content: space-between;
                }
                .date-hours-row__date-block {
                    display: flex;
                    flex-wrap: wrap;
                }
                .date-hours-row__date-apply-wrapper {
                    margin-left: 20px;
                    position: relative;
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

               @media screen and (max-width: ${theme.media.tabletS}) {
                    .date-hours-row {
                        flex-wrap: wrap;
                    }
                    .add-btn-wrapper {
                        flex: 0 0 100%;
                        margin-top: 25px;
                    }
                    .federal-lk__wrapper {
                        flex-wrap: wrap;
                    }
                    .federal-lk__col-2, .federal-lk__col-1 {
                        flex: 0 0 100%;
                        max-width: 100%;
                        font-size: 40px;
                    }    
               }
               @media screen and (max-width: ${theme.media.phone}) {
                    .specialist, .cabinet {
                        flex: 0 0 100%;
                        max-width: 100%;
                    }
                    .specialist {
                        margin-bottom: 20px;
                    }
                    .col-6, .col-5 {
                        max-width: 100%;
                        flex: 0 0 100%;
                    }
                    .col-6 {
                        margin-bottom: 20px;
                    }
                    .datepicker-col {
                        margin-bottom: 10px;
                    }
               }
               
               @media screen and (max-width: ${theme.media.phoneS}) {
                    .date-hours-row {
                        flex-wrap: wrap;
                    }
                    .add-btn-wrapper {
                        flex: 0 0 100%;
                        margin-top: 25px;
                    }
                    .federal-lk__wrapper {
                        flex-wrap: wrap;
                    }
                    .date-hours-row__date-apply-wrapper {
                        flex: 0 0 100%;
                        margin-left: 0;
                        margin-top: 10px;
                    }
                  
                    
               }
               
               
                
            `}</style>
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    specialists: selectSpecialists,
    rooms: selectRooms,
    token: selectToken,
    appointmentDatesRange: selectAppointmentDatesRange,
    appointmentAllDates: selectAppointmentAllDates
});

const mapDispatchToProps = (dispatch) => ({
    createAppointmentStart: data => dispatch(createAppointmentStart(data)),
    fetchAppointmentsStart: data => dispatch(fetchAppointmentsStart(data)),
});


export default connect(mapStateToProps, mapDispatchToProps)(DateHoursRow);
