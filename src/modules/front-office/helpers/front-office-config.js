import config from 'reactor/config';
import { BASE_URL } from 'shared/config';

config.set({
    // Services Configurations
    // A.K.A Endpoints
    endpoint: {
        baseUrl: BASE_URL,
    },
    locales: {
        ar: {
            direction: 'rtl',
        },
    },
});