import React from 'react';
import { Box, styled } from '@material-ui/core';
import { red, green, orange, blue } from '@material-ui/core/colors';
import { CardContainer, DataContainer, CardText, NumberCounter } from './CardStyle';
import Link from 'reactor/components/Link';

const Anchor = styled(Link)({
    textDecoration: 'none',
})

export default function Card({ number, text, to, icon: Icon, iconColor, backgroundColor, color, className }) {
    let Wrapper = to ? Anchor : React.Fragment;

    const wrapperProps = {};

    if (to) {
        wrapperProps.to = to;
    }

    return (
        <Wrapper {...wrapperProps}>
            <CardContainer style={{ backgroundColor, color }} className={className}>
                <Box display="flex">
                    <Box width="100%">
                        <DataContainer>
                            <NumberCounter>{Number(number).toLocaleString()}</NumberCounter>
                            <CardText>{text}</CardText>
                        </DataContainer>
                    </Box>
                    <Box flexShrink={1}>
                        <Icon style={{ fill: iconColor, fontSize: '3rem' }} />
                    </Box>
                </Box>
            </CardContainer>
        </Wrapper>
    )
}


export const RedCard = styled(Card)({
    backgroundColor: red[400],
    color: '#FFF',
    '&:hover': {
        backgroundColor: red[600],
    }
});

// export const RedCard = props => <Card backgroundColor={red[400]} color="#FFF" iconColor={red[100]} {...props} />
export const GreenCard = props => <Card backgroundColor={green[400]} color="#FFF" iconColor={green[100]} {...props} />
export const OrangeCard = props => <Card backgroundColor={orange[400]} color="#FFF" iconColor={orange[100]} {...props} />
export const BlueCard = props => <Card backgroundColor={blue[400]} color="#FFF" iconColor={blue[100]} {...props} />