import React from 'react';
import user from "reactor/user";
import Redirect from 'reactor/components/Redirect';

export default function alreadyLoggedIn(route, history) {
    if (user.isLoggedIn()) {
        return <Redirect to="/" />
    }
}