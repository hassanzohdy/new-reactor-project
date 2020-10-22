import React from 'react';
import useTable from '../hooks/use-table';
import Form from '../../form/components/Form';
import For from 'reactor/components/For';
import TextInput from 'reactor/form/components/TextInput';
import SelectInput from 'reactor/form/components/SelectInput';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import router from '../../router';
import './TableFilterForm.scss';
import HiddenInput from '../../form/components/HiddenInput';
import { Obj } from 'reinforcements';
import SubmitButton from '../../form/components/SubmitButton';
import { trans } from '../../localization';
import { currentRoute, navigateTo, updateQueryString } from '../../router/navigator';
import { Button, IconButton, styled } from '@material-ui/core';
import Tooltip from '../../components/Tooltip';
import ColoredIcon from '../../components/ColoredIcon';
import ReplayIcon from '@material-ui/icons/Replay';

const CircleButton = styled(Button)({
    // borderRadius: '50%',
    // padding: '0.5rem',
});

const availableFilters = {
    search: {
        component: TextInput,
        defaultProps: {
            margin: 'dense',
            style: {
                marginTop: 0
            }
        }
    },
    select: {
        component: SelectInput,
        defaultProps: {
            margin: 'dense',
        }
    },
};

export default function TableFilterForm() {
    const { options, page, updateRecords, loading, setPaginationInfo } = useTable();

    const { service } = options;

    const { filter } = options.table || {};

    if (!filter) return null;

    const queryString = router.queryString;

    filter.forEach(singleFilter => {
        if (!singleFilter.component && singleFilter.type) {
            singleFilter.component = availableFilters[singleFilter.type].component;
        }

        // if (!singleFilter.value) {
        //     singleFilter.value = queryString.get(singleFilter.query || singleFilter.name);
        // }

        singleFilter.inputProps = Obj.merge({}, availableFilters[singleFilter.type].defaultProps || {}, singleFilter, singleFilter.inputProps);
        delete singleFilter.inputProps.inputProps;
        delete singleFilter.inputProps.component;
        delete singleFilter.inputProps.col;
        delete singleFilter.inputProps.type;
    });

    const resetForm = () => {
        navigateTo(currentRoute());
    };

    const submitFilter = (e, form) => {
        loading(true);
        updateQueryString(form.toQueryString());
        service.list(form.toObject()).then(response => {
            setPaginationInfo(response.data.paginationInfo);
            updateRecords(response.data.records);
            form.submitting(false);
            loading(false);
        });
    };

    return (
        <Form className="filterForm" onSubmit={submitFilter}>
            <HiddenInput name="page" value={page || 1} />
            <GridContainer>
                <For array={filter} render={singleFilter => (
                    <GridItem sm={singleFilter.col}>
                        <singleFilter.component {...singleFilter.inputProps} value={singleFilter.value || queryString.get(singleFilter.query || singleFilter.name)} />
                    </GridItem>
                )}
                />
                <GridItem sm={2}>
                    <SubmitButton color="primary" variant="contained" >{trans('table.filter')}</SubmitButton>
                    <Tooltip title={trans('table.reset')}>
                        <CircleButton onClick={resetForm}>
                            <ColoredIcon icon={ReplayIcon} color="orange" />
                        </CircleButton>
                    </Tooltip>
                </GridItem>
            </GridContainer>
        </Form>
    );
}