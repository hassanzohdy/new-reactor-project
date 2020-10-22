import React from 'react';
import HiddenInput from 'reactor/form/components/HiddenInput';

export default function Setting({ component: Component, name, type, ...otherProps }) {
    const multipleBrackets = otherProps.multiple ? '[]' : '';
    return (
        <>
            <HiddenInput name={`settings.${name}.type`} value={type} />
            <Component
                name={`settings.${name}.value${multipleBrackets}`}
                {...otherProps}
            />
        </>
    );
}