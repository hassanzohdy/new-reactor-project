import React from 'react';
import FormModal from 'reactor/form/components/FormModal';
import HiddenInput from 'reactor/form/components/HiddenInput';
import NumberInput from 'reactor/form/components/NumberInput';
import SelectInput from 'reactor/form/components/SelectInput';
import TextAreaInput from 'reactor/form/components/TextareaInput';
import TextInput from 'reactor/form/components/TextInput';
import { trans } from 'reactor/localization';
import walletService from '../../services/wallet-service';

export default function WalletModal({ record = {}, onClose, onSubmit, readOnlyOrder = false, open }) {
    const onFormSubmit = async (e) => {
        if (record.id) {
            const { data } = await walletService.update(record.id, e.target);
            onSubmit(data.record);
        } else {
            const { data } = await walletService.create(e.target);
            onSubmit(data.record);
        }
    };

    if (!open) return null;

    const title = trans((record.id ? 'editItem' : 'addItem'), trans('balance'));

    return (
        <FormModal
            open={open}
            fullScreen
            title={title}
            onClose={onClose}
            onSubmit={onFormSubmit}
        >
            <TextInput name="title" value={record.title} required placeholder="title" />
            <NumberInput name="amount" value={record.amount} required placeholder="balance" />
            <SelectInput
                name="transactionType" 
                required
                readOnly
                label="transactionType"
                items={['deposit', 'withdraw']}
                value={record.transactionType || null}
            />
            {/* <HiddenInput /> */}
            <HiddenInput name="returnOrder" value={record.reason} />
            <HiddenInput name="customer" value={record.customer.id} />
            <NumberInput name="orderId" value={record.orderId} readOnly={readOnlyOrder} required={readOnlyOrder} placeholder="orderId" />
            {/* <TextInput name="reason" value={record.reason} required placeholder="reason" /> */}
            <TextAreaInput name="notes" value={record.notes} placeholder="notes" />
        </FormModal>
    );
}