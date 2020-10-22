import React from 'react';
import moment from 'moment';
import { Obj } from 'reinforcements';
import TextInput from 'reactor/form/components/TextInput';
import DatePicker from 'reactor/form/components/DatePicker';
import NumberInput from 'reactor/form/components/NumberInput';

export default function Form(props) {
    const { record } = props;
    const [startDate, setStartDate] = React.useState(() => {
        let date = Obj.get(record, 'startsAt.format');

        return date ? moment(date, 'DD-MM-YYYY').toDate() : new Date();
    });
    const [endDate, setEndDate] = React.useState(() => {
        let date = Obj.get(record, 'endsAt.format');

        return date ? moment(date, 'DD-MM-YYYY').toDate() : new Date();
    });
    return (
        <>
            <TextInput name="code" required autoFocus defaultValue={record.code} placeholder="code" />
            <TextInput name="value" required defaultValue={record.value} placeholder="couponValue" />
            <NumberInput name="maxUsage" required defaultValue={record.maxUsage} placeholder="maxUsage" />
            <NumberInput name="minOrderValue" required defaultValue={record.minOrderValue} placeholder="minOrderValue" />
            <DatePicker name="startsAt" onChange={setStartDate} maxDate={endDate} required defaultValue={startDate} placeholder="startsAt" />
            <DatePicker name="endsAt" onChange={setEndDate} minDate={startDate} required defaultValue={endDate} placeholder="endsAt" />
        </>
    )
}