import React from 'react';
import { Button, styled, Table, TableBody, TableCell, TableRow } from '@material-ui/core';
import { navigateTo } from 'reactor/router';

export const BoldCell = styled(TableCell)({
    fontWeight: 'bold',
});


export default function CustomerGeneralTab({ customer }) {
    return (
        <>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell>اسم العميل</TableCell>
                        <BoldCell>{customer.name}</BoldCell>
                        <TableCell>#</TableCell>
                        <BoldCell>{customer.id}</BoldCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>البريد الاكتروني</TableCell>
                        <BoldCell>{customer.email}</BoldCell>
                        <TableCell>رقم الجوال</TableCell>
                        <BoldCell>{customer.phoneNumber}</BoldCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>تاريخ التسجيل</TableCell>
                        <BoldCell>{customer.createdAt.format}</BoldCell>
                        <TableCell>رصيد المحفظة</TableCell>
                        <BoldCell>{customer.walletBalance.toLocaleString()} رس</BoldCell>
                    </TableRow>
                </TableBody>
            </Table>

            <Button color="secondary" variant="contained" onClick={() => navigateTo(`/orders?customer=${customer.id}`)}>
                عرض طلبات العميل
            </Button>
        </>
    );
}