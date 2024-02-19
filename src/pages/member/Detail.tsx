import React, { useEffect, useState } from 'react';
import style from './style.module.scss';
import { BreadcrumbsContainer, Button, PageHeader, ScrollY, Text } from '../../components';
import { PATH_MEMBER } from '../../routes/paths';
import { pageNames } from '../../constants';
import { useNavigate } from 'react-router';
import { Navigate, useParams } from 'react-router-dom';
// import { IMemberListAllInfo } from '../../interfaces/member/memberBigData';
import { utilsActions } from '../../redux/actions/utilsActions';
import { IMemberGetByIdRes } from '../../interfaces/member/memberRes';
import { IBoardGetListRes } from '../../interfaces/board/boardRes';
import { IBoardToMemberGetByMemberIdRes } from '../../interfaces/board/boardToMemberRes';
import { ICommitteeGetListRes } from '../../interfaces/committee/committeeRes';
import { ICommitteeToMemberGetByMemberIdRes } from '../../interfaces/committee/committeeToMemberRes';
import { ICoordinatorGetListRes } from '../../interfaces/coordinator/coordinatorRes';
import { ICoordinatorToMemberGetByMemberIdRes } from '../../interfaces/coordinator/coordinatorToMemberRes';
import { IEventGetListRes } from '../../interfaces/event/eventRes';
import { INewEventGetListRes } from '../../interfaces/event/newEventRes';
import { IResponsibleGetListRes } from '../../interfaces/event/responsibleRes';
import { INewEventToMemberGetListRes } from '../../interfaces/event/newEventToMemberRes';
import { ICadenceGetListRes } from '../../interfaces/cadence/cadenceRes';
import {
    boardService,
    boardToMemberService,
    cadenceService,
    committeeService,
    committeeToMemberService,
    coordinatorService,
    coordinatorToMemberService,
    eventService,
    memberService,
    newEventService,
    newEventToMemberService,
    responsibleService,
} from '../../services';
import { formatDate, intToRoman } from '../../utils';
import Card from '../../components/card/Card';
import { UserAvatar } from '../../assets/img';
import CardContainer from '../../components/card/CardContainer';

const pathMap = [
    { url: PATH_MEMBER.ROOT, title: pageNames.pages.member },
    { url: PATH_MEMBER.DETAILS, title: pageNames.global.details },
];

