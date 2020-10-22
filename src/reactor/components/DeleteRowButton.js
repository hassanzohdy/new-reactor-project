import { IconButton } from '@material-ui/core';
import React from 'react';
import ColoredIcon from './ColoredIcon';
import Tooltip from './Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import { trans } from 'reactor/localization';
import formContext from '../form/utils/form-context';

export default function DeleteRowButton({ open, index, items, setItems }) {
    const { form } = React.useContext(formContext);
    if (open === false) return null;

    const onClick = () => {
        items.splice(index, 1);

        if (form) {
            form.validForm(true);
        }

        setItems([...items]);
    };

    return (
        <IconButton onClick={onClick}>
            <Tooltip title={trans('delete')}>
                <ColoredIcon icon={DeleteIcon} color="#F00" />
            </Tooltip>
        </IconButton>
    )
}