import React from 'react';
import { BreadcrumbsContainer } from '../../components';
import { PATH_BaC } from '../../routes/paths';
import { useParams } from 'react-router-dom';

const pathMapEdit = [
    { url: PATH_BaC.ROOT, title: 'board and coordinators' },
    { url: PATH_BaC.EDIT, title: 'edit' },
];

const pathMapCreate = [
    { url: PATH_BaC.ROOT, title: 'board and coordinators' },
    { url: PATH_BaC.EDIT, title: 'edit' },
];

export default function BoardAndCoordinatorsEdit() {
    const { memberId } = useParams();

    return (
        <>
            <BreadcrumbsContainer
                path={memberId ? pathMapEdit : pathMapCreate}
                title={memberId ? 'edit' : 'create'}
            ></BreadcrumbsContainer>
        </>
    );
}
