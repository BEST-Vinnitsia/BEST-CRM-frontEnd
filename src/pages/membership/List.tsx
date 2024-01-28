import React from 'react';
import { BreadcrumbsContainer, Button, Select } from '../../components';
import { PATH_MEMBERSHIP } from '../../routes/paths';
import { pageNames } from '../../constants';
import { useNavigate } from 'react-router';

const pathMap = [
    { url: PATH_MEMBERSHIP.ROOT, title: pageNames.pages.membership },
    { url: PATH_MEMBERSHIP.LIST, title: pageNames.global.list },
];

export default function MembershipListPage() {
    const navigate = useNavigate();

    return (
        <>
            <div className="p-4">
                <BreadcrumbsContainer path={pathMap}>
                    <div className="flex">
                        <Button onClick={() => navigate(`${PATH_MEMBERSHIP.EDIT}/id`)} title="Edit" />
                        <Button onClick={() => navigate(PATH_MEMBERSHIP.CREATE)} title="Create" />
                        <Button onClick={() => navigate(`${PATH_MEMBERSHIP.DETAILS}/id`)} title="Details" />
                    </div>
                </BreadcrumbsContainer>
            </div>

            <div className="px-4 py-3">
                <Select />
            </div>
        </>
    );
}
