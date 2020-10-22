import React from 'react';
import TextInput from 'reactor/form/components/TextInput';
import ImageInput from 'reactor/form/components/ImageInput';
import TextAreaInput from 'reactor/form/components/TextareaInput';

export default function Form({record}) {
    return (
        <>
            <TextInput name="title" required autoFocus defaultValue={record.title} placeholder="title" />
            <TextAreaInput name="content" required autoFocus defaultValue={record.content} placeholder="content" />
            <ImageInput name="image" label="image" value={record.image} />
        </>
    )
}