import React from 'react';
import MaterialAvatar from '@material-ui/core/Avatar';

export default function Avatar({title, ...props}) {
    props.title = title || props.alt;
    
    return <MaterialAvatar {...props} />;
}