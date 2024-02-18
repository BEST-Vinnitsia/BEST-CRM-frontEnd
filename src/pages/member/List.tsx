import React, { useEffect, useState } from 'react';
import {
    BreadcrumbsContainer,
    Button,
    Label,
    ScrollY,
    Table,
    TBody,
    TD,
    Text,
    TH,
    THead,
    TRBody,
    TRHead,
} from '../../components';
import { PATH_MEMBER } from '../../routes/paths';
import { pageNames } from '../../constants';
import { useNavigate } from 'react-router';
import { useCheckbox } from '../../hooks';
import Checkbox from '../../components/table/checkbox/Checkbox';
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
import { utilsActions } from '../../redux/actions/utilsActions';
import { IMemberGetListRes } from '../../interfaces/member/memberRes';
import { IBoardGetListRes } from '../../interfaces/board/boardRes';
import { IBoardToMemberGetListRes } from '../../interfaces/board/boardToMemberRes';
import { ICommitteeGetListRes } from '../../interfaces/committee/committeeRes';
import { ICommitteeToMemberGetListRes } from '../../interfaces/committee/committeeToMemberRes';
import { ICoordinatorGetListRes } from '../../interfaces/coordinator/coordinatorRes';
import { ICoordinatorToMemberGetListRes } from '../../interfaces/coordinator/coordinatorToMemberRes';
import { IEventGetListRes } from '../../interfaces/event/eventRes';
import { INewEventGetListRes } from '../../interfaces/event/newEventRes';
import { IResponsibleGetListRes } from '../../interfaces/event/responsibleRes';
import { INewEventToMemberGetListRes } from '../../interfaces/event/newEventToMemberRes';
import { ICadenceGetListRes } from '../../interfaces/cadence/cadenceRes';

const pathMap = [
    { url: PATH_MEMBER.ROOT, title: pageNames.pages.member },
    { url: PATH_MEMBER.LIST, title: pageNames.global.list },
];

