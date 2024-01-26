import React from 'react';
import { BreadcrumbsContainer } from '../../components';
import { PATH_BaC } from '../../routes/paths';

const pathMap = [
    { url: PATH_BaC.ROOT, title: 'board and coordinators' },
    { url: PATH_BaC.VIEW, title: 'view' },
];

export default function BoardAndCoordinatorsView() {
    return (
        <>
            <BreadcrumbsContainer path={pathMap} title="view"></BreadcrumbsContainer>
        </>
    );
}
