import React from 'react';
import { styled } from '@material-ui/core';
import { MAIN_COLOR } from '../../helpers/style';
import { If } from 'reactor/components/Condition';
import { sendContactMessage } from '../../services/misc';
import SubmitButton from '../../components/SubmitButton';

const SuccessMessage = styled('h3')({
    fontWeight: 'bold',
    textAlign: 'center',
    margin: '5rem 0',
    color: MAIN_COLOR,
});

export default function ContactUsForm() {
    const [isSending, sending] = React.useState(false);
    const [isSent, sent] = React.useState(false);

    const send = e => {
        e.preventDefault();
        sending(true);
        sendContactMessage(e.target).then(() => {
            sending(false);
            sent(true);
        });
    };
    return (
        <>
            <If condition={isSent}>
                <SuccessMessage>تم إرسال الرسالة بنجاح</SuccessMessage>
            </If>

            <If condition={! isSent}>
                <div className="contact-form content-form mt-3 pt-5">
                    <div className="title">
                        <h3>تواصل معنا</h3>
                    </div>

                    <form onSubmit={send}>
                        <input type="text" required className="form-control" name="name" placeholder="الاسم بالكامل" />
                        <input type="email" required className="form-control" name="email" placeholder="البريد الالكتروني" />
                        <input type="text" required className="form-control" name="phone" placeholder="رقم الهاتف" />
                        <textarea className="form-control" name="message" placeholder="الرسالة"></textarea>
                        <SubmitButton submitting={isSending} className="btn main-btn">إرسال</SubmitButton>
                    </form>
                </div>

            </If>
        </>
    )
}