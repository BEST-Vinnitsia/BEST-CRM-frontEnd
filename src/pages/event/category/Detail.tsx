import React, { useEffect, useState } from 'react';
import { PATH_EVENT } from '../../../routes/paths';
import { useNavigate } from 'react-router';
import { Navigate, useParams } from 'react-router-dom';
import { Breadcrumbs, Button, CardContainer, CardMember, ScrollY, Tab } from '../../../ui';
import { useEventCategoryContext } from '../../../contexts/EventCategoryContext';
import { SvgInfo, SvgResponsible, SvgWg } from '../../../assets/svg';
import { getSvg } from '../../../utils/getSvg';

const breadcrumbsPath = (id: string, eventCategoryName?: string) => {
    return [
        { url: PATH_EVENT.CATEGORY.LIST, title: 'Event categories' },
        { url: `${PATH_EVENT.CATEGORY.DETAILS}/${id}`, title: eventCategoryName || 'Event' },
    ];
};

const breadcrumbsPathEdit = (id: string) => {
    return `${PATH_EVENT.CATEGORY.EDIT}/${id}`;
};

const tabs = [
    { title: 'Info', svg: <SvgInfo /> },
    { title: 'Responsible', svg: <SvgResponsible /> },
    { title: 'WG', svg: <SvgWg /> },
];

const positions = ['Responsible', 'WG'];

export default function EventCategoryDetailPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [openTab, setOpenTab] = useState<string>('Info');

    const {
        eventCategoryDetails, //
        getEventCategory,
    } = useEventCategoryContext();

    useEffect(() => {
        if (!id) return;
        getEventCategory.details(id);
    }, []);

    if (!id) return <Navigate to={PATH_EVENT.CATEGORY.LIST} />;

    return (
        <ScrollY>
            <Breadcrumbs column={true} path={breadcrumbsPath(id, eventCategoryDetails?.name)}>
                <Button title={'Edit'} onClick={() => navigate(breadcrumbsPathEdit(id))} />
            </Breadcrumbs>

            <Tab onClick={setOpenTab} value={openTab} tabs={tabs} />

            {openTab === 'Info' && <div>Info</div>}

            {positions.map((pos, i) => (
                <React.Fragment key={i}>
                    {openTab === pos && (
                        <CardContainer p={'0 16px'}>
                            {eventCategoryDetails &&
                                eventCategoryDetails.positions
                                    .filter((item) => item.role.toLowerCase() === pos.toLowerCase())
                                    .map((item) => (
                                        <CardMember key={item.id} title={item.name} svg={getSvg(item.name)} />
                                    ))}
                        </CardContainer>
                    )}
                </React.Fragment>
            ))}
        </ScrollY>
    );
}
