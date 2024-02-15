import React, { useEffect, useState } from 'react';
import { PATH_EVENT } from '../../routes/paths';
import { pageNames } from '../../constants';
import { useNavigate } from 'react-router';
import { BreadcrumbsContainer, Button, Text } from '../../components';
import { eventService } from '../../services';
import { utilsActions } from '../../redux/actions/utilsActions';
import { IEvent } from '../../interfaces/event/event';

const pathMap = [
    { url: PATH_EVENT.ROOT, title: pageNames.pages.event },
    { url: PATH_EVENT.LIST, title: pageNames.global.list },
];

export default function EventListPage() {
    const navigate = useNavigate();

    const [eventList, setEventList] = useState<IEvent[]>([]);

    useEffect(() => {
        getInfo();
    }, []);

    const getInfo = async () => {
        try {
            const eventListPromise = eventService.getList();

            utilsActions.loading(true);
            const [eventRes] = await Promise.all([eventListPromise]);
            utilsActions.loading(false);

            setEventList(eventRes);
        } catch (err) {
            utilsActions.loading(false);
            utilsActions.addMessage({
                status: 'error',
                message: 'Error loading data',
            });
        }
    };

    const redirectToDetails = (id: string) => {
        navigate(`${PATH_EVENT.DETAILS}/${id}`);
    };

    return (
        <>
            <div className="p-4">
                <BreadcrumbsContainer path={pathMap}>
                    <div className="flex">
                        <Button onClick={() => navigate(PATH_EVENT.CREATE)} title="Create" />
                    </div>
                </BreadcrumbsContainer>

                <div className="mb-5">
                    <Text text={'Events'} color={'gray'} />

                    {eventList.map((item) => (
                        <div key={item.id} onClick={() => redirectToDetails(item.id)}>
                            <Text text={item.name} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
