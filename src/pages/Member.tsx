import React from 'react';
import style from '../styles/style.module.scss';
import { TableRow, TableContainer, ScrollY } from '../components';

export default function MemberPage() {
    const test = [
        [
            { title: 'asdasd' },
            { title: 'asdasd' },
            { title: 'asdasd' },
            { title: 'asdasd' },
            { title: 'asdasd' },
            { title: 'asdasd' },
            { title: 'asdasd' },
            { title: 'asdasd' },
            { title: 'asdasd' },
            { title: 'asdasd' },
        ],
    ];

    const repeatedArray = Array.from({ length: 15 }, () => [...test[0]]);

    return (
        <ScrollY>
            <TableContainer
                head={[
                    { size: '50', title: '1' },
                    { size: '100', title: '2' },
                    { size: '150', title: '3' },
                    { size: '200', title: '4' },
                    { size: '100', title: '5' },
                    { size: '100', title: '6' },
                    { size: '100', title: '7' },
                    { size: '100', title: '8' },
                    { size: '100', title: '9' },
                    { size: '100', title: '10' },
                ]}
            >
                {repeatedArray.map((item, i) => (
                    <TableRow key={i} titleList={item} />
                ))}
            </TableContainer>
        </ScrollY>
    );
}
