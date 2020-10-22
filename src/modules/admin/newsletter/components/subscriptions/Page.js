import service from 'modules/admin/newsletter/services/subscriptions-service';
import tableActions from 'reactor/layout/utils/admin/table-actions';
import optionedAdminTable from 'reactor/layout/utils/admin/crudPage';

const options = {
    service,
    role: 'subscriptions',
    table: {
        heading: 'subscriptions',
        columns: [
            {
                heading: '#',
                key: 'id',
            },
            {
                heading: 'email',
                key: 'email',
            },
            tableActions,
        ],
    }
};

const campaigns = optionedAdminTable(options);

export default campaigns;