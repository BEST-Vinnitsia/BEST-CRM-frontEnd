import React from 'react';
import { BreadcrumbsContainer, Button } from '../../components';
import { PATH_CADENCE } from '../../routes/paths';
import { useNavigate, useParams } from 'react-router-dom';
import { pageNames } from '../../constants';

const pathMapEdit = [
    { url: PATH_CADENCE.ROOT, title: pageNames.pages.cadence },
    { url: PATH_CADENCE.EDIT, title: pageNames.global.edit },
];

const pathMapCreate = [
    { url: PATH_CADENCE.ROOT, title: pageNames.pages.cadence },
    { url: PATH_CADENCE.CREATE, title: pageNames.global.create },
];

export default function CadenceEditPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    return (
        <>
            <div className="p-4">
                <BreadcrumbsContainer path={pathMapEdit}>
                    <div className="flex">
                        <Button onClick={() => navigate(PATH_CADENCE.CREATE)} title="Create" />
                        <Button onClick={() => navigate(`${PATH_CADENCE.DETAILS}/id`)} title="Details" />
                        <Button onClick={() => navigate(PATH_CADENCE.LIST)} title="List" />
                    </div>
                </BreadcrumbsContainer>
            </div>
        </>
    );
}
