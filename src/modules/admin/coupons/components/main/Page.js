import form from './Form';
import service from 'modules/admin/coupons/services/service';
import tableActions from 'reactor/layout/utils/admin/table-actions';
import optionedAdminTable from 'reactor/layout/utils/admin/crudPage';
import NumberFormatter from 'reactor/table/components/Formatters/NumberFormatter';

const options = {
    service,
    role: 'coupons',
    formOptions: {
        form,
        singleName: 'coupon',
        defaultData: {
            maxUsage: 0,
        }
    },
    table: {
        heading: 'coupons',
        columns: [
            {
                heading: '#',
                key: 'id',
            },
            {
                heading: 'code',
                key: 'code',
            },
            {
                heading: 'couponValue',
                key: 'value',
            },
            {
                heading: 'maxUsage',
                key: 'maxUsage',
                formatter: NumberFormatter,
            },
            {
                heading: 'totalUses',
                key: 'totalUses',
                formatter: NumberFormatter,
            },
            {
                heading: 'startsAt',
                key: 'startsAt.format',
            },
            {
                heading: 'endsAt',
                key: 'endsAt.format',
            },
            tableActions,
        ],
    }
};

const coupons = optionedAdminTable(options);

export default coupons;