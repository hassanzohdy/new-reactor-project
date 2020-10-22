import endpoint from 'reactor/http/endpoint';

export function subscribe(form) {
    return endpoint.post('/subscribe', form);
}

export function sendContactMessage(form) {
    return endpoint.post('/contactUs/submit', form);
}

export function getPage(name) {
    return endpoint.get('/' + name);
}

export function getSettings() {
    return endpoint.get('/settings');
}