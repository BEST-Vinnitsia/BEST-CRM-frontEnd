import React from 'react';
import { PATH_EVENT } from '../../../routes/paths';
import { useNavigate } from 'react-router';
import { Navigate, useParams } from 'react-router-dom';
import { ScrollY } from '../../../ui';

const breadcrumbsPath = [
    { url: PATH_EVENT.ROOT, title: 'Event' }, //
];
export default function EventCategoryDetailPage() {
    const navigate = useNavigate();
    const { id } = useParams();

    if (!id) <Navigate to={PATH_EVENT.LIST} />;

    return (
        <ScrollY>
            <></>
        </ScrollY>
    );
}
