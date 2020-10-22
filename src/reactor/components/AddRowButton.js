import { IconButton } from '@material-ui/core';
import React from 'react';
import ColoredIcon from './ColoredIcon';
import Tooltip from './Tooltip';
import { trans } from 'reactor/localization';
import AddCircleIcon from '@material-ui/icons/AddCircle';

export default function AddRowButton({ color = "primary", addAt = 'end', items, newItem, setItems }) {
    const addItem = () => {
        if (addAt === 'end') {
            setItems([...items, newItem()]);
        } else if (addAt === 'start') {
            setItems([newItem(), ...items]);
        }
    };

    return (
        <IconButton onClick={() => addItem()}>
            <Tooltip title={trans('add')}>
                <ColoredIcon icon={AddCircleIcon} color={color} />
            </Tooltip>
        </IconButton>
    )
}