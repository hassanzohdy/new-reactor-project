import React from 'react';
import ScrollToArrow from './ScrollToArrow';
import { styled } from '@material-ui/core';

const Text = styled('div')({
    paddingRight: 41
})

export default function Heading({ text, children, scrollTo = 'id' }) {
    return (
        <div className="breadcrumb">
            <div className="container">
                <div className="row justify-content-between align-items-start">                    
                    <Text className="col text float-left">
                        {text || children}
                    </Text>
                    <ScrollToArrow id={scrollTo} />
                </div>
            </div>
        </div>
    )
}