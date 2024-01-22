import React, { useState } from 'react';
import Input from '../../components/input/Input';
import { useInput } from '../../hooks/useInput';
import { useForm } from '../../hooks/useForm';
import { Button } from '../../components';

export default function LoginPage() {
    const form = useForm([
        useInput({ name: 'login', regExp: /[a-z]/, required: true }),
        useInput({ name: 'password', regExp: /[a-z]/, required: true }),
    ]);

    return (
        <>
            <Input placeholder="login" hook={form.login} />
            <Input placeholder="password" hook={form.password} />
            <Button title="Login" />
        </>
    );
}
