import React from 'react';
import PropTypes from 'prop-types';
import Is from '@flk/supportive-is';
import config from 'reactor/config';
import rulesList from '../utils/rules-list';
import { trans } from 'reactor/localization';
import FormContext from '../utils/form-context';
import TextField from '@material-ui/core/TextField';
import toInputName from 'reinforcements/src/utilities/str/toInputName';
import useRequiredInputValidator from '../hooks/use-required-input-validator';

export default function FormInput(props) {
    const { rules, value, defaultValue, readOnly, required, onInput, name, ...otherProps } = props;
    const [internalValue, setValue] = React.useState(() => {
        if (! Is.empty(defaultValue)) return defaultValue;
        if (! Is.empty(value)) return value;

        return '';
    });

    const [error, setError] = React.useState('');
    const { form } = React.useContext(FormContext);
    const inputRef = React.useRef({
        input: null,
        validate: () => {
            validateInput({
                target: inputRef.current.input,
            });
        }
    });

    const clearRequiredInput = useRequiredInputValidator(required, inputRef, internalValue, setError);

    // on component destroy
    React.useEffect(() => {
        return () => {        
            clearRequiredInput(true);
        };
    }, []);

    React.useEffect(() => {
        if (value === undefined) return;

        setValue(value === null ? '' : value);
    }, [value]);

    /**
     * Validate the input
     */
    const validateInput = e => {
        let input = e.target,
            value = input.value;

        // reset validation input error
        let inputValidation = null;

        for (let inputRule of rules) {
            // if the inputRule is function
            // then wrap it inside an object with `evaluate` key
            if (Is.function(inputRule)) {
                inputRule = {
                    evaluate: inputRule,
                }
            }

            // Get rule options list
            // requiresValue: requires value before evaluating the rule
            // type: requires a certain type before evaluating the rule
            // evaluate: the  rule evaluation function 
            const { requiresValue = true, type, rule, evaluate } = inputRule;

            //  if the requires value is set to true and there is no value
            // then skip the rule
            if (requiresValue && !value) continue;

            // If the rule requires certain input type and 
            // the input type is not the same, then skip the rule
            if (type && type !== input.type) continue;

            // if the rule is not listed in the input props, then skip the rule evaluation
            if (rule && !props[rule]) continue;

            // Finally, evaluate the input against the rule

            const { hasError, errorMessage } = evaluate(value, props, e);

            if (hasError) {
                inputValidation = errorMessage;
                break; // stop the rest of the rules evaluation
            }
        }

        // tell the form if the input is clean or not
        if (form) {
            if (inputValidation) {
                form.dirtyInput(inputRef);
            } else {
                form.cleanInput(inputRef);
            }
        }

        if (! inputValidation) {
            clearRequiredInput();
        }

        setValue(value);
        setError(inputValidation);

        if (onInput) {
            onInput(e);
        }
    };

    const inputProps = {
        readOnly: readOnly,
    };

    let label = trans(props.label || props.placeholder);

    if (otherProps.placeholder) {
        otherProps.placeholder = trans(props.placeholder);
    }

    if (name) {
        otherProps.name = toInputName(name);
    }

    return (
        <TextField
            error={Boolean(error)}
            label={label}
            margin={props.margin || 'normal'}
            inputRef={input => inputRef.current.input = input}
            onInput={validateInput}
            helperText={error}
            fullWidth
            InputProps={inputProps}
            {...otherProps}
            value={internalValue}
        />
    );
}

// export class FormInputOld extends ReactorComponent {
//     state = {
//         validationError: null,
//         value: '',
//     };

//     inputReference = React.createRef(); // createRef

//     /**
//      * {@inheritdoc}
//      */
//     init() {
//         this.set('value', this.props.value || '');
//     }

//     /**
//      * {@inheritdoc}
//      */
//     ready() {
//         this.input = this.inputReference.current;
//     }

//     validate() {
//         this.validateInput({
//             target: this.input,
//         });
//     }

//     onUpdate(props, state) {
//         if (props.value != state.value && props.value !== null) {
//             this.set('value', props.value);
//         }
//     }

//     /**
//      * Validate the input
//      */
//     validateInput(e) {
//         let input = e.target,
//             value = input.value;

//         // reset validation input error
//         let inputValidation = null;

//         this.hasError = false; // reset the hasError flag

//         for (let inputRule of rules) {
//             // if the inputRule is function
//             // then wrap it inside an object with `evaluate` key
//             if (Is.function(inputRule)) {
//                 inputRule = {
//                     evaluate: inputRule,
//                 }
//             }

//             // Get rule options list
//             // requiresValue: requires value before evaluating the rule
//             // type: requires a certain type before evaluating the rule
//             // evaluate: the  rule evaluation function 
//             const { requiresValue = true, type, rule, evaluate } = inputRule;

//             //  if the requires value is set to true and there is no value
//             // then skip the rule
//             if (requiresValue && !value) continue;

//             // If the rule requires certain input type and 
//             // the input type is not the same, then skip the rule
//             if (type && type !== input.type) continue;

//             // if the rule is not listed in the input props, then skip the rule evaluation
//             if (rule && !this.props[rule]) continue;

//             // Finally, evaluate the input against the rule

//             const { hasError, errorMessage } = evaluate(value, this, e);

//             if (hasError) {
//                 inputValidation = errorMessage;
//                 this.hasError = true;
//                 break; // stop the rest of the rules evaluation
//             }
//         }

//         // tell the form if the input is clean or not
//         if (this.form) {
//             if (inputValidation) {
//                 this.form.dirtyInput(this);
//             } else {
//                 this.form.cleanInput(this);
//             }
//         }

//         this.set('value', value);
//         this.set('validationError', inputValidation);

//         if (this.props.onInput) {
//             this.props.onInput(value);
//         }
//     }

//     /**
//      * {@inheritdoc}
//      */
//     render() {
//         const errorMessage = this.get('validationError');
//         let label = trans(this.props.label || this.props.placeholder);
//         let { rules, name, ...props } = this.props;

//         if (this.props.placeholder) {
//             props.placeholder = trans(this.props.placeholder);
//         }

//         if (name) {
//             props.name = toInputName(name);
//         }

//         return (
//             <FormContext.Consumer>
//                 {context => {
//                     if (!this.form) {
//                         const { form } = context;

//                         if (form) {
//                             form.setInput(this);

//                             this.form = form;
//                         }
//                     }

//                     let inputProps = {
//                         readOnly: props.readOnly,
//                     };

//                     return (
//                         <TextField
//                             error={Boolean(errorMessage)}
//                             label={label}
//                             margin={props.margin || 'normal'}
//                             inputRef={this.inputReference}
//                             onInput={this.validateInput.bind(this)}
//                             helperText={errorMessage}
//                             fullWidth
//                             InputProps={inputProps}
//                             {...props}
//                             value={this.state.value}
//                         />
//                     )
//                 }}
//             </FormContext.Consumer>
//         );
//     }
// }

FormInput.propTypes = {
    required: PropTypes.bool,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string.isRequired,
    name: PropTypes.string,
};

FormInput.defaultProps = {
    type: 'text',
    color: 'primary',
    variant: config.get('form.input.variant', 'outlined'),
    rules: rulesList,
};