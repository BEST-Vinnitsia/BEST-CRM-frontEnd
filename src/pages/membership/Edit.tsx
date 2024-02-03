import React from 'react';
import { BreadcrumbsContainer, Button } from '../../components';
import { PATH_MEMBERSHIP } from '../../routes/paths';
import { useNavigate, useParams } from 'react-router-dom';
import { pageNames } from '../../constants';

const pathMapEdit = [
    { url: PATH_MEMBERSHIP.ROOT, title: pageNames.pages.membership },
    { url: PATH_MEMBERSHIP.EDIT, title: pageNames.global.edit },
];

const pathMapCreate = [
    { url: PATH_MEMBERSHIP.ROOT, title: pageNames.pages.membership },
    { url: PATH_MEMBERSHIP.CREATE, title: pageNames.global.create },
];

export default function MembershipEditPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    return (
        <>
            {id ? (
                <div className="p-4">
                    <BreadcrumbsContainer path={pathMapEdit}>
                        <div className="flex">
                            <Button onClick={() => navigate(PATH_MEMBERSHIP.CREATE)} title="Create" />
                            <Button onClick={() => navigate(`${PATH_MEMBERSHIP.DETAILS}/id`)} title="Details" />
                            <Button onClick={() => navigate(PATH_MEMBERSHIP.LIST)} title="List" />
                        </div>
                    </BreadcrumbsContainer>
                </div>
            ) : (
                <div className="p-4">
                    <BreadcrumbsContainer path={pathMapCreate}>
                        <div className="flex">
                            <Button onClick={() => navigate(`${PATH_MEMBERSHIP.EDIT}/id`)} title="Edit" />
                            <Button onClick={() => navigate(`${PATH_MEMBERSHIP.DETAILS}/id`)} title="Details" />
                            <Button onClick={() => navigate(PATH_MEMBERSHIP.LIST)} title="List" />
                        </div>
                    </BreadcrumbsContainer>
                </div>
            )}
        </>
    );
}
