import React from 'react';
import { PATH_BaC } from '../../routes/paths';
import { BreadcrumbsContainer, ScrollY, TableContainer, TableRow } from '../../components';
import Table from '../../components/table v2/table';

const pathMap = [{ url: PATH_BaC.ROOT, title: 'board & coordinators' }];

export default function BoardAndCoordinatorsList() {
    return (
        <ScrollY>
            <div className="p-2">
                <BreadcrumbsContainer path={pathMap} title="board & coordinators"></BreadcrumbsContainer>
            </div>
        </ScrollY>
    );
}
