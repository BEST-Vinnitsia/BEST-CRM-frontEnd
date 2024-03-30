import React, { useState } from 'react';
import { useForm, useInput } from '../../hooks';
import { regex } from '../../constants';
import { authService } from '../../services/auth';
import { userActions } from '../../redux/actions/userActions';
import { session } from '../../utils/session';
import { checkErrorType, delay } from '../../utils';
import { utilsActions } from '../../redux/actions/utilsActions';

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const [form, valid] = useForm([
        useInput({
            name: 'login',
            regExp: regex.user.login,
            required: true,
            exampleData: 'example@email.com',
        }),
        useInput({
            name: 'password',
            regExp: regex.user.password,
            required: true,
            exampleData: 'P@ssword1234',
        }),
    ]);

    const submit = async () => {
        try {
            if (!valid) return;
            setLoading((prev) => !prev);
            const res = await authService.login({
                email: form.login.value,
                password: form.password.value,
            });

            userActions.setAccessToken(res.access);
            userActions.setRefreshToken(res.refresh);

            session.restoreSession(res);
        } catch (error) {
            if (!checkErrorType(error)) return;
            await delay(1000);
            setLoading((prev) => !prev);
            utilsActions.addMessage({ message: error.message, status: 'error' });
        }
    };

    return (
        <>
            <div className="flex w-full mt-40 justify-center items-center">
                <div className="block max-w-md min-w-80 w-full px-2">
                    {/*<Input label="Login" hookProps={form.login} />*/}
                    {/*<InputPassword label="Password" hookProps={form.password} />*/}
                    {/*<ButtonLong title="Login" onClick={submit} disable={!valid} loading={loading} />*/}
                </div>
            </div>
        </>
    );
}
