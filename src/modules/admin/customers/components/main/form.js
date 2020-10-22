import React from 'react';
import TextInput from 'reactor/form/components/TextInput';
import EmailInput from 'reactor/form/components/EmailInput';
import PasswordInput from 'reactor/form/components/PasswordInput';

export default function CategoryForm(props) {
    const { record } = props;
    return (
        <>
            <TextInput name="name" required autoFocus defaultValue={record.name} placeholder="name" />
            <TextInput name="phoneNumber" required autoFocus defaultValue={record.phoneNumber} placeholder="phoneNumber" />
            <EmailInput name="email" required autoFocus defaultValue={record.email} placeholder="email" />
            <PasswordInput required={!record.id} placeholder="password" />
        </>
    )
}