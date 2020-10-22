import adminRoutes from '../helpers/admin-routes';
import Branches from './components/branches/Branches';

adminRoutes({
    path: '/branches',
    routes: [{
        path: '/',
        component: Branches
    }]
});