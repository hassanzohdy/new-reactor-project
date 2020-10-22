import React from 'react';
import user from 'reactor/user';
import AccessDenied from 'reactor/layout/components/AdminDashboard/AccessDenied';

export default function PermissionGranted(route) {
    if (route.permission && !user.can(route.permission)) return <AccessDenied />;
}