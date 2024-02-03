import React from 'react';

interface IProps {
    children: React.ReactNode;
}

export default function THead({ children }: IProps) {
    return <thead>{children}</thead>;
}
