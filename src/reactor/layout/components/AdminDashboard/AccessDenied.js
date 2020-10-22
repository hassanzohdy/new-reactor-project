import React from 'react';
import { styled } from '@material-ui/core';
import { trans } from 'reactor/localization';

const Element = styled('h1')({
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 36,
});

export default function AccessDenied() {
    return <Element variant="h2" children={trans('accessDenied')} />;
}