import React from 'react';
import { BreadcrumbsContainer, Button } from '../../components';
import { PATH_MEETING } from '../../routes/paths';
import { pageNames } from '../../constants';
import { useNavigate } from 'react-router';

const pathMap = [
    { url: PATH_MEETING.ROOT, title: pageNames.pages.meeting },
    { url: PATH_MEETING.DETAILS, title: pageNames.global.details },
];

export default function MeetingDetailPage() {
    const navigate = useNavigate();

    return (
        <>
            <div className="p-4">
                <BreadcrumbsContainer path={pathMap}>
                    <div className="flex">
                        <Button onClick={() => navigate(`${PATH_MEETING.EDIT}/id`)} title="Edit" />
                        <Button onClick={() => navigate(PATH_MEETING.CREATE)} title="Create" />
                        <Button onClick={() => navigate(PATH_MEETING.LIST)} title="List" />
                    </div>
                </BreadcrumbsContainer>
            </div>
        </>
    );
}
