import { trans } from 'reactor/localization';
import PersonIcon from '@material-ui/icons/Person';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import MoneyOffIcon from '@material-ui/icons/MoneyOff';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import LocationCity from '@material-ui/icons/LocationCity';
import MotorcycleIcon from '@material-ui/icons/Motorcycle';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import sidebarItems from 'reactor/layout/utils/admin/sidebar-items-list';
import ArtTrackIcon from '@material-ui/icons/ArtTrack';
import { DashboardRounded, VerifiedUser, SupervisedUserCircle, } from '@material-ui/icons';
import EmailIcon from '@material-ui/icons/Email';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ExplicitIcon from '@material-ui/icons/Explicit';
import SettingsIcon from '@material-ui/icons/Settings';

sidebarItems.onUpdate(() => ([
    {
        text: trans('dashboard'),
        route: '/',
        icon: DashboardRounded,
        role: 'homeReport',
    },
    {
        text: trans('customers'),
        route: '/customers',
        icon: PersonIcon,
        role: 'customers.list',
    },
    {
        text: trans('categories'),
        route: '/categories',
        icon: MenuBookIcon,
        role: 'categories.list',
    },
    {
        text: trans('campaigns'),
        icon: ArtTrackIcon,
        items: [
            {
                text: trans('campaigns'),
                route: '/campaigns',
                icon: ArtTrackIcon,
                role: 'campaigns.list',
            },
            {
                text: trans('newsletter'),
                icon: EmailIcon,
                route: '/newsletter',
                role: 'newsletter.list',
            },
            {
                text: trans('subscriptions'),
                route: '/newsletter/subscriptions',
                icon: AccountBoxIcon,
                role: 'subscriptions.list',
            },
        ]
    },
    {
        text: trans('coupons'),
        route: '/coupons',
        icon: MoneyOffIcon,
        role: 'coupons.list',
    },
    {
        text: trans('districts'),
        route: '/districts',
        icon: LocationCity,
        role: 'districts.list',
    },
    {
        text: trans('pages'),
        route: '/pages',
        icon: ExplicitIcon,
        role: 'pages.list',
    },
    {
        text: trans('deliveryMen'),
        route: '/deliveryMen',
        icon: MotorcycleIcon,
        role: 'deliveryMen.list',
    },
    {
        text: trans('contactUs'),
        route: '/contact-us',
        icon: MenuBookIcon,
        role: 'contactUs.list',
    },
    {
        text: trans('reports'),        
        icon: EqualizerIcon,
        items: [
            {
                text: trans('salesReports'),
                route: '/reports/sales',
                icon: MonetizationOnIcon,
                role: 'reports.sales',
            },
        ]
    },
    {
        text: trans('settings'),
        route: '/settings',
        icon: SettingsIcon,
        role: 'settings.list',
    },
    {
        text: trans('users'),        
        icon: VerifiedUser,
        items: [
            {
                text: trans('users'),
                route: '/users',
                icon: SupervisedUserCircle,
                role: 'users.list',
            },
            {
                text: trans('usersGroups'),
                route: '/users/groups',
                icon: SupervisedUserCircle,
                role: 'usersGroups.list',
            },
        ]
    },
]));