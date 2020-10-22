import React from 'react';
import EmailInput from 'reactor/form/components/EmailInput';
import TextInput from 'reactor/form/components/TextInput';
import { trans } from 'reactor/localization';
import Setting from './Setting';

export default function ContactSettingsTab({ groupBy }) {
    const getSetting = groupBy('contact');

    return (
        <>
            <Setting
                type="string"
                name="contact.address"
                component={TextInput}
                defaultValue={getSetting('address')}
                label={trans('address')}
                required
            />
            <Setting
                type="string"
                name="contact.phoneNumber"
                component={TextInput}
                defaultValue={getSetting('phoneNumber')}
                label={trans('phoneNumber')}
                required
            />
            <Setting
                type="string"
                name="contact.whatsappNumber"
                component={TextInput}
                defaultValue={getSetting('whatsappNumber')}
                label={trans('whatsappNumber')}
                required
            />
            <Setting
                type="string"
                name="contact.fax"
                component={TextInput}
                defaultValue={getSetting('fax')}
                label={trans('fax')}
                required
            />
            <Setting
                type="string"
                name="contact.email"
                component={EmailInput}
                defaultValue={getSetting('email')}
                label={trans('email')}
                required
            />
        </>
    );
}