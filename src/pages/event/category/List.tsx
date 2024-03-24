import React from 'react';
import { PATH_EVENT } from '../../../routes/paths';
import { useNavigate } from 'react-router';
import { ScrollY } from '../../../ui';

const breadcrumbsPath = [
    { url: PATH_EVENT.ROOT, title: 'Event' }, //
];

export default function EventCategoryListPage() {
    const navigate = useNavigate();

    return (
        <ScrollY>
            <></>
        </ScrollY>
    );
}
