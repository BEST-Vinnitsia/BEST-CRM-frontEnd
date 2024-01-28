import React from 'react';
import { BreadcrumbsContainer, Button } from '../../components';
import { PATH_COMMITTEE } from '../../routes/paths';
import { useNavigate, useParams } from 'react-router-dom';
import { pageNames } from '../../constants';

const pathMapEdit = [
    { url: PATH_COMMITTEE.ROOT, title: pageNames.pages.committee },
    { url: PATH_COMMITTEE.EDIT, title: pageNames.global.edit },
];

const pathMapCreate = [
    { url: PATH_COMMITTEE.ROOT, title: pageNames.pages.committee },
    { url: PATH_COMMITTEE.CREATE, title: pageNames.global.create },
];

export default function CommitteeEditPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    return (
        <>
            {id ? (
                <div className="p-4">
                    <BreadcrumbsContainer path={pathMapEdit}>
                        <div className="flex">
                            <Button onClick={() => navigate(PATH_COMMITTEE.CREATE)} title="Create" />
                            <Button onClick={() => navigate(`${PATH_COMMITTEE.DETAILS}/id`)} title="Details" />
                            <Button onClick={() => navigate(PATH_COMMITTEE.LIST)} title="List" />
                        </div>
                    </BreadcrumbsContainer>
                </div>
            ) : (
                <div className="p-4">
                    <BreadcrumbsContainer path={pathMapCreate}>
                        <div className="flex">
                            <Button onClick={() => navigate(`${PATH_COMMITTEE.EDIT}/id`)} title="Edit" />
                            <Button onClick={() => navigate(`${PATH_COMMITTEE.DETAILS}/id`)} title="Details" />
                            <Button onClick={() => navigate(PATH_COMMITTEE.LIST)} title="List" />
                        </div>
                    </BreadcrumbsContainer>
                </div>
            )}
        </>
    );
}
