import React from 'react';
import { PATH_EVENT } from '../../routes/paths';
import { PageNames } from '../../constants/pageNames';
import { useNavigate } from 'react-router';
import { BreadcrumbsContainer, Button } from '../../components';

const pathMap = [
    { url: PATH_EVENT.ROOT, title: PageNames.pages.event },
    { url: PATH_EVENT.LIST, title: PageNames.global.list },
];

export default function EventListPage() {
    const navigate = useNavigate();

    return (
        <>
            <div className="p-4">
                <BreadcrumbsContainer path={pathMap}>
                    <div className="flex">
                        <Button onClick={() => navigate(`${PATH_EVENT.EDIT}/id`)} title="Edit" />
                        <Button onClick={() => navigate(PATH_EVENT.CREATE)} title="Create" />
                        <Button onClick={() => navigate(`${PATH_EVENT.DETAILS}/id`)} title="Details" />
                    </div>
                </BreadcrumbsContainer>
            </div>
        </>
    );
}
