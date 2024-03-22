import React from 'react';
import { PATH_MEETING } from '../../routes/paths';
import { useNavigate, useParams } from 'react-router-dom';
import { pageNames } from '../../constants';

const pathMapEdit = [
    { url: PATH_MEETING.ROOT, title: pageNames.pages.meeting },
    { url: PATH_MEETING.EDIT, title: pageNames.global.edit },
];

const pathMapCreate = [
    { url: PATH_MEETING.ROOT, title: pageNames.pages.meeting },
    { url: PATH_MEETING.CREATE, title: pageNames.global.create },
];

export default function MeetingEditPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    return (
        <>
            <div className="p-4">
                {/*<BreadcrumbsContainer path={pathMapEdit}>*/}
                {/*    <div className="flex">*/}
                {/*        <Button onClick={() => navigate(PATH_MEETING.CREATE)} title="Create" />*/}
                {/*        <Button onClick={() => navigate(`${PATH_MEETING.DETAILS}/id`)} title="Details" />*/}
                {/*        <Button onClick={() => navigate(PATH_MEETING.LIST)} title="List" />*/}
                {/*    </div>*/}
                {/*</BreadcrumbsContainer>*/}
            </div>
        </>
    );
}
