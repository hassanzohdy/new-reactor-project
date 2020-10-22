import React from 'react';
import SwitchButton from 'reactor/form/components/SwitchButton';

export default function SwitchFormatter({record, column}) {
    const {value, switchComponent: SwitchComponent = SwitchButton, onChange} = column;

    const onSwitching = checked => {
        column.value = checked;
        onChange(record, checked, column);
    };

    return <SwitchComponent defaultChecked={value} onChange={onSwitching} />
}