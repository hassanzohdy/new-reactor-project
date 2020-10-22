import React from 'react';
import Loading from './loading';

export default function SubmitButton({children, submitting, disabled, color="#000", ...props}) {
    return (
        <button disabled={disabled || submitting} {...props}>
            {!submitting && children}
            <Loading isLoading={submitting} color={color} />
        </button>
    )
}