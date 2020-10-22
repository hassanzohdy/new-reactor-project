import { styled } from '@material-ui/core';
import React from 'react';
import CircleProgress from 'reactor/components/Preloaders/CircleProgress';
import AutoComplete from 'reactor/form/components/AutoComplete';
import HiddenInput from 'reactor/form/components/HiddenInput';
import useRequest from 'reactor/hooks/useRequest';
import { trans } from 'reactor/localization';
import categoriesService from '../../../categories/services/categories-service';

const RowWrapper = styled('div')({
    marginBottom: '1rem'
});

export default function HomeSettingsTab({ settings }) {
    return (
        <>
        <h1>Home Settings</h1>
            {/* <RowWrapper>
                <AutoComplete limitTags={6} required items={meals} value={featuredMeals.value} name="settings.home.featuredMeals.value[]" multiple label={trans('featuredMeals')} />
                <HiddenInput name="settings.home.featuredMeals.type" value="intArray" />
            </RowWrapper> */}
        </>
    )
}