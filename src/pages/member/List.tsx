import React, { useEffect } from 'react';
import { BreadcrumbsContainer, Button, ScrollY } from '../../components';
import { PATH_MEMBER } from '../../routes/paths';
import { utilsActions } from '../../redux/actions/utilsActions';
import Table from '../../components/table v2/table';
import { pageNames } from '../../constants';
import { useNavigate } from 'react-router';

const pathMap = [
    { url: PATH_MEMBER.ROOT, title: pageNames.pages.member },
    { url: PATH_MEMBER.LIST, title: pageNames.global.list },
];

export default function MemberListPage() {
    const navigate = useNavigate();

    useEffect(() => {
        utilsActions.loading(true);
        setTimeout(() => {
            utilsActions.loading(false);
        }, 2000);
    }, []);

    return (
        <>
            <ScrollY>
                <div className="p-4">
                    <BreadcrumbsContainer path={pathMap}>
                        <div className="flex">
                            <Button onClick={() => navigate(`${PATH_MEMBER.EDIT}/id`)} title="Edit" />
                            <Button onClick={() => navigate(PATH_MEMBER.CREATE)} title="Create" />
                            <Button onClick={() => navigate(`${PATH_MEMBER.DETAILS}/id`)} title="Details" />
                        </div>
                    </BreadcrumbsContainer>
                </div>

                <Table />
            </ScrollY>
        </>
    );
}
