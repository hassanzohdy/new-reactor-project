import adminRoutes from '../helpers/admin-routes';
import SalesReport from './components/SalesReport';

adminRoutes({
    path: '/reports',
    routes: [{
        path: '/sales',
        component: SalesReport
    }]
});