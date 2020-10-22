import React from 'react';
import TextInput from 'reactor/form/components/TextInput';
import { trans } from 'reactor/localization';
import Setting from './Setting';

export default function SocialSettingsTab({ groupBy }) {
    const getSetting = groupBy('social');

    return (
        <>
            <Setting
                type="string"
                name="social.facebook"
                component={TextInput}
                defaultValue={getSetting('facebook')}
                label={trans('facebookUrl')}
                required
            />
            <Setting
                type="string"
                name="social.twitter"
                component={TextInput}
                defaultValue={getSetting('twitter')}
                label={trans('twitterUrl')}
                required
            />
            <Setting
                type="string"
                name="social.instagram"
                component={TextInput}
                defaultValue={getSetting('instagram')}
                label={trans('instagramUrl')}
                required
            />
            <Setting
                type="string"
                name="social.snapchat"
                component={TextInput}
                defaultValue={getSetting('snapchat')}
                label={trans('snapchatUrl')}
            />
            <Setting
                type="string"
                name="social.youtube"
                component={TextInput}
                defaultValue={getSetting('youtube')}
                label={trans('youtubeUrl')}
            />
        </>
    );
}