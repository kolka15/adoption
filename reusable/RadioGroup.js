import React, { Component } from 'react';
import RadioBtn from './RadioBtn';

import theme from '../utils/styles/theme';

class RadioGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.selectedValue
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.selectedValue != prevProps.selectedValue) {
            this.setState({ value: this.props.selectedValue });
        }
    }

    handleChange = (e) => {
        this.setState({ value: e.target.value });
        if (this.props.onUpdate) {
            this.props.onUpdate(parseInt(e.target.value, 10));
        }
    };
    render() {
        const { label, options, name } = this.props;
        const { value } = this.state;

        return (
            <div className='radio-group'>
                <div className='label'>{label}</div>
                <div className='radio-buttons'>
                    {options && options.map((item, i) => {
                        return (
                            <div key={i} className='radio-button'>
                                <RadioBtn
                                    value={item.value}
                                    label={item.label.toLowerCase()}
                                    disabled={item.disabled}
                                    name={name}
                                    selectedValue={value}
                                    handleChange={this.handleChange}
                                />
                            </div>
                        );
                    })}
                </div>
                <style jsx>{`
                    .radio-group {
                         margin: ${this.props.margin ? this.props.margin : '0'};
                    }
                    .radio-buttons {
                        display: flex;
                        width: 100%;
                        max-width: 450px;
                        justify-content: space-between;
                        flex-wrap: wrap;
                    }
                    .radio-button {
                        margin-right: 20px
                    }
                    .label {
                        color: ${theme.colors.lavender.plain};
                    }
                    @media screen and (max-width: ${theme.media.tabletS}) {
                        .radio {
                            margin: 7px 0;
                        }
                        .radio-group {
                            margin: 2rem 0;
                        }
                    }
                `}</style>
            </div>
        );
    }

}

export default RadioGroup;
