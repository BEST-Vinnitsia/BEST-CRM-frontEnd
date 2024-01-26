import React from 'react';
import { PATH_BaC } from '../../routes/paths';
import { BreadcrumbsContainer, ScrollY, TableContainer, TableRow } from '../../components';
import Table from '../../components/table v2/table';

const pathMap = [{ url: PATH_BaC.ROOT, title: 'board & coordinators' }];

const demo = [
    [
        { title: 'photo' },
        { title: 'Name surname' },
        { title: 'full' },
        { title: 'asd@gmail.com' },
        { title: '0971234567' },
        { title: '@telegram' },
        { title: 'IT' },
        { title: 'IT-Revolution' },
        { title: '01.01.2001' },
        { title: 'ФМІБ УБ-21' },
    ],
];

export default function BoardAndCoordinatorsList() {
    const repeatedArray = Array.from({ length: 5 }, () => [...demo[0]]);

    return (
        <ScrollY>
            <div className="p-2">
                <BreadcrumbsContainer path={pathMap} title="board & coordinators"></BreadcrumbsContainer>
            </div>

            <Table />
        </ScrollY>
    );
}
