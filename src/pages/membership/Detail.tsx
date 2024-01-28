import React, { useEffect } from 'react';
import { BreadcrumbsContainer, Button, ScrollY } from '../../components';
import { PATH_BaC, PATH_MEMBER, PATH_MEMBERSHIP } from '../../routes/paths';
import { utilsActions } from '../../redux/actions/utilsActions';
import Table from '../../components/table v2/table';
import { PageNames } from '../../constants/pageNames';
import { useNavigate } from 'react-router';

const pathMap = [
    { url: PATH_MEMBERSHIP.ROOT, title: PageNames.pages.membership },
    { url: PATH_MEMBERSHIP.DETAILS, title: PageNames.global.details },
];

export default function MembershipDetailPage() {
    const navigate = useNavigate();

    return (
        <>
            <div className="p-4">
                <BreadcrumbsContainer path={pathMap}>
                    <div className="flex">
                        <Button onClick={() => navigate(`${PATH_MEMBERSHIP.EDIT}/id`)} title="Edit" />
                        <Button onClick={() => navigate(PATH_MEMBERSHIP.CREATE)} title="Create" />
                        <Button onClick={() => navigate(PATH_MEMBERSHIP.LIST)} title="List" />
                    </div>
                </BreadcrumbsContainer>
            </div>
        </>
    );
}
