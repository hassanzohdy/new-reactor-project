import React from 'react';
import { Button, IconButton, styled, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import useRequest from 'reactor/hooks/useRequest';
import walletService from '../../services/wallet-service';
import CircleProgress from 'reactor/components/Preloaders/CircleProgress';
import For from 'reactor/components/For';
import { trans } from 'reactor/localization';
import ColoredIcon from 'reactor/components/ColoredIcon';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import Tooltip from 'reactor/components/Tooltip';
import WalletModal from '../Wallet/WalletModal';
import { ElseIf, If } from 'reactor/components/Condition';

export const BoldCell = styled(TableCell)({
    fontWeight: 'bold',
});

export default function CustomerWalletTab({ customer }) {
    const [isLoading, loading] = React.useState(true);
    const [transactions, setTransactions] = React.useState([]);

    const [walletTransaction, openWalletModal] = React.useState(null);

    const [response] = useRequest(() => walletService.list({
        customer: customer.id
    }), loading);

    function addNewTransaction() {
        return {
            customer,
        };
    }

    React.useEffect(() => {
        if (!response) return;
        setTransactions(response.data.records);
    }, [response]);

    const updateWalletTransaction = transaction => {
        console.log(transaction);

        setTransactions([transaction, ...transactions]);
        openWalletModal(null);
    };

    if (isLoading) {
        return <CircleProgress />
    }

    return (
        <>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>العملية</TableCell>
                        <TableCell>تاريخ الاضافة</TableCell>
                        <TableCell>تمت بواسطة</TableCell>
                        <TableCell>رقم الطلب</TableCell>
                        <TableCell>المبلغ</TableCell>
                        <TableCell>نوع العملية</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <For array={transactions} render={transaction => (
                        <TableRow>
                            <BoldCell>{transaction.id}</BoldCell>
                            <BoldCell>{transaction.title}</BoldCell>
                            <BoldCell>{transaction.createdAt.format}</BoldCell>
                            <BoldCell>
                                <If condition={transaction.creatorType === 'user'}>
                                    {transaction.createdBy.name}
                                </If>                                
                                <ElseIf condition={transaction.creatorType !== 'user'}>
                                    العميل
                                </ElseIf>
                            </BoldCell>
                            <BoldCell>{transaction.orderId}</BoldCell>
                            <BoldCell>{transaction.amount}</BoldCell>
                            <BoldCell>{trans(transaction.transactionType)}</BoldCell>
                        </TableRow>
                    )}
                    />
                </TableBody>
            </Table>

            <Tooltip title={trans('add')}>
                <IconButton onClick={() => openWalletModal(addNewTransaction())}>
                    <ColoredIcon icon={AddCircleIcon} color="#399dc5" />
                </IconButton>
            </Tooltip>

            <WalletModal
                open={walletTransaction !== null}
                onClose={() => openWalletModal(null)}
                onSubmit={updateWalletTransaction}
                record={walletTransaction}
            />
        </>
    );
}