import React from 'react';
import { BreadcrumbsContainer, Button } from '../../components';
import { PATH_CADENCE } from '../../routes/paths';
import { pageNames } from '../../constants';
import { useNavigate } from 'react-router';

const pathMap = [
    { url: PATH_CADENCE.ROOT, title: pageNames.pages.cadence },
    { url: PATH_CADENCE.DETAILS, title: pageNames.global.details },
];

export default function CadenceDetailPage() {
    const navigate = useNavigate();

    return (
        <>
            <div className="p-4">
                <BreadcrumbsContainer path={pathMap}>
                    <div className="flex">
                        <Button onClick={() => navigate(`${PATH_CADENCE.EDIT}/id`)} title="Edit" />
                        <Button onClick={() => navigate(PATH_CADENCE.CREATE)} title="Create" />
                        <Button onClick={() => navigate(PATH_CADENCE.LIST)} title="List" />
                    </div>
                </BreadcrumbsContainer>
            </div>
        </>
    );
}
