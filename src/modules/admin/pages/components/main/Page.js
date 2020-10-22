import form from './Form';
import service from 'modules/admin/pages/services/service';
import optionedAdminTable from 'reactor/layout/utils/admin/crudPage';
import TableEditButton from 'reactor/table/components/Actions/TableEditButton';
import ButtonsFormatter from 'reactor/table/components/Formatters/ButtonsFormatter';
import user from 'reactor/user';

const tableActions = {
    heading: 'actions',
    formatter: ButtonsFormatter,
    buttons: [TableEditButton]
};

const options = {
    service,
    role: 'pages',
    permissions: {
        // add: user.get('id') === 1,
        add: false,
        list: true,
        edit: true,
    },
    formOptions: {
        form,
        singleName: 'page',
        modalOptions: {
            fullScreen: true
        }
    },
    table: {
        heading: 'pages',
        columns: [
            {
                heading: '#',
                key: 'id',
            },
            {
                heading: 'title',
                key: 'title',
            },
            tableActions,
        ],
    }
};

const pages = optionedAdminTable(options);

export default pages;