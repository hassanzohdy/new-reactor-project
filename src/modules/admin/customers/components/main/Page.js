import form from './form';
import service from 'modules/admin/customers/services/customers-service';
import tableActions from 'reactor/layout/utils/admin/table-actions';
import optionedAdminTable from 'reactor/layout/utils/admin/crudPage';
import EmailFormatter from 'reactor/table/components/Formatters/EmailFormatter';

const filter = [
    {
        type: 'search',
        placeholder: '#',
        name: 'id',
        col: 3,
    },
    {
        type: 'search',
        placeholder: 'name',
        name: 'name',
        col: 3,
    },
    {
        type: 'search',
        placeholder: 'email',
        name: 'email',
        col: 3,
    },
    {
        type: 'search',
        placeholder: 'phoneNumber',
        name: 'phoneNumber',
        col: 3,
    },
];

const options = {
    service,
    role: 'customers',
    formOptions: {
        form,
        singleName: 'customer',
    },
    table: {
        heading: 'customers',
        filter,
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
                heading: 'email',
                key: 'email',
                formatter: EmailFormatter
            },
            {
                heading: 'phoneNumber',
                key: 'phoneNumber',
            },
            tableActions,
        ],
    }
};

const Customers = optionedAdminTable(options);

export default Customers;