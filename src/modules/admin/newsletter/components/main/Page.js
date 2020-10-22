import form from './Form';
import service from 'modules/admin/newsletter/services/service';
import tableActions from 'reactor/layout/utils/admin/table-actions';
import optionedAdminTable from 'reactor/layout/utils/admin/crudPage';

const options = {
    service,
    role: 'newsletter',
    formOptions: {
        form,
        modalOptions: {
            fullScreen: true
        },
        singleName: 'newsletterSingle',
    },
    table: {
        heading: 'newsletter',
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

const campaigns = optionedAdminTable(options);

export default campaigns;