import React, {useState} from 'react';
import {connect} from 'react-redux';
import theme from '../../utils/styles/theme';
import DateHoursRow from './DateHoursRow';
import HoursList from './HoursList';
import Visitors from './Visitors';

import CustomSelect from '../../reusable/Select';
import {
    selectAppointmentsIsFetching,
    selectAppointmentsForSelect,
    selectAppointmentChosen,
} from '../../redux/appointments/appointments.selectors';

import {createStructuredSelector} from 'reselect';
import WithSpinner from '../../reusable/WithSpinner';
import {chooseAppointment} from '../../redux/appointments/appointments.actions';

const FederalLK = ({
    isFetching,
    appointmentsForSelect,
    chooseAppointment,
    appointmentChosen,
}) => {

    const [data, setData] = useState({});

    const onSelectChange = (selectedOption, name) => {
        setData({...data, [name]: selectedOption});
        chooseAppointment(selectedOption.value);
    };

    const hoursListValue = () => (
        appointmentsForSelect && data.appointmentsSelect && appointmentsForSelect.filter(appointment => appointment.value === data.appointmentsSelect.value)
    );
    const HoursListWithSpinner = WithSpinner(HoursList);

    return (
        <section className='federal-lk'>
            <h2 className='lk-subtitle'>приемные часы</h2>
            <DateHoursRow/>
            <h2 className='lk-subtitle lk-subtitle_mobile'>приемные часы</h2>
            <div className='federal-lk__wrapper'>
                <div className="federal-lk__col-1">
                    <div className='appointments-list-container'>
                        <HoursListWithSpinner isLoading={isFetching}/>
                    </div>
                    <div className="appointments-select-container">
                        <CustomSelect
                            label='Дата'
                            name='appointmentsSelect'
                            options={appointmentsForSelect}
                            value={hoursListValue() || ''}
                            handleChange={onSelectChange}
                        />
                    </div>
                </div>
                <div className="federal-lk__col-2">
                    {
                        appointmentChosen.length ?
                            <Visitors/> : ''
                    }

                </div>
            </div>
            <style jsx>{`
             .lk-subtitle {
                    color: ${theme.colors.lavender.darkest};
                    font-size: ${theme.fontSize.h4};
                    font-weight: 700;
                    line-height: 36px;
                    text-transform: uppercase;
                }
                .federal-lk__wrapper {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 35px;
                    align-items: start;
                }
                .federal-lk__col-1 {
                    flex: 0 0 31%;
                    max-width: 31%;
                }
                .federal-lk__col-2 {
                    flex: 0 0 65%;
                    max-width: 65%;
                    height: 1157px;   
                }
                .save-row {
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    justify-content: center; 
                }
                .btn-wrapper {
                    margin: 0 10px;
                }
                .lk-subtitle_mobile {
                    display: none;
                }
                .appointments-select-container {
                    display: none;
                }
            
                @media screen and (max-width: ${theme.media.tabletS}) {
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
                    .federal-lk__wrapper {
                        flex-wrap: wrap;
                    }
                    .federal-lk__col-2, .federal-lk__col-1 {
                        flex: 0 0 100%;
                        max-width: 100%;
                    }
                    .federal-lk__col-1 {
                        margin-bottom: 25px;
                    }
                     .lk-subtitle {
                        display: none;
                    }
                    .lk-subtitle_mobile {
                        display: block;
                    }
                   .appointments-select-container {
                        display: block;
                   }
                   .appointments-list-container {
                        display: none;
                   }
                           
                }
                
            `}</style>
        </section>
    );
};

const mapStateToProps = createStructuredSelector({
    isFetching: selectAppointmentsIsFetching,
    appointmentsForSelect: selectAppointmentsForSelect,
    appointmentChosen: selectAppointmentChosen,
});

const mapDispatchToProps = (dispatch) => ({
    chooseAppointment: id => dispatch(chooseAppointment(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FederalLK);