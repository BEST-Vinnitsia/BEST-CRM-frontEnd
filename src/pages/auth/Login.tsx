import React, { useState } from 'react';
import { Input, Button, LongButton, InputPassword } from '../../components';
import { useInput } from '../../hooks/useInput';
import { useForm } from '../../hooks/useForm';
import { Regex } from '../../constants/regex';

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const [form, valid] = useForm([
        useInput({ name: 'login', regExp: Regex.user.login, required: true, exampleData: 'example@email.com' }),
        useInput({ name: 'password', regExp: Regex.user.password, required: true, exampleData: 'P@ssword1234' }),
    ]);

    const submit = () => {
        if (!valid) return;
        setLoading((prev) => !prev);
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
