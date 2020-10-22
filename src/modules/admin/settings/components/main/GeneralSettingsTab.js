import React from 'react';
import AutoComplete from 'reactor/form/components/AutoComplete';
import TextInput from 'reactor/form/components/TextInput';
import NumberInput from 'reactor/form/components/NumberInput';
import { trans } from 'reactor/localization';
import Setting from './Setting';
import { styled } from '@material-ui/core';

const InputWrapper = styled('div')({
    marginBottom: '1rem'
});

export default function GeneralSettingsTab({ groupBy }) {
    const getSetting = groupBy('general');

    return (
        <>
            <InputWrapper>
                <Setting
                    component={TextInput}
                    type="string"
                    name="general.workingHours"
                    defaultValue={getSetting('workingHours')}
                    label={trans('workingHours')}
                    required
                />
            </InputWrapper>
            <InputWrapper>
                <Setting
                    component={NumberInput}
                    type="float"
                    name="general.orderTaxesValue"
                    defaultValue={getSetting('orderTaxesValue', 0)}
                    label={trans('orderTaxesValue')}
                    required
                />
            </InputWrapper>
            <InputWrapper>
                <Setting
                    component={AutoComplete}
                    items={getSetting('cancelingReason', [])} // as the reasons will be dynamically added, then the items will be the current value
                    multiple
                    type="stringArray"
                    name="general.cancelingReason"
                    addable
                    value={getSetting('cancelingReason', [])}
                    label={trans('cancelingReason')}
                    required
                />
            </InputWrapper>
        </>
    );
}