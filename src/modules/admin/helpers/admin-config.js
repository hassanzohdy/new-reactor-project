import React from 'react';
import logo from 'assets/logo.png';
import config from 'reactor/config';
import { BASE_URL } from 'shared/config';
import Link from 'reactor/components/Link';
import { trans } from 'reactor/localization';
import Avatar from 'reactor/components/Avatar';
import userLogout from 'modules/admin/users/helpers/user-logout';

config.set({
    // Services Configurations
    // A.K.A Endpoints
    endpoint: {
        baseUrl: BASE_URL + '/admin',
    },
    locales: {
        en: {
            direction: 'ltr',
        },
        ar: {
            direction: 'rtl',
        },
    },
    dashboard: {
        header: {
            locales: false,
            logout: userLogout,
        },
        sidebar: {
            heading: props => <Link {...props} to="/">
                <Avatar src={logo} alt={trans('appName')} />
            </Link>,
        }
    }
});