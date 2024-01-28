import React from 'react';
import { BreadcrumbsContainer, Button } from '../../components';
import { PATH_BaC } from '../../routes/paths';
import { useNavigate, useParams } from 'react-router-dom';
import { PageNames } from '../../constants/pageNames';

const pathMapEdit = [
    { url: PATH_BaC.ROOT, title: PageNames.pages.BaC },
    { url: PATH_BaC.EDIT, title: PageNames.global.edit },
];

const pathMapCreate = [
    { url: PATH_BaC.ROOT, title: PageNames.pages.BaC },
    { url: PATH_BaC.CREATE, title: PageNames.global.create },
];

export default function BoardAndCoordinatorsEditPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    return (
        <>
            {id ? (
                <div className="p-4">
                    <BreadcrumbsContainer path={pathMapEdit}>
                        <div className="flex">
                            <Button onClick={() => navigate(PATH_BaC.CREATE)} title="Create" />
                            <Button onClick={() => navigate(`${PATH_BaC.DETAILS}/id`)} title="Details" />
                            <Button onClick={() => navigate(PATH_BaC.LIST)} title="List" />
                        </div>
                    </BreadcrumbsContainer>
                </div>
            ) : (
                <div className="p-4">
                    <BreadcrumbsContainer path={pathMapCreate}>
                        <div className="flex">
                            <Button onClick={() => navigate(`${PATH_BaC.EDIT}/id`)} title="Edit" />
                            <Button onClick={() => navigate(`${PATH_BaC.DETAILS}/id`)} title="Details" />
                            <Button onClick={() => navigate(PATH_BaC.LIST)} title="List" />
                        </div>
                    </BreadcrumbsContainer>
                </div>
            )}
        </>
    );
}
