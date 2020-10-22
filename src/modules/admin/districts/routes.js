import adminRoutes from '../helpers/admin-routes';
import Districts from './components/districts/Districts';

adminRoutes({
    path: '/districts',
    routes: [{
        path: '/',
        component: Districts
    }]
});