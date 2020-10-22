import React from 'react';
import TextInput from 'reactor/form/components/TextInput';
// import TextAreaInput from 'reactor/form/components/TextareaInput';
import HiddenInput from 'reactor/form/components/HiddenInput';
import RichTextInput from 'reactor/form/components/RichTextInput';

export default function Form({record}) {
    return (
        <>
            <TextInput name="title" required autoFocus defaultValue={record.title} placeholder="title" />
            <HiddenInput name="name"  value={record.name} placeholder="name" />
            <RichTextInput name="content" required autoFocus defaultValue={record.content} placeholder="content" />
        </>
    )
}