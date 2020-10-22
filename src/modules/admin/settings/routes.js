import adminRoutes from '../helpers/admin-routes';
import Page from './components/main/Page';

adminRoutes({
    path: '/settings',
    routes: [{
        path: '/',
        component: Page
    }]
});