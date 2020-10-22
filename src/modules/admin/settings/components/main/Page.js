import React from 'react';
import service from 'modules/admin/settings/services/service';
import useRequest from 'reactor/hooks/useRequest';
import CircleProgress from 'reactor/components/Preloaders/CircleProgress';
import Tabs, { Tab } from 'reactor/components/Tabs';
import Helmet from 'reactor/components/Helmet';
import { trans } from 'reactor/localization';
import HomeSettingsTab from './HomeSettingsTab';
import GeneralSettingsTab from './GeneralSettingsTab';
import ContactSettingsTab from './ContactSettingsTab';
import SubmitButton from 'reactor/form/components/SubmitButton';
import Form from 'reactor/form/components/Form';
import SocialSettingsTab from './SocialSettingsTab';
import { Paper, styled } from '@material-ui/core';

const Wrapper = styled(Paper)({
    padding: '1rem',
    paddingTop: '0',
});

export default function SettingsPage() {
    const [isLoading, loading] = React.useState(true);

    const [response] = useRequest(() => service.list(), loading);

    if (isLoading) {
        return <CircleProgress />
    }

    const { records: settings } = response.data;

    const updateSettings = (e, form) => {
        service.update(e.target).then(response => {
            form.submitting(false);
        });
    };

    const groupBy = groupName => {
        const records = settings.filter(setting => setting.group === groupName);

        return key => {
            return (records.find(record => record.name == key) || {}).value;
        };
    };

    return (
        <>
            <Helmet title="settings" />
            <h2>{trans('settings')}</h2>
            <Wrapper>
                <Form onSubmit={updateSettings}>
                    <Tabs barBackground="#FFF" barTextColor="#000">
                        <Tab label={trans('general')}>
                            <GeneralSettingsTab groupBy={groupBy} />
                        </Tab>
                        <Tab label={trans('homeSettings')}>
                            <HomeSettingsTab groupBy={groupBy} settings={settings} />
                        </Tab>
                        <Tab label={trans('contactSettings')}>
                            <ContactSettingsTab groupBy={groupBy} settings={settings} />
                        </Tab>
                        <Tab label={trans('socialSettings')}>
                            <SocialSettingsTab groupBy={groupBy} settings={settings} />
                        </Tab>
                    </Tabs>

                    <SubmitButton color="primary" variant="contained">{trans('save')}</SubmitButton>
                </Form>
            </Wrapper>
        </>
    );
}
