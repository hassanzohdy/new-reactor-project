import router from 'reactor/router';
import Layout from './../components/Layout';
import Guardian from 'modules/admin/users/middleware/guardian';
import alreadyLoggedIn from 'modules/admin/users/middleware/reverse-guardian';

export default function frontRoutes(path, component) {
    router.group({
        layout: Layout,
        routes: [{
            path,
            component,
        }],
    });
}

export function noAuthInRoute(path, component) {
    router.group({
        layout: Layout,
        middleware: alreadyLoggedIn,
        routes: [{
            path,
            component,
        }],
    });
}

export function guardedRoute(path, component) {
    router.group({
        layout: Layout,
        middleware: Guardian,
        routes: [{
            path,
            component,
        }],
    });
}