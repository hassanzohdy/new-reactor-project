import user from 'user';
import './helpers/style';
import './helpers/front-office-config';
import { navigateTo } from 'reactor/router';
import endpointEvents from 'reactor/http/events';

endpointEvents.onSuccess(response => {
    if (response.data.data) {
        response.data = response.data.data;
    }
});

endpointEvents.onError(response => {
    if (! response) return;
    
    // unauthenticated request
    if (response.status === 401) {
        user.logout();

        navigateTo('/login');
    }
});