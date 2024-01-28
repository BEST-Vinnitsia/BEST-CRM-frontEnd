import React, { useState } from 'react';
import { BreadcrumbsContainer, Button, PopupContainer, PopupWrapper } from '../../components';
import { PATH_BaC } from '../../routes/paths';
import { PageNames } from '../../constants/pageNames';
import { useNavigate } from 'react-router';

const pathMap = [
    { url: PATH_BaC.ROOT, title: PageNames.pages.BaC },
    { url: PATH_BaC.DETAILS, title: PageNames.global.details },
];

export default function BoardAndCoordinatorsDetailPage() {
    const navigate = useNavigate();

    return (
        <>
            <div className="p-4">
                <BreadcrumbsContainer path={pathMap}>
                    <div className="flex">
                        <Button onClick={() => navigate(`${PATH_BaC.EDIT}/id`)} title="Edit" />
                        <Button onClick={() => navigate(PATH_BaC.CREATE)} title="Create" />
                        <Button onClick={() => navigate(PATH_BaC.LIST)} title="List" />
                    </div>
                </BreadcrumbsContainer>
            </div>
        </>
    );
}
