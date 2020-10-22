import form from './Form';
import service from 'modules/admin/contactUs/services/service';
import optionedAdminTable from 'reactor/layout/utils/admin/crudPage';
import BooleanFormatter from 'reactor/table/components/Formatters/BooleanFormatter';
import TableDeleteButton from 'reactor/table/components/Actions/TableDeleteButton';
import ButtonsFormatter from 'reactor/table/components/Formatters/ButtonsFormatter';
import ReplyButton from './ReplyButton';

const tableActions = {
    heading: 'actions',
    formatter: ButtonsFormatter,
    buttons: [ReplyButton, TableDeleteButton]
};

const options = {
    service,
    role: 'contactUs',
    permissions: {
        list: true,
        reply: true,
        delete: true,
    },
    formOptions: {
        form,
        singleName: 'reply',
    },
    table: {
        heading: 'contactUs',
        columns: [
            {
                heading: '#',
                key: 'id',
            },
            {
                heading: 'name',
                key: 'name',
            },
            {
                heading: 'phone',
                key: 'phone',
            },
            {
                heading: 'email',
                key: 'email',
            },
            {
                heading: 'createdAt',
                key: 'createdAt.format',
            },
            {
                heading: 'replied',
                key: 'replied',
                formatter: BooleanFormatter,
            },
            {
                heading: 'repliedBy',
                key: 'createdBy.name',
            },
            tableActions,
        ],
    }
};

const campaigns = optionedAdminTable(options);

export default campaigns;