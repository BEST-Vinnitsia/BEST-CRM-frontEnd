import React, { useState } from 'react';
import { BreadcrumbsContainer, Button, PopupContainer, PopupWrapper } from '../../components';
import { PATH_MEMBER } from '../../routes/paths';
import { utilsActions } from '../../redux/actions/utilsActions';
import { pageNames } from '../../constants';
import { useNavigate } from 'react-router';

const pathMap = [
    { url: PATH_MEMBER.ROOT, title: pageNames.pages.member },
    { url: PATH_MEMBER.DETAILS, title: pageNames.global.details },
];

export default function MemberDetailPage() {
    const navigate = useNavigate();

    return (
        <>
            <div className="p-4">
                <BreadcrumbsContainer path={pathMap}>
                    <div className="flex">
                        <Button onClick={() => navigate(`${PATH_MEMBER.EDIT}/id`)} title="Edit" />
                        <Button onClick={() => navigate(PATH_MEMBER.CREATE)} title="Create" />
                        <Button onClick={() => navigate(PATH_MEMBER.LIST)} title="List" />
                    </div>
                </BreadcrumbsContainer>
            </div>
        </>
    );
}
