import React from 'react';
import CircleProgress from 'reactor/components/Preloaders/CircleProgress';
import Tabs, { Tab } from 'reactor/components/Tabs';
import useRequest from 'reactor/hooks/useRequest';
import { trans } from 'reactor/localization';
import router from 'reactor/router';
import customersService from '../../services/customers-service';
import CustomerGeneralTab from './CustomerGeneralTab';
import CustomerWalletTab from './CustomerWalletTab';

export default function CustomerDetailsPage({ params }) {
    const { id } = params;
    const [isLoading, loading] = React.useState(true);
    const [response] = useRequest(() => customersService.get(id), loading);
    const [defaultTab] = React.useState(router.queryString.get('tab', 'general'));

    if (isLoading) {
        return <CircleProgress />
    }

    const { record: customer } = response.data;

    return (
        <Tabs value={defaultTab} barBackground="#FFF" barTextColor="#000" lazy>
            <Tab value="general" label={trans('general')}>
                <CustomerGeneralTab customer={customer} />
            </Tab>
            <Tab value="wallet" label={trans('wallet')}>
                <CustomerWalletTab customer={customer} />
            </Tab>
        </Tabs>
    );
}