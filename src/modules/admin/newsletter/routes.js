import adminRoutes from '../helpers/admin-routes';
import Page from './components/main/Page';
import Subscriptions from './components/subscriptions/Page';

adminRoutes({
    path: '/newsletter',
    routes: [{
        path: '/',
        component: Page
    }, {
        path: '/subscriptions',
        component: Subscriptions,
    }]
});