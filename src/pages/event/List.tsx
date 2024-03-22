import React, { useEffect, useState } from 'react';
import { PATH_EVENT } from '../../routes/paths';
import { pageNames } from '../../constants';
import { useNavigate } from 'react-router';
import { eventService } from '../../services';
import { utilsActions } from '../../redux/actions/utilsActions';
import { IEventGetListRes } from '../../interfaces/event/eventRes';

const pathMap = [
    { url: PATH_EVENT.ROOT, title: pageNames.pages.event },
    { url: PATH_EVENT.LIST, title: pageNames.global.list },
];

export default function EventListPage() {
    const navigate = useNavigate();

    const [eventList, setEventList] = useState<IEventGetListRes[]>([]);

    useEffect(() => {
        getInfo();
    }, []);

    const getInfo = async () => {
        try {
            utilsActions.loading(true);

            const [eventListRes] = await Promise.all([eventService.getList()]);

            setEventList(eventListRes);
        } catch (err) {
            utilsActions.addMessage({
                status: 'error',
                message: 'Error loading data',
            });
        } finally {
            utilsActions.loading(false);
        }
    };

    const toDetails = (id: number) => {
        navigate(`${PATH_EVENT.DETAILS}/${id}`);
    };

    return (
        <>
            <div className="p-4">
                {/*<BreadcrumbsContainer path={pathMap} buttons={[{ title: 'Create', path: PATH_EVENT.CREATE }]} />*/}

                {/*<TitleContainer position={'center'}>*/}
                {/*    <Title title={'Events'} color={'whiteGray'} size={'32'} />*/}
                {/*</TitleContainer>*/}

                {/*<CardContainer>*/}
                {/*    {eventList.map((item) => (*/}
                {/*        <SmallCard*/}
                {/*            key={item.id}*/}
                {/*            title={item.name}*/}
                {/*            subtitle={`Is ${item.isActive ? 'active' : 'close'}`}*/}
                {/*            onClick={() => toDetails(item.id)}*/}
                {/*            svg={<SvgEventSidebar />}*/}
                {/*        />*/}
                {/*    ))}*/}
                {/*</CardContainer>*/}
            </div>
        </>
    );
}
