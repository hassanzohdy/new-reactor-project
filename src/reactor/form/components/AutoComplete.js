// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import Is from '@flk/supportive-is';
import useRequiredInputValidator from '../hooks/use-required-input-validator';
import { trans } from '../../localization';
import toInputName from 'reinforcements/src/utilities/str/toInputName';
import { getItem, getItems } from '../utils/select-items';
import { Chip, FormHelperText } from '@material-ui/core';
import HiddenInput from './HiddenInput';
const filter = createFilterOptions();

const defaultMapResponse = response => {
    return response.data.records.map(record => ({
        label: record.name,
        value: record.id,
    }));
};

function mapItemInternally(item) {
    if (Is.string(item)) {
        item = {
            label: trans(item),
            value: item,
        }
    }
    else if (Is.numeric(item)) {
        item = {
            label: item,
            value: item,
        };
    } else if (Is.plainObject(item)) {
        item = {
            ...item,
            label: item.label || item.text || item.name,
            value: item.value || item.id
        };
    }

    return item;
}

export default function AutoComplete({ label, request, mapItem = mapItemInternally, addable = false, closeOnSelect, onChange, loadingText = trans('loading'), noOptionsText = trans('noOptions'), autoHighlight, items, name, value, multiple, required, mapResponse = defaultMapResponse, ...otherProps }) {
    const [open, setOpen] = React.useState(false);
    const [isLoading, setLoading] = React.useState(request !== undefined);

    const mapItems = items => {
        if (!items) return [];
        return items.map(mapItem);
    };

    const [currentItems, setItems] = React.useState(mapItems(items || []));

    const [loaded, requestIsLoaded] = React.useState(false);
    // for multiple selections
    if (multiple && !value) {
        value = [];
    }

    const adjustValue = value => {
        if (value === null) return multiple ? [] : '';

        if (Is.scalar(value) && Is.numeric(value)) {
            value = Number(value);
        }

        if (value === undefined) return '';

        return multiple ? getItems(currentItems, value) : getItem(currentItems, value);
    };

    const onSelection = (e, value, reason) => {
        if (!['remove-option', 'select-option'].includes(reason)) return;

        if (addable) {
            if (Is.array(value)) {
                let lastItem = [].concat(value).pop();
                if (lastItem && !getItem(currentItems, lastItem.value)) {
                    setItems([...currentItems, lastItem]);
                }
            }
        }

        setValue(value);
        // clear the error if value is not empty 
        !Is.empty(value) && clearRequiredInput();

        // set the item as an argument for the onChange event 
        onChange && onChange(multiple ? getItems(currentItems, value) : getItem(currentItems, value));
    }

    const [error, setError] = React.useState(null);
    const [currentValue, setValue] = React.useState(adjustValue(value));
    // get the item object for the given value
    const componentRef = React.useRef();

    const clearRequiredInput = useRequiredInputValidator(required, componentRef, currentValue, setError);
    const hasError = Boolean(error);

    // terminate the auto complete input with clearing the required validation
    React.useEffect(() => {
        return () => clearRequiredInput(true);
    }, []);

    React.useEffect(() => {
        if (!request || loaded) return;

        request().then(response => {
            const items = mapResponse(response);

            setItems(items);
            requestIsLoaded(true);
            setLoading(false);

            if (value) {
                setValue(multiple ? getItems(items, value) : getItem(items, value));
            }
        });
    }, [loaded, request, value]);

    if (closeOnSelect === undefined) {
        closeOnSelect = multiple !== true;
    }

    const RenderHiddenInputs = () => {
        if (!multiple) {
            return <HiddenInput name={name} value={currentValue.value || currentValue} />
        }

        return currentValue.map((item, index) => {
            return <HiddenInput key={index} name={name} value={item.value || item} />
        });
    };

    let filterOptions = undefined;

    if (addable) {
        otherProps.selectOnFocus = true;
        otherProps.clearOnBlur = true;
        otherProps.handleHomeEndKeys = true;
        filterOptions = (options, params) => {
            const filtered = filter(options, params);

            // Suggest the creation of a new value
            if (addable && params.inputValue !== '') {
                filtered.push(mapItem(params.inputValue));
            }

            return filtered;
        };
    }

    return (
        <>
            <RenderHiddenInputs />
            <Autocomplete
                multiple={multiple}
                autoHighlight
                open={open}
                disableClearable={required}
                noOptionsText={noOptionsText}
                disableCloseOnSelect={!closeOnSelect}
                value={currentValue}
                getOptionDisabled={item => item.disabled}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                options={currentItems}
                loadingText={loadingText}
                onChange={onSelection}
                loading={isLoading}
                filterOptions={filterOptions}
                renderTags={(value, getTagProps) => {
                    if (isLoading) return loadingText;
                    return value.map((option, index) => {
                        if (!option || !option.label) return '';
                        return <Chip variant="outlined" label={option.label} {...getTagProps({ index })} />
                    })
                }}
                getOptionSelected={(option, selectedValue) => {
                    return option.value === selectedValue.value;
                }}
                getOptionLabel={(item) => {
                    // as item by all means can not be a scalar value
                    // if its scalar, then it means the items list is being lazy loaded.
                    if (Is.scalar(item)) return '';

                    return item.label;
                }}
                renderInput={(params) => {
                    return <TextField
                        {...params}
                        label={isLoading ? loadingText : label}
                        variant="outlined"
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <React.Fragment>
                                    {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </React.Fragment>
                            ),
                        }}
                    />;
                }}
                {...otherProps}
            />
            <FormHelperText error={hasError}>{error}</FormHelperText>
        </>
    );
}

AutoComplete.defaultProps = {
    autoHighlight: true,
    autoSelect: true,
}