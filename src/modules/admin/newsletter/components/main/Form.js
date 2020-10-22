import React from 'react';
import TextInput from 'reactor/form/components/TextInput';
import RichTextInput from 'reactor/form/components/RichTextInput';

export default function Form({ record }) {    
    return (
        <>
            <TextInput name="title" required autoFocus defaultValue={record.title} placeholder="title" />
            <RichTextInput name="content" required autoFocus defaultValue={record.content} label="content" />
        </>
    )
}