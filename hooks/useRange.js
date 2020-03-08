import { useState, useCallback } from 'react';

const UseRange = (props) => {
    const [ start, setStart ] = useState(props.start);
    const [ end, setEnd ] = useState(props.end);

    const onRangeUpdate = (values) => {
        setStart(values[0]);
        setEnd(values[1]);
    };

    const onSelectFrom = useCallback((selectedValue) => {
        setStart(selectedValue.value);
    }, [start]);

    const onSelectTo = useCallback((selectedValue) => {
        setEnd(selectedValue.value);
    }, [end]);

    return {
        start,
        end,
        onRangeUpdate,
        onSelectFrom,
        onSelectTo
    };
};

export default UseRange;
