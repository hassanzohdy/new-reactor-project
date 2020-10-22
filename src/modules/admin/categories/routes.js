import adminRoutes from '../helpers/admin-routes';
import Categories from './components/categories/Categories';

adminRoutes({
    path: '/categories',
    routes: [{
        path: '/',
        component: Categories
    }]
});