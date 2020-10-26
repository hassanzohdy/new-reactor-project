import user, { crud, ignoreRolesFromCrud } from 'user';
import permissions from 'reactor/layout/utils/admin/permissionsObserver';
import { trans } from 'reactor/localization';

user.setPermissions(user.get('group.permissions'));

// permissions.disable();

const orders = crud('orders', 'order', {
    view: true,
});

const reports = {
    text: trans('reports'),
    name: 'reports',
    roles: [
        {
            text: trans('salesReports'),
            name: 'sales',
        },
        // {
        //     text: trans('ordersReports'),
        //     name: 'orders',
        // },
        // {
        //     text: trans('mealsReports'),
        //     name: 'meals',
        // },
        // {
        //     text: trans('customersReports'),
        //     name: 'customers',
        // },
        // {
        //     text: trans('categoriesReports'),
        //     name: 'categories',
        // },
    ],
};

const campaigns = ignoreRolesFromCrud(crud('campaigns', 'campaign'), ['edit']);
const newsletter = ignoreRolesFromCrud(crud('newsletter', 'newsletterSingle'), ['edit']);
const subscriptions = ignoreRolesFromCrud(crud('subscriptions', 'subscription'), ['add', 'edit']);
const contactUs = ignoreRolesFromCrud(crud('contactUs', 'message', [{
    text: trans('reply'),
    name: 'reply',
}]), ['add', 'edit']);

const customers = crud('customers', 'customer', [
    {
        text: trans('viewItem', trans('customer')),
        name: 'view',
    },
    {
        text: trans('controlWallet'),
        name: 'controlWallet',
    },
]);

const settings = {
    text: trans('settings'),
    name: 'settings',
    roles: [
        {
            text: trans('listItems', trans('settings')),
            name: 'list',
        },
        {
            text: trans('editItem', trans('settings')),
            name: 'update',
        },
    ]
}

const permissionsList = [
    crud('users', 'user'),
    crud('usersGroups', 'usersGroup'),
    settings,
    orders,
    crud('categories', 'category'),
    customers,
    crud('pages', 'page'),
    crud('coupons', 'coupon'),
    contactUs,
    campaigns,
    newsletter,
    subscriptions,
    crud('districts', 'district'),
    reports
];

permissions.set(permissionsList);