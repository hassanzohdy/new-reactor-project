import React from 'react';
import PropTypes from 'prop-types';
import { trans } from 'reactor/localization';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import toInputName from 'reinforcements/src/utilities/str/toInputName';
import { DISABLE_INPUT_CHANGE } from '../utils/flags';

export default function withCheckbox(WrappedCheckboxComponent) {
    const Checkbox = React.forwardRef(function ({ label, defaultChecked, labelPlacement = 'end', labelClasses = {}, readOnly, checked: inputChecked, name = '', value = 1, onChange, ...otherProps }, ref) {
        const [checked, setChecked] = React.useState(() => {
            if (defaultChecked !== undefined) return Boolean(defaultChecked);

            if (! [null, undefined].includes(inputChecked)) return Boolean(inputChecked);

            return false;
        });

        const handleChange = e => {
            const newInputCheckedState = e.target.checked;

            if (readOnly) return;
            
            const output = onChange(newInputCheckedState, e.target.value);

            // disable input update if the event of onChange returns -1 
            if (output === DISABLE_INPUT_CHANGE) return;

            setChecked(newInputCheckedState);
        };

        React.useEffect(() => {
            if (inputChecked === undefined) return;

            if (Boolean(inputChecked) === checked) return;
            
            setChecked(Boolean(inputChecked));

            // handleChange({
            //     target: {
            //         checked: Boolean(inputChecked)
            //     }
            // });
        }, [inputChecked]);

        const checkboxInput = <WrappedCheckboxComponent name={toInputName(name)} value={value} color="primary" {...otherProps} checked={checked} onChange={handleChange} />;

        if (!label) {
            return checkboxInput;
        }

        return (
            <FormControlLabel ref={ref} labelPlacement={labelPlacement} classes={labelClasses} control={checkboxInput} label={trans(label)} />
        )
    });

    Checkbox.propTypes = {
        label: PropTypes.string,
        name: PropTypes.string,
        onChange: PropTypes.func.isRequired,
        defaultChecked: PropTypes.bool,
        checked: PropTypes.bool,
        readOnly: PropTypes.bool,
    }

    Checkbox.defaultProps = {
        onChange: () => { },
    }

    return Checkbox;
}