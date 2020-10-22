import form from './form';
import service from 'modules/admin/districts/services/districts-service';
import tableActions from 'reactor/layout/utils/admin/table-actions';
import optionedAdminTable from 'reactor/layout/utils/admin/crudPage';

const options = {
    service,
    role: 'districts',
    formOptions: {
        form,
        singleName: 'district',
    },
    table: {
        heading: 'districts',
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
                heading: 'shippingFees',
                key: 'shippingFees',
            },
            tableActions,
        ],
    }
};

const Districts = optionedAdminTable(options);

export default Districts;