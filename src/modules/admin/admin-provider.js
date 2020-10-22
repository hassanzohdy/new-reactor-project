import './helpers/style';
import './helpers/admin-config';
import user from 'reactor/user';
import './helpers/permissions';
import './helpers/sidebar-items-list';
import { navigateTo } from 'reactor/router';
import endpointEvents from 'reactor/http/events';

endpointEvents.onSuccess(response => {
    if (response.data.data) {
        response.data = response.data.data;
    }
    
    if (response.data.user) {
        user.update(response.data.user);
        user.setPermissions(user.get('group.permissions'));
    }
});

endpointEvents.onError(response => {
    // unauthenticated request
    if (! response) return;
    if (response.status === 401) {
        user.logout();

        navigateTo('/login');
    }
});