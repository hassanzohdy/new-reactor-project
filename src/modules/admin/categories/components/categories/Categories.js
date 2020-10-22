import form from './form';
import service from 'modules/admin/categories/services/categories-service';
import tableActions from 'reactor/layout/utils/admin/table-actions';
import optionedAdminTable from 'reactor/layout/utils/admin/crudPage';
import ImageFormatter from 'reactor/table/components/Formatters/ImageFormatter';

const options = {
    service,
    role: 'categories', // permissions
    formOptions: {
        form,
        singleName: 'category',
    },
    table: {
        heading: 'categories',
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
                heading: 'icon',
                key: 'icon',
                formatter: ImageFormatter
            },
            tableActions,
        ],
    }
};

const Categories = optionedAdminTable(options);

export default Categories;