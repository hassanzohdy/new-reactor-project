import React from 'react';

export default function HTML({ html, component: Component = 'div', ...props }) {
    return <Component {...props} dangerouslySetInnerHTML={{ __html: html }} />;
}