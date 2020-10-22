import React from 'react';
import { CircularProgress as Progress } from '@material-ui/core';

export default function CircleProgress({color, position = 'center', ...props}) {
    const style = {};

    if (color) {
        style.color = color;
    }

    return <div style={{textAlign: position}}><Progress style={style} {...props} /></div>
}