import React from 'react';
import { PATH_BaC } from '../../routes/paths';
import { BreadcrumbsContainer, Button, ScrollY, TableContainer, TableRow } from '../../components';
import { useNavigate } from 'react-router-dom';

const pathMap = [{ url: PATH_BaC.ROOT, title: 'board & coordinators' }];

export default function BoardAndCoordinatorsList() {
    const navigation = useNavigate();
    return (
        <ScrollY>
            <div className="p-2">
                <BreadcrumbsContainer path={pathMap} title="board & coordinators" />
            </div>

            <div className="m-2 flex">
                <div className="m-2">
                    <Button title="Create" onClick={() => navigation(PATH_BaC.CREATE)} />
                </div>
                <div className="m-2">
                    <Button title="View" onClick={() => navigation(PATH_BaC.VIEW)} />
                </div>
            </div>
        </ScrollY>
    );
}
