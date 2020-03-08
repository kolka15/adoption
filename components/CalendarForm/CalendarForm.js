import React, {useState, useEffect} from 'react';
import fetch from 'isomorphic-unfetch';
import server from '../../utils/config';

import DatePicker from 'react-datepicker';
import {registerLocale} from 'react-datepicker';
import ru from 'date-fns/locale/ru';

registerLocale('ru', ru);

import Input from '../../reusable/Input';
import RadioBtn from '../../reusable/RadioBtn';
import CustomSelect from '../../reusable/Select';
import RangeInput from '../../reusable/RangeInput';
import Checkbox from '../../reusable/Checkbox';
import Button from '../../reusable/Button';
import Modal from '../../reusable/Modal';

import useRange from '../../hooks/useRange';
import {useDispatch, useSelector} from 'react-redux';
import {selectRegionOptions} from '../../redux/regions/regions.selectors';
import {selectDates, selectTime, selectTimeArr} from '../../redux/appointment/appointment.selectors';
import {fetchTimeStart, fetchDatesStart} from '../../redux/appointment/appointment.actions';

import theme from '../../utils/styles/theme';
import {childrenAmount} from './data';
import {ageOptions, rangeMarks} from '../SearchForm/data';
import {formatDateAppointment, formatDateAppointmentModal} from '../../utils/formatDates';
import SelectRange from '../../reusable/SelectRange';
import Link from 'next/link';


