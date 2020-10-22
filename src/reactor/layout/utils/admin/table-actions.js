import TableViewButton from 'reactor/table/components/Actions/TableViewButton';
import TableEditButton from 'reactor/table/components/Actions/TableEditButton';
import ButtonsFormatter from 'reactor/table/components/Formatters/ButtonsFormatter';
import TableDeleteButton from 'reactor/table/components/Actions/TableDeleteButton';

const tableActions = {
    heading: 'actions',
    formatter: ButtonsFormatter,
    buttons: [TableViewButton, TableEditButton, TableDeleteButton]
};

export default tableActions;