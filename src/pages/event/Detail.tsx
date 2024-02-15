import React, { useEffect, useState } from 'react';
import { BreadcrumbsContainer, Button, Text } from '../../components';
import { PATH_EVENT } from '../../routes/paths';
import { pageNames } from '../../constants';
import { useNavigate } from 'react-router';
import { utilsActions } from '../../redux/actions/utilsActions';
import { eventService } from '../../services';
import { Navigate, useParams } from 'react-router-dom';
import { IEventAllInfo } from '../../interfaces/event/eventByIdAllInfo';
import { intToRoman } from '../../utils';

const pathMap = [
    { url: PATH_EVENT.ROOT, title: pageNames.pages.event },
    { url: PATH_EVENT.DETAILS, title: pageNames.global.details },
];

export default function EventDetailPage() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [event, setEvent] = useState<IEventAllInfo | null>(null);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        if (!id) return;

        try {
            utilsActions.loading(true);

            const res = await eventService.getByIdAllInfo({ id });
            setEvent(res);
        } catch (err) {
            utilsActions.addMessage({
                status: 'error',
                message: 'Error loading data',
            });
        } finally {
            utilsActions.loading(false);
        }
    };

    const deleteEvent = async () => {
        if (!id) return;

        try {
            utilsActions.loading(true);

            await eventService.deleteMany({ eventsId: [id] });

            navigate(PATH_EVENT.LIST);

            utilsActions.addMessage({
                status: 'success',
                message: 'Event is deleted',
            });
        } catch (err) {
            utilsActions.addMessage({
                status: 'error',
                message: 'Error delete event',
            });
        } finally {
            utilsActions.loading(false);
        }
    };

    if (!id) <Navigate to={PATH_EVENT.LIST} />;

    return (
        <>
            <div className="p-4">
                <BreadcrumbsContainer path={pathMap}>
                    <div className="flex">
                        <Button onClick={deleteEvent} title="Delete" />
                        <Button onClick={() => navigate(`${PATH_EVENT.EDIT}/id`)} title="Edit" />
                        <Button onClick={() => navigate(PATH_EVENT.LIST)} title="List" />
                    </div>
                </BreadcrumbsContainer>

                {event && (
                    <div>
                        <Text text={event.name} />
                        <Text text={`Is active: ${event.isActive}`} />

                        {event.newEvent.map((item) => (
                            <>
                                <div>
                                    <Text text={`Cadence: ${intToRoman(item.cadence.number)}`} color={'gray'} />
                                </div>

                                <div>
                                    {item.memberToEvent.map((m) => (
                                        <div>
                                            <hr />
                                            <Text text={`${m.member.name} ${m.member.surname}`} />
                                            <Text text={`${m.responsible.name} ${m.responsible.role}`} />
                                        </div>
                                    ))}
                                </div>
                            </>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
