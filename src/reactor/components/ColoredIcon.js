import React from 'react';

const ColoredIcon = React.forwardRef(function ({color, icon: Icon, ...props}, ref) {
    if (['primary', 'secondary'].includes(color)) {
        props.color = color;
    } else {
        props.style = {
            fill: color
        }
    }
    
    return <Icon {...props} ref={ref} />
});

export default ColoredIcon;