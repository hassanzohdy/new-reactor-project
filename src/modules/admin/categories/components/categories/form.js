import React from 'react';
import TextInput from 'reactor/form/components/TextInput';
import ImageInput from 'reactor/form/components/ImageInput';
import { Grid } from '@material-ui/core';

export default function CategoryForm(props) {
    const { record } = props;
    return (
        <>
            <TextInput name="name" required autoFocus defaultValue={record.name} placeholder="name" />
            <Grid container>
                <Grid item xs={6}>
                    <ImageInput name="icon" label="icon" required value={record.icon} />
                </Grid>
                {/* <Grid item xs={6}>
                    <ImageInput name="image" label="image" value={record.image} />
                </Grid> */}
            </Grid>
        </>
    )
}