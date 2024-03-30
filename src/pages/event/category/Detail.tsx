import React, { useEffect, useState } from 'react';
import { PATH_EVENT } from '../../../routes/paths';
import { useNavigate } from 'react-router';
import { Navigate, useParams } from 'react-router-dom';
import { Breadcrumbs, Button, CardContainer, CardMember, ScrollY, Tab } from '../../../ui';
import { useEventCategoryContext } from '../../../contexts/EventCategoryContext';
import { SvgInfo, SvgResponsible, SvgWg } from '../../../assets/svg';
import { getSvg } from '../../../utils/getSvg';

export default function EventCategoryDetailPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [openTab, setOpenTab] = useState<string>('Info');

    const {
        getEventCategoryDetails,
        eventCategoryDetails, //
    } = useEventCategoryContext();

    useEffect(() => {
        if (!id) return;
        getEventCategoryDetails(id);
    }, []);

    if (!id) <Navigate to={PATH_EVENT.CATEGORY.LIST} />;

    const breadcrumbsPath = () => {
        if (eventCategoryDetails) {
            return [
                { url: PATH_EVENT.CATEGORY.LIST, title: 'Event categories' },
                { url: `${PATH_EVENT.CATEGORY.DETAILS}/${id}`, title: eventCategoryDetails.name },
            ];
        }

        return [
            { url: PATH_EVENT.CATEGORY.LIST, title: 'Event categories' },
            { url: `${PATH_EVENT.CATEGORY.DETAILS}/${id}`, title: 'Event' },
        ];
    };

    const tabs = [
        { title: 'Info', svg: <SvgInfo /> },
        { title: 'Responsible', svg: <SvgResponsible /> },
        { title: 'WG', svg: <SvgWg /> },
    ];

    return (
        <ScrollY>
            <Breadcrumbs column={true} path={breadcrumbsPath()}>
                <Button title={'Edit'} onClick={() => navigate(`${PATH_EVENT.CATEGORY.EDIT}/${id}`)} />
            </Breadcrumbs>

            <Tab onClick={setOpenTab} value={openTab} tabs={tabs} />

            {openTab === 'Info' && <div>Info</div>}

            {openTab === 'Responsible' && (
                <>
                    <CardContainer p={'0 16px'}>
                        {eventCategoryDetails &&
                            eventCategoryDetails.positions.map((item) => {
                                if (item.role !== 'Responsible') return null;
                                return <CardMember key={item.id} title={item.name} svg={getSvg(item.name)} />;
                            })}
                    </CardContainer>
                </>
            )}

            {openTab === 'WG' && (
                <>
                    <CardContainer p={'0 16px'}>
                        {eventCategoryDetails &&
                            eventCategoryDetails.positions.map((item) => {
                                if (item.role !== 'WG') return null;
                                return <CardMember key={item.id} title={item.name} svg={getSvg(item.name)} />;
                            })}
                    </CardContainer>
                </>
            )}
        </ScrollY>
    );
}
