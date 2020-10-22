import '../locales/ar';
import '../locales/en';
import React from 'react';
import TableHead from './TableHead';
import TableBody from './TableBody';
import { Obj } from 'reinforcements';
import TableFilter from './TableFilter';
import TableToolBar from './TableToolBar';
import Paper from '@material-ui/core/Paper';
import TablePagination from './TablePagination';
import MaterialTable from '@material-ui/core/Table';
import TableProvider from '../providers/table-provider';
import useLayoutClasses from 'reactor/layout/utils/style';
import TableContainer from '@material-ui/core/TableContainer';
import { LightBackdrop } from 'reactor/layout/components/Backdrop';

export default function Table(props) {
    let { options, records, pagination: defaultPagination, isLoading: defaultIsLoading, onChange } = props;
    const [tableRecords, setRecords] = React.useState(records);
    const [currentTableInfo, setTableInfo] = React.useState({});
    const [pagination, setPaginationInfo] = React.useState(defaultPagination);
    const [isLoading, loading] = React.useState(defaultIsLoading);

    const classes = useLayoutClasses();

    React.useEffect(() => {
        setRecords(records);
    }, [records]);

    React.useEffect(() => {
        loading(defaultIsLoading);
    }, [defaultIsLoading]);
    
    React.useEffect(() => {
        setPaginationInfo(defaultPagination);
    }, [defaultPagination]);

    const updateTableInfo = newInfo => {
        const newTableInfo = Obj.merge(currentTableInfo, newInfo);

        setTableInfo(newTableInfo);

        onChange && onChange(newTableInfo);
    };

    const setPageNumber = pageNumber => {
        updateTableInfo({
            page: pageNumber,
        });
    };

    const setItemsPerPage = itemsPerPage => {
        updateTableInfo({
            itemsPerPage,
            page: 1, // reset again page to 1
        });
    };

    const tableOptions = {
        options,
        pagination,
        setPageNumber,
        setPaginationInfo,
        setItemsPerPage,
        loading,
        records: tableRecords,
        updateRecords: setRecords,
        service: options.service,
    };

    return (
        <TableProvider.Provider value={tableOptions}>
            <TableToolBar />

            <TableFilter />
            
            <Paper className={classes.positionRelative}>
                <LightBackdrop open={isLoading} />
                <TableContainer>
                    <MaterialTable>
                        <TableHead />
                        <TableBody isLoading={isLoading} />
                    </MaterialTable>
                </TableContainer>
                {pagination &&
                    <TablePagination />
                }
            </Paper>
        </TableProvider.Provider>
    );
}