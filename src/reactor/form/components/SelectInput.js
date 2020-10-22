import React from 'react';
import Label from './Label';
import { Random } from 'reinforcements';
import { getItem } from '../utils/select-items';
import { Select, FormHelperText } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { selectItems, RenderSelectedValues } from './SelectInputHelpers';
import useRequiredInputValidator from '../hooks/use-required-input-validator';
import Is from '@flk/supportive-is';
import { trans } from 'reactor/localization';
import toInputName from 'reinforcements/src/utilities/str/toInputName';

const defaultMapResponse = response => {
    return response.data.records.map(record => ({
        label: record.name,
        value: record.id,
    }));
};

const mapItems = items => {
    if (!items) return [];
    return items.map(item => {
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
    });
};

export default function SelectInput({ id, label, name, grouped, classes = {}, fullWidth = true, variant = 'outlined', onChange, lazyLoading, request, mapResponse = defaultMapResponse, labelId, placeholder, required, value = '', items, groups, imagable, iconable, multiple, readOnly, none, ...otherProps }) {
    // for multiple selections
    if (multiple && !value) {
        value = [];
    }

    const [currentItems, setItems] = React.useState(mapItems(items || []));

    const [isLoading, setLoading] = React.useState(lazyLoading);

    const [loaded, requestIsLoaded] = React.useState(false);

    const adjustValue = value => {
        if (isLoading) return '';

        if (value === null) return '';

        if (Is.numeric(value)) return Number(value);

        return value;

        // isLoading ? '' : (value === 0 ? 0 : (value === null ? '' : value))
    };

    const [opened, setOpenedStatus] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [currentValue, setValue] = React.useState(adjustValue(value));
    // get the item object for the given value
    const componentRef = React.useRef();

    const clearRequiredInput = useRequiredInputValidator(required, componentRef, currentValue, setError);
    const hasError = Boolean(error);

    // const checkNoneItem = React.useCallback(() => {
    const checkNoneItem = (() => {
        if (none && !currentItems.find(item => item.none)) {
            // add none 
            const noneItem = {
                value: '__none',
                label: trans('none'),
                none: true,
            };

            setItems([noneItem, ...currentItems]);
        }
    });

    // const checkPlaceholder = React.useCallback(() => {
    const checkPlaceholder = (() => {
        if (placeholder && currentItems && !currentItems.find(item => item.placeholder)) {
            const placeholderItem = {
                value: '__placeholder',
                label: trans(placeholder),
                disabled: true,
                placeholder: true,
            };

            setItems([placeholderItem, ...currentItems]);
        }
    });

    React.useEffect(() => {
        setItems(mapItems(items));
        checkPlaceholder();
        checkNoneItem();
    }, [items]);
    
    // terminate the select input with clearing the required validation
    React.useEffect(() => {
        return () => clearRequiredInput(true); 
    }, []);

    React.useEffect(() => {
        setValue(adjustValue(value));
    }, [value]);

    React.useEffect(() => {
        if (!lazyLoading || loaded) return;

        request().then(response => {
            const items = mapResponse(response);

            checkPlaceholder();
            checkNoneItem();

            setItems(items);
            requestIsLoaded(true);
            setLoading(false);
            setValue(value || '');
        });

    }, [lazyLoading, loaded, request, mapResponse, placeholder, value]);

    checkPlaceholder();
    checkNoneItem();

    const handleChange = (event) => {
        let value = event.target.value;
        setValue(value);
        // select the item by value
        let item = getItem(currentItems, value);
        // set the item as an argument for the onChange event 
        onChange && onChange(item);

        if (value) {
            clearRequiredInput();
        }
    };

    return (
        <FormControl variant={variant} fullWidth={fullWidth} className={classes.formControl} error={hasError}>
            <Label component={InputLabel} required={required} id={labelId} label={label} />
            <Select
                id={id}
                displayEmpty
                label={label}
                labelId={labelId}
                onOpen={() => setOpenedStatus(true)}
                onBlur={() => setOpenedStatus(false)}
                multiple={multiple}
                value={currentValue}
                name={toInputName(name)}
                onChange={handleChange}
                renderValue={selected => <RenderSelectedValues grouped={grouped} opened={opened} placeholder={placeholder} label={label} items={currentItems} selected={selected} />}
                children={selectItems(currentItems, grouped, isLoading)}
                {...otherProps}
            />

            {hasError &&
                <FormHelperText error={hasError}>{error}</FormHelperText>
            }

        </FormControl>
    );
}

SelectInput.defaultProps = {
    id: Random.id(),
    labelId: Random.id(),
    value: '',
}