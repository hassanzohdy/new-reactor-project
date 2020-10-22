import form from './Form';
import service from 'modules/admin/campaigns/services/service';
import tableActions from 'reactor/layout/utils/admin/table-actions';
import optionedAdminTable from 'reactor/layout/utils/admin/crudPage';
import ImageFormatter from 'reactor/table/components/Formatters/ImageFormatter';

const options = {
    service,
    role: 'campaigns',
    formOptions: {
        form,
        singleName: 'campaign',
        defaultData: {
            
        }
    },
    table: {
        heading: 'campaigns',
        columns: [
            {
                heading: '#',
                key: 'id',
            },
            {
                heading: 'title',
                key: 'title',
            },
            {
                heading: 'content',
                key: 'content',
            },
            {
                heading: 'image',
                key: 'image',
                formatter: ImageFormatter,
            },
            tableActions,
        ],
    }
};

const campaigns = optionedAdminTable(options);

export default campaigns;