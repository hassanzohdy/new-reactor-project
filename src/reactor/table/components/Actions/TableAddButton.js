import React from 'react';
import Is from '@flk/supportive-is';
import TableForm from '../TableForm';
import useTable from '../../hooks/use-table';
import { trans } from 'reactor/localization';
import Tooltip from 'reactor/components/Tooltip';
import AddIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import { Obj } from 'reinforcements';
import ColoredIcon from 'reactor/components/ColoredIcon';

const defaultButtonOptions = {
    tooltip: trans('add'),
    icon: {
        color: 'primary',
        fontSize: 'large',
    }
};

export default function TableAddButton(props) {
    const [formIsOpened, openForm] = React.useState(false);

    const { service, options, updateRecords } = useTable();
    
    if (!options.haveAccessTo('add')) return '';
    
    const formOptions = props.formOptions || options.formOptions || {};
    
    if (! formOptions.modalOptions) {
        formOptions.modalOptions = props.modalOptions || {};
    }

    const { defaultData = {} } = formOptions;

    const buttonOptions = Obj.merge(defaultButtonOptions, props.buttonOptions || {});

    const onSubmit = record => {
        updateRecords(tableRecords => {
            tableRecords.unshift(record);

            return [...tableRecords];
        });

        openForm(false);
    };

    if (Is.empty(formOptions)) return '';

    return (
        <>
            <IconButton onClick={e => openForm(true)}>
                <Tooltip title={buttonOptions.tooltip}>
                    <ColoredIcon icon={AddIcon} color={buttonOptions.icon.color} fontSize={buttonOptions.icon.fontSize} />
                </Tooltip>
            </IconButton>

            <TableForm
                onSubmit={onSubmit}
                open={formIsOpened}
                onClose={e => openForm(false)}
                service={service}
                action="add"
                record={defaultData}
                formOptions={formOptions}
            />
        </>
    )
}