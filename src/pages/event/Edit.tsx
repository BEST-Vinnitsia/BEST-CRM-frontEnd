import React from 'react';
import { BreadcrumbsContainer, Button } from '../../components';
import { PATH_EVENT } from '../../routes/paths';
import { useNavigate, useParams } from 'react-router-dom';
import { pageNames } from '../../constants';

const pathMapEdit = [
    { url: PATH_EVENT.ROOT, title: pageNames.pages.event },
    { url: PATH_EVENT.EDIT, title: pageNames.global.edit },
];

const pathMapCreate = [
    { url: PATH_EVENT.ROOT, title: pageNames.pages.event },
    { url: PATH_EVENT.CREATE, title: pageNames.global.create },
];

export default function EventEditPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    return (
        <>
            {id ? (
                <div className="p-4">
                    <BreadcrumbsContainer path={pathMapEdit}>
                        <div className="flex">
                            <Button onClick={() => navigate(PATH_EVENT.CREATE)} title="Create" />
                            <Button onClick={() => navigate(`${PATH_EVENT.DETAILS}/id`)} title="Details" />
                            <Button onClick={() => navigate(PATH_EVENT.LIST)} title="List" />
                        </div>
                    </BreadcrumbsContainer>
                </div>
            ) : (
                <div className="p-4">
                    <BreadcrumbsContainer path={pathMapCreate}>
                        <div className="flex">
                            <Button onClick={() => navigate(`${PATH_EVENT.EDIT}/id`)} title="Edit" />
                            <Button onClick={() => navigate(`${PATH_EVENT.DETAILS}/id`)} title="Details" />
                            <Button onClick={() => navigate(PATH_EVENT.LIST)} title="List" />
                        </div>
                    </BreadcrumbsContainer>
                </div>
            )}
        </>
    );
}
