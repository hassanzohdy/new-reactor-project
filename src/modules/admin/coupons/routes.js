import adminRoutes from '../helpers/admin-routes';
import Page from './components/main/Page';

adminRoutes({
    path: '/coupons',
    routes: [{
        path: '/',
        component: Page
    }]
});