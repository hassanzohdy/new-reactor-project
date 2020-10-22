import Page from './components/main/Page';
import adminRoutes from '../helpers/admin-routes';

adminRoutes({
    path: '/contact-us',
    routes: [{
        path: '/',
        component: Page
    }]
});