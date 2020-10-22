import adminRoutes from '../helpers/admin-routes';
import Customers from './components/main/Page';
import CustomerDetailsPage from './components/DetailsPage/CustomerDetailsPage';

adminRoutes({
    path: '/customers',
    routes: [{
        path: '/',
        component: Customers
    }, 
    {
        path: '/:id',
        component: CustomerDetailsPage,
    }
]
});