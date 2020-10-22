import { IconButton } from '@material-ui/core';
import React from 'react';
import Tooltip from 'reactor/components/Tooltip';
import useTable from 'reactor/table/hooks/use-table';
import useTableRow from 'reactor/table/hooks/use-table-row';
import ReplyIcon from '@material-ui/icons/Reply';
import FormModal from 'reactor/form/components/FormModal';
import { trans } from 'reactor/localization';
import RichInput from 'reactor/form/components/RichTextInput';
import service from 'modules/admin/contactUs/services/service';

export default function ReplyButton(props) {
    const [formIsOpened, openForm] = React.useState(false);
    const { options } = useTable();

    const { record, updateRecord } = useTableRow();

    if (!options.haveAccessTo('reply') || record.replied) return '';

    const formOptions = props.formOptions || options.formOptions || {};

    if (!formOptions.modalOptions) {
        formOptions.modalOptions = {
            fullScreen: true,
        };
    }

    const onSubmit = async (e) => {
        service.reply(record.id, e.target).then(() => {
            record.replied = true;
            updateRecord({...record});
            openForm(false);
        });
    };

    return (
        <>
            <IconButton onClick={e => openForm(true)}>
                <Tooltip title={trans('reply')}>
                    <ReplyIcon />
                </Tooltip>
            </IconButton>

            <FormModal
                open={formIsOpened}
                onSubmit={onSubmit}
                title={trans('reply')}
                onClose={() => openForm(false)}
                {...(formOptions.modalOptions || {})}
            >
                <h1>{trans('message')}</h1>
                <p>{record.message}</p>

                <RichInput name="reply" required onChange={e => record.reply = e} autoFocus defaultValue={record.content} label="reply" />

            </FormModal>
        </>
    )
}