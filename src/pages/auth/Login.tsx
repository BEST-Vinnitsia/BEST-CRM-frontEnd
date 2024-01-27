import React, { useState } from 'react';
import { Input, Button, LongButton, InputPassword } from '../../components';
import { useInput } from '../../hooks/useInput';
import { useForm } from '../../hooks/useForm';
import { Regex } from '../../constants/regex';
import { authService } from '../../services/auth';
import { userActions } from '../../redux/actions/userActions';
import { session } from '../../auth/session';
import { checkErrorType } from '../../utils/errorType';
import { delay } from '../../utils/delay';
import { utilsActions } from '../../redux/actions/utilsActions';

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const [form, valid] = useForm([
        useInput({ name: 'login', regExp: Regex.user.login, required: true, exampleData: 'example@email.com' }),
        useInput({ name: 'password', regExp: Regex.user.password, required: true, exampleData: 'P@ssword1234' }),
    ]);

    const submit = async () => {
        try {
            if (!valid) return;
            setLoading((prev) => !prev);
            const res = await authService.login({ email: form.login.value, password: form.password.value });

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
                    <Input placeholder="Login" hook={form.login} />
                    <InputPassword placeholder="Password" hook={form.password} />
                    <LongButton title="Login" onClick={submit} disable={!valid} loading={loading} />
                </div>
            </div>
        </>
    );
}
