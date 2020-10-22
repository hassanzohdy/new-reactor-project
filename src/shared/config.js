import config from 'reactor/config';

const inDevelopmentMode = process.env.NODE_ENV === 'development';

export const BASE_URL = process.env.REACT_APP_API_BASE_URL;

config.set({
    // Services Configurations
    // A.K.A Endpoints
    basePath: inDevelopmentMode ? '/' : process.env.REACT_APP_PRODUCTION_BASE_PATH, // for production
    endpoint: {
        apiKey: process.env.REACT_APP_API_KEY,
    },
    locales: {
        en: {
            direction: 'ltr',
        },
        ar: {
            direction: 'rtl',
        },
    },
});