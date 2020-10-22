import './login.scss';
import user from 'user';
import React from 'react';
import { styled } from '@material-ui/core';
import { trans } from 'reactor/localization';
import Helmet from 'reactor/components/Helmet';
import Form from 'reactor/form/components/Form';
import Layout from 'reactor/layout/components/Layout';
import { navigateBack } from 'reactor/router/navigator';
import { TextCenter } from 'reactor/components/Aligned';
import { login } from 'modules/admin/users/services/auth';
import FormError from 'reactor/form/components/FormError';
import Button from 'reactor/form/components/SubmitButton';
import EmailInput from 'reactor/form/components/EmailInput';
import PasswordInput from 'reactor/form/components/PasswordInput';
import ReactorComponent from 'reactor/components/ReactorComponent';

const SubmitButton = styled(Button)({
    background: '#333',
    color: '#FFF',
});

export default class Login extends ReactorComponent {
    /**
     * {@inheritdoc}
     */
    state = {};
    /**
     * Submit login form
     */
    login = async (e, form) => {
        this.set('error', null); // make sure to clear previous errors

        try {
            let { data } = await login(e.target);

            if (data.error) {
                return this.set('error', data.error);
            }

            if (data.user) {
                user.login(data.user);

                navigateBack('/');
            }
        } catch (error) {
            form.isSubmitting = false;
            if (!error.response) return;

            let { errors, error: errorText } = error.response.data;

            if (errorText) {
                this.set('error', errorText);
            } else if (errors) {
                this.set('error', errors);
            }
        }
    };

    /**
     * {@inheritdoc}
     */
    render() {
        const title = trans('login');
        return (
            <Layout>
                <Helmet title={title} />
                <div id="login-page">
                    <h1>{trans('welcome')}</h1>

                    <Form onSubmit={this.login}>
                        {form => {
                            return (
                                <>
                                    <FormError error={this.get('error')} />

                                    <EmailInput
                                        autoFocus
                                        className="form-control"
                                        name="email"
                                        required
                                    />

                                    <PasswordInput
                                        required
                                        minLength={8}
                                        name="password"
                                        className="form-control"
                                    />

                                    {/* <MultilineTextFields /> */}

                                    <TextCenter>
                                        <SubmitButton fullWidth={form.isSubmitting !== true} theme="dark">{title}</SubmitButton>
                                    </TextCenter>
                                </>
                            )
                        }}
                    </Form>
                </div>
            </Layout>
        );
    }
}