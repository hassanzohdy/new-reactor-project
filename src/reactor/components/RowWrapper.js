import React from 'react';
import { Random } from 'reinforcements';

function uniqueId(item) {
    if (! item.uid) {
        item.uid = Random.id();
    }
    
    return item.uid;
}

export default function RowWrapper({ component: Component = React.Fragment, item, ...props }) {
    return <Component key={uniqueId(item)} {...props} />
}