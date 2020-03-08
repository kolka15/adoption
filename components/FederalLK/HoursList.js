import React, {useEffect, useRef} from 'react';
import check from '../../static/images/check.png';
import format from 'date-fns/format';
import ru from 'date-fns/locale/ru';
import {connect} from 'react-redux';
import theme from '../../utils/styles/theme';
import Scrollbar from '../../reusable/Scrollbar';
import {createStructuredSelector} from 'reselect';

import {selectAppointments, selectAppointmentSelectedId} from '../../redux/appointments/appointments.selectors';
import {chooseAppointment} from '../../redux/appointments/appointments.actions';

let offsetTop = 0;

const HoursList = ({appointments, chooseAppointment, appointmentSelectedId}) => {

    const scroll = useRef(null);

    useEffect(() => {
        scroll && scroll.current && scroll.current.scrollTop(offsetTop);
    }, [appointmentSelectedId]);

    return (
        <div>
            {
                appointments && appointments.length ?
                    <Scrollbar height={680}
                        el={scroll}
                        onScrollFrame={e => offsetTop = e.scrollTop}
                    >
                        {
                            appointments.map(el => (
                                <div className={`hours-item ${appointmentSelectedId === el.id ? 'active' : ''}`}
                                    key={el.id} onClick={() => chooseAppointment(el.id)}>
                                    <div className='hours-item__inner-wrapper'>
                                        <div className='hours-item__icon-container'>
                                            <img src={check} alt="check"/>
                                        </div>
                                        <div>
                                            <div>
                                                <span
                                                    className='date'>{format(new Date(el.date), 'dd.M.yyyy', {locale: ru})}</span>
                                                <span className='date'>{el.start_time}</span>
                                                <span className='day-of-week'>
                                                    ({format(new Date(el.date), 'eeee', {locale: ru})})
                                                </span>
                                            </div>
                                            <div className='cabinet'>
                                                кабинет № {el.room.room_number}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </Scrollbar> : 'Нет приёмных часов'
            }

            <style jsx>{`
                .hours-item {
                    margin-right: 20px;
                    height: auto;
                }
                
                .hours-item.active {
                    background-color: #f1f5fe;

                }
                .hours-item__inner-wrapper {
                    padding: 12px 15px 12px 15px;
                    display: flex;
                    align-items: center;
                    border-bottom: 1px solid #d3d6ea;
                    line-height: 1.5;
                    cursor: pointer;
                    font-size: 15px;
                    font-weight: 500;
                }
                .hours-item__icon-container {
                    display: flex;
                    align-items: center;
                    margin-right: 15px
                    
                }
                .date {
                    color:${theme.colors.lavender.darkest};
                    font-size: 14px;
                    text-transform: uppercase;
                    margin-right: 15px;
                }
                
                .day-of-week {
                    font-size: 14px;
                    text-transform: uppercase;
                    color:${theme.colors.lavender.darkest};

                }
                .hours-item.active .date, .hours-item.active .day-of-week  {
                    color: #007bff;
                }
                .cabinet {
                    color: #60678e;
                    text-transform: uppercase;
                    font-size: 14px;
                }
            `}</style>
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    appointments: selectAppointments,
    appointmentSelectedId: selectAppointmentSelectedId
});

const mapDispatchToProps = (dispatch) => ({
    chooseAppointment: id => dispatch(chooseAppointment(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HoursList);
