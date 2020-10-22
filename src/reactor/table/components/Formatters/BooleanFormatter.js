import React from 'react';
import { Obj } from 'reinforcements';
import CancelIcon from '@material-ui/icons/Cancel';
import ColoredIcon from 'reactor/components/ColoredIcon';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

export default function BooleanFormatter({ record, column }) {
    const value = Obj.get(record || {}, column.key, false);

    if (value) {
        return <ColoredIcon icon={CheckCircleIcon} color="green" />
    }

    return <ColoredIcon icon={CancelIcon} color="red" />
}