import React from 'react';
import useTable from '../hooks/use-table';
import { trans } from 'reactor/localization';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FilterListIcon from '@material-ui/icons/FilterList';
import TableFilterForm from './TableFilterForm';
import { Collapse } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
    appBar: {
        color: 'inherit',
        backgroundColor: '#FFF',
        marginBottom: '0.4rem',
    },
    title: {
        flexGrow: 1,
    },
}));

export default function TableFilter() {
    const classes = useStyles();

    const { options } = useTable();

    const { filter } = options.table || {};

    const [opened, openFilter] = React.useState(true);

    if (!filter) return null;

    const toggleFilter = () => {
        openFilter(! opened);
    };

    return (
        <div className={classes.root}>
            <AppBar className={classes.appBar} position="static">
                <Toolbar>
                    <IconButton onClick={e => toggleFilter()}>
                        <FilterListIcon />
                        <Typography variant="h6" className={classes.title}>
                            {trans('table.filter')}
                        </Typography>
                    </IconButton>
                </Toolbar>
                <Collapse in={opened}>
                    <TableFilterForm />
                </Collapse>
            </AppBar>
        </div>
    );
}