export default function MemberListPage() {
    const navigate = useNavigate();

    const [memberList, setMemberList] = useState<IMemberGetListRes[]>([]);
    const [boardList, setBoardList] = useState<IBoardGetListRes[]>([]);
    const [boardToMemberList, setBoardToMemberList] = useState<IBoardToMemberGetListRes[]>([]);
    const [committeeList, setCommitteeList] = useState<ICommitteeGetListRes[]>([]);
    const [committeeToMemberList, setCommitteeToMemberList] = useState<ICommitteeToMemberGetListRes[]>([]);
    const [coordinatorList, setCoordinatorList] = useState<ICoordinatorGetListRes[]>([]);
    const [coordinatorToMemberList, setCoordinatorToMemberList] = useState<ICoordinatorToMemberGetListRes[]>([]);
    const [eventList, setEventList] = useState<IEventGetListRes[]>([]);
    const [newEventList, setNewEventList] = useState<INewEventGetListRes[]>([]);
    const [responsibleList, setResponsibleList] = useState<IResponsibleGetListRes[]>([]);
    const [newEventToMemberList, setNewEventToMemberList] = useState<INewEventToMemberGetListRes[]>([]);
    const [cadenceList, setCadenceList] = useState<ICadenceGetListRes[]>([]);

    const checkboxHook = useCheckbox(memberList.map((item: any) => item.id));

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            utilsActions.loading(true);

            // make cache this request
            const memberReq = memberService.getList();
            const boardReq = boardService.getList();
            const boardToMemberReq = boardToMemberService.getList();
            const coordinatorReq = coordinatorService.getList();
            const coordinatorToMemberReq = coordinatorToMemberService.getList();
            const committeeReq = committeeService.getList();
            const committeeToMemberReq = committeeToMemberService.getList();
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

            setMemberList(memberRes);
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
            console.log(err);
            utilsActions.addMessage({ status: 'error', message: 'Error loading data' });
        } finally {
            utilsActions.loading(false);
        }
    };

    return (
        <>
            <ScrollY>
                <div className="p-4">
                    <BreadcrumbsContainer path={pathMap}>
                        <div className="flex">
                            <Button onClick={() => navigate(PATH_MEMBER.CREATE)} title="Create" />
                        </div>
                    </BreadcrumbsContainer>
                </div>

                <Table>
                    <THead>
                        <TRHead>
                            <TH type={'checkbox'}>
                                <Checkbox
                                    active={checkboxHook.checkSelectAll()}
                                    onClick={checkboxHook.selectAll}
                                    isHead
                                />
                            </TH>
                            <TH>
                                <Text text={'Name'} color={'gray'} width={'bold'} type={'span-sm'} />
                            </TH>
                            <TH>
                                <Text text={'Email'} color={'gray'} width={'bold'} type={'span-sm'} />
                            </TH>
                            <TH>
                                <Text text={'Phone'} color={'gray'} width={'bold'} type={'span-sm'} />
                            </TH>
                            <TH>
                                <Text text={'Message'} color={'gray'} width={'bold'} type={'span-sm'} />
                            </TH>
                            <TH>
                                <Text text={'VNTU'} color={'gray'} width={'bold'} type={'span-sm'} />
                            </TH>
                            <TH>
                                <Text text={'Status'} color={'gray'} width={'bold'} type={'span-sm'} />
                            </TH>
                            <TH>
                                <Text text={'Board'} color={'gray'} width={'bold'} type={'span-sm'} />
                            </TH>
                            <TH>
                                <Text text={'Coordinator'} color={'gray'} width={'bold'} type={'span-sm'} />
                            </TH>
                            <TH>
                                <Text text={'Event'} color={'gray'} width={'bold'} type={'span-sm'} />
                            </TH>
                            <TH>
                                <Text text={'Committee'} color={'gray'} width={'bold'} type={'span-sm'} />
                            </TH>
                            <TH>
                                <Text text={'Happy Birthday'} color={'gray'} width={'bold'} type={'span-sm'} />
                            </TH>
                        </TRHead>
                    </THead>
                    <TBody>
                        {memberList.map((member, i) => (
                            <TRBody key={i}>
                                <TD sx={{ p: '0px 0px 0px 8px' }}>
                                    <Checkbox
                                        active={checkboxHook.checkSelectRow(member.id)}
                                        onClick={() => checkboxHook.selectRow(member.id)}
                                    />
                                </TD>

                                <TD>
                                    <div onClick={() => navigate(`${PATH_MEMBER.DETAILS}/${member.id}`)}>
                                        <Text text={`${member.name} ${member.surname}`} type={'span-sm'} />
                                        <Text
                                            text={member.bestEmail ? member.bestEmail : 'there is no BEST mail'}
                                            type={'span-sm'}
                                            color={'gray'}
                                        />
                                    </div>
                                </TD>
                                <TD>
                                    <Text text={member.email} type={'span-sm'} />
                                </TD>
                                <TD>
                                    <Text text={member.phone} type={'span-sm'} />
                                </TD>
                                <TD>
                                    <Text text={member.socialNetwork} type={'span-sm'} />
                                </TD>
                                <TD>
                                    <div>
                                        <Text text={member.faculty} type={'span-sm'} />
                                        <Text text={member.group} type={'span-sm'} color={'gray'} />
                                    </div>
                                </TD>
                                <TD>
                                    <Label title={member.membership} />
                                </TD>
                                <TD>
                                    {boardToMemberList
                                        .filter((boardToMember) => boardToMember.memberId === member.id)
                                        .map((boardToMember, i) => {
                                            const board = boardList.find((item) => item.id === boardToMember.boardId);
                                            const cadence = cadenceList.find(
                                                (item) => item.id === boardToMember.cadenceId,
                                            );

                                            if (!board || !cadence) return <React.Fragment key={i} />;

                                            return (
                                                <Label
                                                    key={board.id}
                                                    title={`${intToRoman(cadence.number)} ${board.name}`}
                                                />
                                            );
                                        })}
                                </TD>
                                <TD>
                                    {coordinatorToMemberList
                                        .filter((coordinatorToMember) => coordinatorToMember.memberId === member.id)
                                        .map((coordinatorToMember, i) => {
                                            const coordinator = coordinatorList.find(
                                                (item) => item.id === coordinatorToMember.coordinatorId,
                                            );
                                            const cadence = cadenceList.find(
                                                (item) => item.id === coordinatorToMember.cadenceId,
                                            );

                                            if (!coordinator || !cadence) return <React.Fragment key={i} />;

                                            return (
                                                <Label
                                                    key={coordinator.id}
                                                    title={`${intToRoman(cadence.number)} ${coordinator.name}`}
                                                />
                                            );
                                        })}
                                </TD>

                                <TD>
                                    {newEventToMemberList
                                        .filter((newEventToMember) => newEventToMember.memberId === member.id)
                                        .map((newEventToMember, i) => {
                                            const newEvent = newEventList.find(
                                                (item) => item.id === newEventToMember.newEventId,
                                            );
                                            if (!newEvent) return <React.Fragment key={i} />;

                                            const event = eventList.find((item) => item.id === newEvent.eventId);
                                            if (!event) return <React.Fragment key={i} />;

                                            const responsible = responsibleList.find(
                                                (item) => item.id === newEventToMember.responsibleId,
                                            );
                                            if (!responsible) return <React.Fragment key={i} />;

                                            const cadence = cadenceList.find((item) => item.id === newEvent.cadenceId);
                                            if (!cadence) return <React.Fragment key={i} />;

                                            return (
                                                <Label
                                                    key={newEventToMember.id}
                                                    title={`${intToRoman(cadence.number)} ${event.name} ${responsible.name} ${responsible.role}`}
                                                />
                                            );
                                        })}
                                </TD>

                                <TD>
                                    {committeeToMemberList
                                        .filter((committeeToMember) => committeeToMember.memberId === member.id)
                                        .map((committeeToMember, i) => {
                                            const committee = committeeList.find(
                                                (item) => item.id === committeeToMember.committeeId,
                                            );
                                            const cadence = cadenceList.find(
                                                (item) => item.id === committeeToMember.cadenceId,
                                            );

                                            if (!committee || !cadence) return <React.Fragment key={i} />;

                                            return (
                                                <Label
                                                    key={committee.id}
                                                    title={`${intToRoman(cadence.number)} ${committee.name}`}
                                                />
                                            );
                                        })}
                                </TD>

                                <TD>
                                    <Text text={formatDate(new Date(member.birthday))} type={'span-sm'} />
                                </TD>
                            </TRBody>
                        ))}
                    </TBody>
                </Table>
            </ScrollY>
        </>
    );
}
