import router from 'reactor/router';
import Home from './components/home';
import Guardian from 'modules/admin/users/middleware/guardian';
import AccessDenied from 'reactor/layout/components/AdminDashboard/AccessDenied';
import DashboardLayout from 'reactor/layout/components/AdminDashboard/DashboardLayout';

router.partOf(DashboardLayout, [{
    path: '/', 
    component: Home, 
    middleware: Guardian,
}, {
    path: '/access-denied',
    component: AccessDenied,
}]);