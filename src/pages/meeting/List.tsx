import React from 'react';
import { PATH_MEETING } from '../../routes/paths';
import { pageNames } from '../../constants';
import { useNavigate } from 'react-router';
import { useForm, useSelect } from '../../hooks';

const pathMap = [
    { url: PATH_MEETING.ROOT, title: pageNames.pages.meeting },
    { url: PATH_MEETING.LIST, title: pageNames.global.list },
];

export default function MeetingListPage() {
    const navigate = useNavigate();

    const [form] = useForm([useSelect({ name: 'test', required: true })]);

    return (
        <>
            <div className="p-4">
                {/*<BreadcrumbsContainer path={pathMap}>*/}
                {/*    <div className="flex">*/}
                {/*        <Button onClick={() => navigate(`${PATH_MEETING.EDIT}/id`)} title="Edit" />*/}
                {/*        <Button onClick={() => navigate(PATH_MEETING.CREATE)} title="Create" />*/}
                {/*        <Button onClick={() => navigate(`${PATH_MEETING.DETAILS}/id`)} title="Details" />*/}
                {/*    </div>*/}
                {/*</BreadcrumbsContainer>*/}
            </div>
        </>
    );
}
