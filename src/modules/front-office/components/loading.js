import React from 'react';
import { MAIN_COLOR } from '../helpers/style';
import CircleProgress from 'reactor/components/Preloaders/CircleProgress';

export default function Loading({ isLoading, color={MAIN_COLOR} }) {
    if (!isLoading) return '';

    return (
        <div className="text-center">
            <CircleProgress color={color} />
        </div>
    )
}