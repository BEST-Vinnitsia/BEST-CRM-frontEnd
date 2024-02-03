import React, { useEffect } from 'react';
import { BreadcrumbsContainer, Button, ScrollY } from '../../components';
import { PATH_EVENT } from '../../routes/paths';
import { pageNames } from '../../constants';
import { useNavigate } from 'react-router';

const pathMap = [
    { url: PATH_EVENT.ROOT, title: pageNames.pages.event },
    { url: PATH_EVENT.DETAILS, title: pageNames.global.details },
];

export default function EventDetailPage() {
    const navigate = useNavigate();

    return (
        <>
            <div className="p-4">
                <BreadcrumbsContainer path={pathMap}>
                    <div className="flex">
                        <Button onClick={() => navigate(`${PATH_EVENT.EDIT}/id`)} title="Edit" />
                        <Button onClick={() => navigate(PATH_EVENT.CREATE)} title="Create" />
                        <Button onClick={() => navigate(PATH_EVENT.LIST)} title="List" />
                    </div>
                </BreadcrumbsContainer>
            </div>
        </>
    );
}
