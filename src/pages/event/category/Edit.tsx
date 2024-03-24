import React from 'react';
import { PATH_EVENT } from '../../../routes/paths';
import { useNavigate, useParams } from 'react-router-dom';
import { ScrollY } from '../../../ui';

const breadcrumbsPathCreate = [
    { url: PATH_EVENT.ROOT, title: 'Event' }, //
];

const breadcrumbsPathEdit = [
    { url: PATH_EVENT.ROOT, title: 'Event' }, //
];

export default function EventCategoryEditPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    return (
        <ScrollY>
            <></>
        </ScrollY>
    );
}
