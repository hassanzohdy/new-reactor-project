import adminRoutes from '../helpers/admin-routes';
import Page from './components/main/Page';

adminRoutes({
    path: '/campaigns',
    routes: [{
        path: '/',
        component: Page
    }]
});