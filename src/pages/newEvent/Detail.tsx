import React, { useEffect, useState } from 'react';
import { PATH_EVENT, PATH_NEW_EVENT } from '../../routes/paths';
import { pageNames } from '../../constants';
import { useNavigate } from 'react-router';
import { utilsActions } from '../../redux/actions/utilsActions';
import { Navigate, useParams } from 'react-router-dom';
import {
    eventService,
    memberService,
    newEventService,
    newEventToMemberService,
    responsibleService,
} from '../../services';
import { IEventGetByIdRes } from '../../interfaces/event/eventRes';
import { INewEventGetByIdRes } from '../../interfaces/event/newEventRes';
import { INewEventToMemberGetByNewEventIdRes } from '../../interfaces/event/newEventToMemberRes';
import { IMemberGetListRes } from '../../interfaces/member/memberRes';
import { IResponsibleGetByEventIdRes } from '../../interfaces/event/responsibleRes';
import { ScrollY } from '../../ui';

const pathMap = [
    { url: PATH_EVENT.ROOT, title: pageNames.pages.event },
    { url: PATH_NEW_EVENT.DETAILS, title: pageNames.global.details },
];

export default function NewEventDetailPage() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [newEventInfo, setNewEventInfo] = useState<INewEventGetByIdRes | null>(null);
    const [eventInfo, setEventInfo] = useState<IEventGetByIdRes | null>(null);
    const [memberToNewEventList, setMemberToNewEventList] = useState<INewEventToMemberGetByNewEventIdRes[]>([]);
    const [memberList, setMemberList] = useState<IMemberGetListRes[]>([]);
    const [respList, setRespList] = useState<IResponsibleGetByEventIdRes[]>([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        if (!id) return;

        try {
            utilsActions.loading(true);

            const [newEventInfoRes, memberToNewEventListRes, memberListRes] = await Promise.all([
                newEventService.getById({ id }),
                newEventToMemberService.getByNewEventId({ newEventId: id }),
                memberService.getList(),
            ]);
            const eventIngoRes = await eventService.getById({ id });
            const respListRes = await responsibleService.getByEventId({ eventId: id });

            setMemberToNewEventList(memberToNewEventListRes);
            setNewEventInfo(newEventInfoRes);
            setEventInfo(eventIngoRes);
            setMemberList(memberListRes);
            setRespList(respListRes);
        } catch (err) {
            utilsActions.addMessage({
                status: 'error',
                message: 'Error loading data',
            });
        } finally {
            utilsActions.loading(false);
        }
    };

    if (!id) <Navigate to={PATH_EVENT.LIST} />;

    return (
        <>
           <ScrollY>

           </ScrollY>
        </>
    );
}
