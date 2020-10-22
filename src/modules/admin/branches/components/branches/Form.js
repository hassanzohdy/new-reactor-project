import React from 'react';
import { styled } from '@material-ui/core';
import GridItem from 'reactor/components/Grid/GridItem';
import TextInput from 'reactor/form/components/TextInput';
import SwitchButton from 'reactor/form/components/SwitchButton';
import GridContainer from 'reactor/components/Grid/GridContainer';

const SwitchWrapper = styled('div')(({ theme }) => ({
    marginTop: theme.spacing(3)
}));

export default function CategoryForm(props) {
    const { record } = props;
    return (
        <>
            <GridContainer>
                <GridItem>
                    <TextInput name="name" required autoFocus defaultValue={record.name} placeholder="name" />
                </GridItem>
                <GridItem>
                    <TextInput name="address" required defaultValue={record.address} placeholder="address" />
                </GridItem>
            </GridContainer>
            <GridContainer>
                <GridItem>
                    <TextInput name="phone" required defaultValue={record.phone} placeholder="phone" />
                </GridItem>
                <GridItem>
                    <SwitchWrapper>
                        <SwitchButton name="isPrimary" checked={record.isPrimary} onChange={isPrimary => record.isPrimary = isPrimary} label="primaryBranch" />
                    </SwitchWrapper>
                </GridItem>
            </GridContainer>
        </>
    )
}