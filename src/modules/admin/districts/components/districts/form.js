import React from 'react';
import TextInput from 'reactor/form/components/TextInput';

export default function CategoryForm(props) {
    const { record } = props;
    return (
        <>
            <TextInput name="name" required autoFocus defaultValue={record.name} placeholder="name" />
            <TextInput name="shippingFees" required defaultValue={record.shippingFees} placeholder="shippingFees" />
        </>
    )
}