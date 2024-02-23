import React, { useEffect, useState } from 'react';
import style from './details.module.scss';
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
import { BreadcrumbsContainer, Card, CardContainer, PageHeader, Text, Title, TitleContainer } from '../../components';
import { ImgCrmHome, UserAvatar } from '../../assets/img';
import { IEventGetByIdRes } from '../../interfaces/event/eventRes';
import { INewEventGetByIdRes } from '../../interfaces/event/newEventRes';
import { INewEventToMemberGetByNewEventIdRes } from '../../interfaces/event/newEventToMemberRes';
import { IMemberGetListRes } from '../../interfaces/member/memberRes';
import { IResponsibleGetByEventIdRes } from '../../interfaces/event/responsibleRes';

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
            <div className="p-4">
                <BreadcrumbsContainer
                    path={pathMap}
                    buttons={[
                        { title: 'Edit', path: `${PATH_NEW_EVENT.EDIT}/${id}` },
                        { title: 'List', path: PATH_EVENT.LIST },
                    ]}
                />

                {newEventInfo && <PageHeader title={newEventInfo.name} img={UserAvatar} />}

                {newEventInfo && (
                    <div className={style['infoBlock']}>
                        <div className={style['infoBlock__info']}>
                            <div className={style['infoBlock__info-segment']}>
                                <Text text={`Name`} />
                                <Text text={newEventInfo.name} color={'gray'} />
                            </div>

                            {eventInfo && (
                                <>
                                    <div className={style['infoBlock__info-segment']}>
                                        <Text text={`Event name`} />
                                        <Text text={eventInfo.name} color={'gray'} />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}

                <TitleContainer>
                    <Title title={'Team'} color={'whiteGray'} />
                </TitleContainer>

                <CardContainer>
                    {memberToNewEventList.map((newEventToMember, i) => {
                        const member = memberList.find((item) => item.id === newEventToMember.memberId);
                        const resp = respList.find((item) => item.id === newEventToMember.responsibleId);

                        if (!member || !resp) return <React.Fragment key={i} />;

                        return (
                            <Card
                                key={i}
                                title={`${member.name} ${member.surname}`}
                                subtitle={`${resp.name} - ${resp.role}`}
                                img={ImgCrmHome}
                            />
                        );
                    })}
                </CardContainer>
            </div>
        </>
    );
}