export default function MemberDetailPage() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [member, setMember] = useState<IMemberGetByIdRes>();
    const [boardList, setBoardList] = useState<IBoardGetListRes[]>([]);
    const [boardToMemberList, setBoardToMemberList] = useState<IBoardToMemberGetByMemberIdRes[]>([]);
    const [committeeList, setCommitteeList] = useState<ICommitteeGetListRes[]>([]);
    const [committeeToMemberList, setCommitteeToMemberList] = useState<ICommitteeToMemberGetByMemberIdRes[]>([]);
    const [coordinatorList, setCoordinatorList] = useState<ICoordinatorGetListRes[]>([]);
    const [coordinatorToMemberList, setCoordinatorToMemberList] = useState<ICoordinatorToMemberGetByMemberIdRes[]>([]);
    const [eventList, setEventList] = useState<IEventGetListRes[]>([]);
    const [newEventList, setNewEventList] = useState<INewEventGetListRes[]>([]);
    const [responsibleList, setResponsibleList] = useState<IResponsibleGetListRes[]>([]);
    const [newEventToMemberList, setNewEventToMemberList] = useState<INewEventToMemberGetListRes[]>([]);
    const [cadenceList, setCadenceList] = useState<ICadenceGetListRes[]>([]);

    useEffect(() => {
        getData();
    }, []);

    if (!id) return <Navigate to={PATH_MEMBER.LIST} />;

    const getData = async () => {
        try {
            if (!id) return;
            utilsActions.loading(true);

            const memberReq = memberService.getById({ id });
            const boardReq = boardService.getList();
            const boardToMemberReq = boardToMemberService.getByMemberId({ memberId: id });
            const coordinatorReq = coordinatorService.getList();
            const coordinatorToMemberReq = coordinatorToMemberService.getByMemberId({ memberId: id });
            const committeeReq = committeeService.getList();
            const committeeToMemberReq = committeeToMemberService.getByMemberId({ memberId: id });
            const eventReq = eventService.getList();
            const newEventReq = newEventService.getList();
            const newEventToMemberReq = newEventToMemberService.getList();
            const responsibleReq = responsibleService.getList();
            const cadenceReq = cadenceService.getList();

            const [
                memberRes,
                boardRes,
                boardToMemberRes,
                coordinatorRes,
                coordinatorToMemberRes,
                committeeRes,
                committeeToMemberRes,
                eventRes,
                newEventRes,
                newEventToMemberRes,
                responsibleRes,
                cadenceRes,
            ] = await Promise.all([
                memberReq,
                boardReq,
                boardToMemberReq,
                coordinatorReq,
                coordinatorToMemberReq,
                committeeReq,
                committeeToMemberReq,
                eventReq,
                newEventReq,
                newEventToMemberReq,
                responsibleReq,
                cadenceReq,
            ]);

            setMember(memberRes);
            setBoardList(boardRes);
            setBoardToMemberList(boardToMemberRes);
            setCommitteeList(committeeRes);
            setCommitteeToMemberList(committeeToMemberRes);
            setCoordinatorList(coordinatorRes);
            setCoordinatorToMemberList(coordinatorToMemberRes);
            setEventList(eventRes);
            setNewEventList(newEventRes);
            setNewEventToMemberList(newEventToMemberRes);
            setResponsibleList(responsibleRes);
            setCadenceList(cadenceRes);
        } catch (err) {
            utilsActions.addMessage({
                status: 'error',
                message: 'Error loading data',
            });
        } finally {
            utilsActions.loading(false);
        }
    };

    return (
        <ScrollY>
            <div className="p-4">
                <BreadcrumbsContainer path={pathMap}>
                    <div className="flex">
                        <Button onClick={() => navigate(`${PATH_MEMBER.EDIT}/${id}`)} title="Edit" />
                        <Button onClick={() => navigate(PATH_MEMBER.LIST)} title="List" />
                    </div>
                </BreadcrumbsContainer>

                {member && (
                    <div className="mt-1">
                        <PageHeader
                            title={`${member.name} ${member.surname} ${member.middleName}`}
                            subtitle={member.membership}
                            img={UserAvatar}
                        />

                        <div className={style['boxContainer']}>
                            <div className={style['boxContainer__block']}>
                                <div className={style['boxContainer__block-header']}>
                                    <Text text={'Contacts'} size={'18'} width={'bold'} />
                                </div>

                                <div className={style['boxContainer__block-segment']}>
                                    <Text text={`Email`} />
                                    <Text text={member.email} color={'gray'} />
                                </div>

                                <div className={style['boxContainer__block-segment']}>
                                    <Text text={`BEST email`} />
                                    <Text text={member.bestEmail ? member.bestEmail : 'Not specified'} color={'gray'} />
                                </div>

                                <div className={style['boxContainer__block-segment']}>
                                    <Text text={`Phone`} />
                                    <Text text={member.phone} color={'gray'} />
                                </div>

                                <div className={style['boxContainer__block-segment']}>
                                    <Text text={`Message`} />
                                    <Text text={member.socialNetwork} color={'gray'} />
                                </div>
                            </div>

                            <div className={style['boxContainer__block']}>
                                <div className={style['boxContainer__block-header']}>
                                    <Text text={'Info'} size={'18'} width={'bold'} />
                                </div>

                                <div className={style['boxContainer__block-segment']}>
                                    <Text text={`Faculty`} />
                                    <Text text={member.faculty} color={'gray'} />
                                </div>

                                <div className={style['boxContainer__block-segment']}>
                                    <Text text={`Group`} />
                                    <Text text={member.group} color={'gray'} />
                                </div>

                                <div className={style['boxContainer__block-segment']}>
                                    <Text text={`Clothing size`} />
                                    <Text text={member.clothingSize ? member.clothingSize : 'Not specified'} color={'gray'} />
                                </div>

                                <div className={style['boxContainer__block-segment']}>
                                    <Text text={`Home address`} />
                                    <Text text={member.homeAddress ? member.homeAddress : 'Not specified'} color={'gray'} />
                                </div>

                                <div className={style['boxContainer__block-segment']}>
                                    <Text text={`Birthday`} />
                                    <Text text={formatDate(new Date(member.birthday))} color={'gray'} />
                                </div>
                            </div>
                        </div>

                        <CardContainer>
                            {/**/}
                            {boardToMemberList.map((boardToMember, i) => {
                                const cadence = cadenceList.find((cadence) => cadence.id === boardToMember.cadenceId);
                                const board = boardList.find((board) => board.id === boardToMember.boardId);

                                if (!board || !cadence) return <React.Fragment key={i} />;

                                return (
                                    <Card key={i} title={`${board.name} ${intToRoman(cadence.number)}`} img={UserAvatar} />
                                );
                            })}

                            {/**/}
                            {coordinatorToMemberList.map((coordinatorToMember, i) => {
                                const cadence = cadenceList.find((cadence) => cadence.id === coordinatorToMember.cadenceId);
                                const coordinator = coordinatorList.find(
                                    (coordinator) => coordinator.id === coordinatorToMember.coordinatorId,
                                );

                                if (!coordinator || !cadence) return <React.Fragment key={i} />;

                                return (
                                    <Card
                                        key={i}
                                        title={`${coordinator.name} ${intToRoman(cadence.number)}`}
                                        img={UserAvatar}
                                    />
                                );
                            })}

                            {/**/}
                            {committeeToMemberList.map((committeeToMember, i) => {
                                const cadence = cadenceList.find((cadence) => cadence.id === committeeToMember.cadenceId);
                                const committee = committeeList.find(
                                    (committee) => committee.id === committeeToMember.committeeId,
                                );

                                if (!committee || !cadence) return <React.Fragment key={i} />;

                                return (
                                    <Card
                                        key={i}
                                        title={`${committee.name} ${intToRoman(cadence.number)}`}
                                        img={UserAvatar}
                                    />
                                );
                            })}

                            {/**/}
                            {newEventToMemberList.map((newEventToMember, i) => {
                                const newEvent = newEventList.find(
                                    (newEvent) => newEvent.id === newEventToMember.newEventId,
                                );
                                if (!newEvent) return <React.Fragment key={i} />;

                                const event = eventList.find((event) => event.id === newEvent.eventId);
                                if (!event) return <React.Fragment key={i} />;

                                const cadence = cadenceList.find((cadence) => cadence.id === newEvent.cadenceId);
                                if (!cadence) return <React.Fragment key={i} />;

                                const responsible = responsibleList.find(
                                    (resp) => resp.id === newEventToMember.responsibleId,
                                );
                                if (!responsible) return <React.Fragment key={i} />;

                                return (
                                    <Card
                                        key={i}
                                        title={`${event.name} ${responsible.name}`}
                                        subtitle={`${intToRoman(cadence.number)}`}
                                        img={UserAvatar}
                                    />
                                );
                            })}
                        </CardContainer>
                    </div>
                )}
            </div>


        </ScrollY>
    );
}
