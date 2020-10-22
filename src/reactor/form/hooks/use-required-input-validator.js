import React from 'react';
import Is from '@flk/supportive-is';
import FormContext from '../utils/form-context';
import { trans } from 'reactor/localization/translator';

export default function useRequiredInputValidator(isRequired, componentRef, value, setError) {    
    const { form } = React.useContext(FormContext);

    if (!componentRef.current) {
        componentRef.current = {};
    }

    if (! componentRef.current.uid) {
        componentRef.current.uid = Math.random();
    }

    if (! isRequired) return () => {};

    const validator = {
        id: componentRef.current.uid,
        validate() {
            // reset the error if exists
            this.hasError = null;

            // now check if the value is empty
            if (Is.empty(value)) {
                // the required error
                const errorMessage = trans('validation.required');

                // set the error to the form
                this.hasError = errorMessage;

                // also update the file input error
                setError(errorMessage);
                
                form.dirtyInput(componentRef);
            }
        }
    };

    form.setInput(validator);

    return (terminate = false) => {
        setError(null);

        if (terminate) {
            form.removeInput(validator);
        }

        form.cleanInput(componentRef);
    };
}