const CalendarForm = () => {
    const regionOptions = useSelector(selectRegionOptions);
    const time = useSelector(selectTime);
    const dates = useSelector(selectDates);
    const {nextDates} = useSelector(state => state.appointment);
    const timeArr = useSelector(selectTimeArr);
    const dispatch = useDispatch();

    // console.log(dates);
    // console.log('nextDates ', nextDates);

    const {start, end, onRangeUpdate, onSelectFrom, onSelectTo} = useRange({start: 0, end: 17});
    const [date, setDate] = useState(new Date());
    const [showResult, setShowResult] = useState({
        show: false,
        error: null
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTime, setSelectedTime] = useState(null);
    const [input, setInput] = useState({
        visitor1: '',
        visitor2: '',
        phone: '',
        email: '',
        code: ''
    });
    const [select, setSelect] = useState({
        region: null,
        amount: {value: 1, label: 1},
    });
    const [checkbox, setCheckbox] = useState({
        isOneVisitor: false,
        doAgree: false
    });

    useEffect(() => {
        if (dates) return;
        dispatch(fetchDatesStart());
    }, []);

    useEffect(() => {
        dispatch(fetchTimeStart(formatDateAppointment(date)));
    }, [date]);

    useEffect(() => {
        (() => {
            setInput({...input, visitor2: checkbox.isOneVisitor ? '' : input.visitor2});
        })();
    }, [checkbox.isOneVisitor]);

    useEffect(() => {
        if (dates && dates.length) setDate(dates.sort((a, b) => a - b)[0]);
    }, []);

    const handleInputChange = (e) => {
        setInput({...input, [e.target.name]: e.target.value});
    };

    const handleSelectChange = (selectedOption, name) => {
        setSelect({...select, [name]: selectedOption});
    };

    const onDateChange = (date) => {
        setDate(date);
    };

    const toggleCheckbox = (e) => {
        setCheckbox({...checkbox, [e.target.name]: !checkbox[e.target.name]});
    };

    const onTimeRadio = (e) => {
        setSelectedTime(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submit');
        setIsModalOpen(true);
        fetch(`${server}/api/generate_code`, {
            method: 'POST',
            body: JSON.stringify({phone: input.phone})
        }).then(res => res.json()).then(result => console.log(result)).catch(err => console.log(err));
    };

    const onConfirmClick = () => {
        const {visitor1, visitor2, phone, code, email} = input;
        const {region, amount} = select;
        const body = {
            code,
            visitor_fio1: visitor1,
            phone,
            email,
            desired_age_from: start,
            desired_age_to: end,
            children_quantity: amount.value
        };
        if (region) {
            body.regions = region.map(el => ({id: el.value}));
        }
        if (!checkbox.isOneVisitor) {
            body.visitor_fio2 = visitor2;
        }
        const timeObj = timeArr.filter(el => el.start_time === selectedTime)[0];
        const appointmentId = timeObj.id;
        // console.log(body);
        setIsModalOpen(false);
        fetch(`${server}/api/appointments/${appointmentId}`, {
            method: 'PUT',
            body: JSON.stringify(body)
        }).then(res => res.json()).then(result => {
            setShowResult({
                show: true,
                error: result.error,
                date: formatDateAppointmentModal(result.date),
                time: result.start_time,
                room: result.room.room_number
            });
            // console.log(result);
        }).catch(error => {
            setShowResult({show: true, error});
            console.log(error);
        });
    };

    const placeholder = 'Ф.И.О полностью';

    return (
        <form className='form' onSubmit={handleSubmit}>
            <div className='calendar'>
                <div className='date'>
                    <h4 className='calendar__title'>Выберите дату приема</h4>
                    <div className='datepicker'>
                        <DatePicker
                            selected={date}
                            onChange={onDateChange}
                            locale={ru}
                            shouldCloseOnSelect={false}
                            inline={true}
                            dateFormat='dd.MM.yyyy'
                            includeDates={dates}
                            forceShowMonthNavigation
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
                    {dates && dates.length === 0 &&
                    <p className='no-dates'>
                        На ближайшие дни нет времени доступного для записи на прием.
                        {
                            nextDates &&
                            <span>
                                Следующий период записи на {formatDateAppointmentModal(nextDates.dateFrom).split(' ')[0]} - {formatDateAppointmentModal(nextDates.dateTo)}, откроется {formatDateAppointmentModal(nextDates.date)} в 10:00 по Московскому времени.
                            </span>
                        }
                    </p>
                    }
                </div>
                <div className='time'>
                    <h4 className='calendar__title'>Выберите время приема</h4>
                    <div className='TimeRadio'>
                        {time && time.map((el, i) => (
                            <div key={i} className='TimeRadio-Item'>
                                <RadioBtn
                                    value={el}
                                    name='time'
                                    label={el}
                                    handleChange={onTimeRadio}
                                    type='radio'
                                    selectedValue={selectedTime}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <hr/>

            <div className='visitors'>
                <div className='visitor'>
                    <div className='visitor__input'>
                        <Input
                            type='text'
                            value={input.visitor1}
                            name='visitor1'
                            placeholder={placeholder}
                            label='Посетитель 1'
                            handleChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className='visitor__radio'/>
                </div>
                <div className='visitor'>
                    <div className='visitor__input'>
                        <Input
                            type='text'
                            value={input.visitor2}
                            name='visitor2'
                            placeholder={placeholder}
                            label='Посетитель 2'
                            handleChange={handleInputChange}
                            disabled={checkbox.isOneVisitor}
                            required={!checkbox.isOneVisitor}
                        />
                    </div>
                    <div className='visitor__radio'>
                        <RadioBtn
                            value={checkbox.isOneVisitor}
                            name='isOneVisitor'
                            label='Будет один посетитель'
                            handleChange={toggleCheckbox}
                            type='checkbox'
                        />
                    </div>
                </div>
                <div className='visitor'>
                    <div className='visitor__input'>
                        <Input
                            type='tel'
                            value={input.phone}
                            name='phone'
                            placeholder=''
                            label='Телефон'
                            handleChange={handleInputChange}
                            pattern='(\+?[7-8]{0,1}?[-\s\.]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{2}[-\s\.]?[0-9]{2})'
                            required
                        />
                    </div>
                    <div className='visitor__radio'/>
                </div>
                <div className='visitor'>
                    <div className='visitor__input'>
                        <Input
                            type='email'
                            value={input.email}
                            name='email'
                            placeholder=''
                            label='email'
                            handleChange={handleInputChange}
                        />
                    </div>
                    <div className='visitor__radio'/>
                </div>
            </div>

            <hr/>

            <div className='region'>
                <CustomSelect
                    label='Регион'
                    options={regionOptions}
                    value={select.region}
                    placeholder=''
                    name='region'
                    handleChange={handleSelectChange}
                    isMulti
                />
            </div>

            <hr/>

            <div className='amount'>
                <CustomSelect
                    label='Количество детей'
                    options={childrenAmount}
                    value={select.amount}
                    name='amount'
                    handleChange={handleSelectChange}
                />
            </div>

            <div className='range-input'>
                <RangeInput
                    start={start}
                    end={end}
                    min={0}
                    max={17}
                    label='Возраст ребенка'
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

            <div className='agree'>
                <Checkbox
                    name='doAgree'
                    id='doAgree'
                    value='doAgree'
                    isChecked={checkbox.doAgree}
                    label='Я даю согласие на обработку персональных данных'
                    handleChange={toggleCheckbox}
                    required
                />
            </div>

            <div className='btn'>
                <Button
                    type='submit'
                    text='Записаться'
                    disabled={!(checkbox.doAgree && input.visitor1 && input.phone && selectedTime && (input.visitor2 || checkbox.isOneVisitor))}
                />
            </div>

            {isModalOpen &&
            <Modal setModalVisibility={setIsModalOpen}>
                <div className='Modal'>
                    <h1 className='Modal-Header'>запись на прием</h1>
                    <div className='Underline'/>
                    <h2 className='Modal-Confirm'>Подтверждение записи</h2>
                    <p className='Modal-Info'>На ваш мобильный телефон отправлен код подтверждения, введите его ниже,
                        чтобы закончить регистрацию</p>
                    <div className='Modal-Input'>
                        <Input
                            type='tel'
                            value={input.code}
                            name='code'
                            label='Код'
                            handleChange={handleInputChange}
                        />
                    </div>
                    <div className='Modal-Buttons'>
                        <div className='Button-Wrapper'>
                            <Button
                                text='Подтвердить'
                                disabled={!input.code}
                                handleClick={onConfirmClick}
                            />
                        </div>
                        <Button
                            text='Отменить'
                            handleClick={() => setIsModalOpen(false)}
                            modType='purple'
                        />
                    </div>
                </div>
            </Modal>
            }
            {showResult.show &&
            <Modal
                setModalVisibility={showResult.error ? (() => setShowResult({...showResult, show: false})) : undefined}
            >
                <div className='Modal'>
                    <h1 className='Modal-Header'>запись на прием</h1>
                    <div className='Underline'/>
                    <h2 className='Modal-Confirm'>Подтверждение записи</h2>
                    {showResult.error ?
                        <div>
                            <h3 className='Modal-Result'>
                                <img src='/static/images/notice.svg' alt='ошибка!' className='Modal-Error'/>
                                Не удалось подтвердить запись!
                            </h3>
                        </div> :
                        <div>
                            <h3 className='Modal-Result'>Ваша запись подтверждена!</h3>
                            <div className='Result-Wrapper'>
                                <div className='Result-Label'>
                                    <div>Дата и время приема:</div>
                                    <div>№ кабинета</div>
                                </div>
                                <div className='Result-Data'>
                                    <div>{showResult.date} в {showResult.time}</div>
                                    <div>{showResult.room}</div>
                                </div>
                            </div>
                            <div className='Modal-Back'>
                                <Link href='/'>
                                    <a className='Modal-Link'>
                                        на главную
                                    </a>
                                </Link>
                            </div>

                        </div>
                    }
                </div>
            </Modal>
            }

            <style jsx>{`
                .Modal {
                    padding: 40px 60px 60px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    background: #fff;
                    font-family: Roboto, sans-serif;
                    color: #3b4255;
                }
                .Modal-Header {
                    text-transform: uppercase;
                    font-size: 36px;
                    line-height: 30px;
                    margin-bottom: 15px;
                }
                .Modal-Confirm {
                    color: #60678e;
                    font-size: 20px;
                    font-weight: 400;
                    line-height: 30px;
                }
                .Modal-Info {
                    max-width: 515px;
                    text-align: center;
                    font-size: 18px;
                    line-height: 24px;
                }
                .Modal-Input {
                    max-width: 200px;
                    margin: 20px 0 50px;
                }
                .Modal-Buttons {
                    display: flex;
                }
                .Modal-Result {
                    font-size: 30px;
                    font-weight: 400;
                    line-height: 30px;
                    margin: 15px 0 35px;
                    text-align: center;
                    display: flex;
                    align-items: flex-end;
                }
                .Result-Wrapper {
                    display: flex;
                    justify-content: space-between;
                    width: 450px;
                    font-size: 18px;
                    line-height: 30px;
                }
                .Result-Label {
                    color: #60678e;
                }
                .Result-Data {
                    font-weight: 700;
                }
                .Button-Wrapper {
                    margin-right: 40px;
                }
                .Modal-Back {
                    text-align: center;
                    margin-top: 30px;
                }
                .Modal-Link {
                    color: #3b4255;
                    font-size: 20px;
                    line-height: 24px;
                    text-decoration: underline;
                }
                .Modal-Error {
                    width: 40px;
                    margin-right: 10px;
                }
                .Underline {
                    width: 76px;
                    height: 3px;
                    background-color: #f7921e;
                }
                .form {
                    padding: 2.5rem 2rem;
                    background: #f1f5fe;
                }
                .calendar {
                    display: flex;
                }
                .date {
                    margin-right: 6.25rem;
                }
                .calendar__title {
                    color: ${theme.colors.blue.dark};
                    font-size: 22px;
                    font-weight: 400;
                    line-height: ${theme.lineHeight.plain};
                    margin-top: 0;
                }
                hr {
                    color: #d3d3d3;
                    opacity: .5;
                }
                .visitors {
                    margin: 3.4rem 0 4rem;
                }
                .visitor {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                    margin-bottom: 2rem;
                    position: relative;
                }
                .visitor:last-of-type {
                    margin: 0;
                }
                .visitor__input {
                    max-width: 841px;
                    min-width: 78%;
                }
                .visitor__radio {
                    position: absolute;
                    right: 0;
                    top: 33%;
                }
                .region {
                    margin: 3.4rem 0;
                    max-width: 824px;
                }
                .amount {
                    width: 135px;
                    margin: 2.7rem 0;
                }
                .agree {
                    text-align: center;
                    margin: 2rem 0;
                }
                .btn {
                    text-align: center;
                    margin-top: .5rem;
                }
                .datepicker {
                    height: 350px;
                    width: 355px;
                }
                .select-range {
                    display: none;
                }
                .TimeRadio {
                    display: flex;
                    flex-wrap: wrap;
                    margin-top: -7px;
                }
                .TimeRadio-Item {
                    margin-right: 30px;
                }
                TimeRadio-Item:last-of-type {
                    margin-right: 0;
                }
                @media screen and (max-width: ${theme.media.desktop}) {
                    .visitor {
                        flex-direction: column;
                        align-items: flex-start;
                    }
                    .visitor__radio {
                        position: relative;
                        right: 0;
                        top: 33%;
                    }
                }
                @media screen and (max-width: ${theme.media.tabletS}) {
                    .instruction {
                        flex-direction: column;
                    }
                    .form {
                        padding: 26px 16px 39px 16px;
                    }
                    .date {
                        margin-right: 0;
                    }
                    .calendar {
                        flex-direction: column;
                    }
                    .range-input {
                        display: none;
                    }
                    .select-range {
                        display: block;
                    }
                    .visitor__input {
                        width: 100%;
                    }
                    .agree {
                        text-align: left;
                    }
                    hr {
                        display: none;
                    }
                    .visitors,
                    .region,
                    .amount {
                        margin: 35px 0;
                    }
                }
                @media screen and (max-width: 475px) {
                    .datepicker {
                        height: 350px;
                        width: 100%;
                        position: relative;
                    }
                    .Modal {
                        padding: 40px 35px 60px;
                    }
                    .Modal-Header {
                        font-size: 25px;
                    }
                }
                @media screen and (max-width: 400px) {
                    .Modal-Buttons {
                        flex-direction: column;
                        justify-content: center;
                    }
                    .Button-Wrapper {
                        margin-right: 0;
                        margin-bottom: 20px;
                    }
                }
            `}</style>
        </form>
    );
};

export default CalendarForm;
