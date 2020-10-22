import tableActions from 'reactor/layout/utils/admin/table-actions';
import optionedAdminTable from 'reactor/layout/utils/admin/crudPage';
import usersGroupsService from 'modules/admin/users/services/users-groups-service';
import UserGroupForm from './user-group-form';

const options = {
    service: usersGroupsService,
    role: 'usersGroups',
    formOptions: {
        form: UserGroupForm,
        singleName: 'usersGroup',
    },
    table: {
        heading: 'usersGroups',
        columns: [
            {
                heading: '#',
                key: 'id',
            },
            {
                heading: 'name',
                key: 'name',
            },
            tableActions,
        ],
    }
};

const UsersGroups = optionedAdminTable(options);

export default UsersGroups;