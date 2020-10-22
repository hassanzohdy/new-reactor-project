import React from 'react';
import router from 'reactor/router';
import { translatedTitle } from 'reactor/metadata';
import permissionsObserver from './permissionsObserver';
import LazyTable from 'reactor/table/components/LazyTable';
import AccessDenied from '../../components/AdminDashboard/AccessDenied';
import TableAddButton from '../../../table/components/Actions/TableAddButton';

const defaultRoles = {
    list: true,
    edit: true,
    add: true,
    delete: true,
    view: true,
};

export default function crudPage({ role, permissions = defaultRoles, ...options }) {
    const haveAccessTo = permission => {
        if (!role) return true;
        return permissions[permission] && permissionsObserver.isGranted(role + '.' + permission);
    };

    return function ({ props }) {
        translatedTitle(options.title || options.table.heading);

        if (!haveAccessTo('list')) return <AccessDenied />

        const sendRequest = params => {
            return options.service.list(params);
        };

        const mapResponse = response => {
            const { records, paginationInfo } = response.data;

            return {
                records,
                pagination: paginationInfo,
            };
        };

        options.haveAccessTo = haveAccessTo;

        if (!options.table.addButtons) {
            options.table.addButtons = [TableAddButton];
        }

        return <LazyTable {...props} options={options} defaultRequestParams={router.queryString.all()} request={sendRequest} mapResponse={mapResponse} />
    }
}