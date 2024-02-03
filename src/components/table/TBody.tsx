import React from 'react';

interface IProps {
    children: React.ReactNode;
}

export default function TBody({ children }: IProps) {
    return <tbody>{children}</tbody>;
}
