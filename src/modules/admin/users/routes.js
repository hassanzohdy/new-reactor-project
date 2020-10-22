import router from 'reactor/router';
import Users from './components/users/Users';
import Login from './components/login/Login';
import ReverseGuardian from './middleware/reverse-guardian';
import UsersGroups from './components/users-groups/UsersGroups';
import adminRoutes from '../helpers/admin-routes';

router.add('/login', Login, ReverseGuardian);

adminRoutes({
    path: '/users',
    routes: [{
        path: '/',
        component: Users
    }, {
        path: '/groups',
        component: UsersGroups
    }]
});