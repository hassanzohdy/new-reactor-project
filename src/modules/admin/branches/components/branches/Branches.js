import form from './Form';
import service from 'modules/admin/branches/services/branches-service';
import tableActions from 'reactor/layout/utils/admin/table-actions';
import optionedAdminTable from 'reactor/layout/utils/admin/crudPage';
import { trans } from 'reactor/localization';

const options = {
    service,
    formOptions: {
        form,
        singleName: 'branch',
        onSave(record, oldRecord, index, updateRecords, records) {
            // if the saved record is marked as primary, then change any old primary to non primary record
            if (record.isPrimary) {
                let currentPrimaryBranch = records.find(branch => branch.isPrimary && branch.id !== record.id);
                if (! currentPrimaryBranch) return; 
                currentPrimaryBranch.isPrimary = false;
                updateRecords([...records]);
            }
        },
        modalOptions: {
            size: 'lg'
        }
    },
    table: {
        heading: 'branches',
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
                heading: 'primaryBranch',
                key: 'isPrimary',
                formatter: ({record}) => trans(record.isPrimary ? 'yes': 'no') 
            },
            {
                heading: 'address',
                key: 'address',
            },
            tableActions,
        ],
    }
};

const Branches = optionedAdminTable(options);

export default Branches;