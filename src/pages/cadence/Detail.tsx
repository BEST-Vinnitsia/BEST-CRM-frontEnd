import React, { useEffect, useState } from 'react';
import style from './details.module.scss';
import { PATH_CADENCE } from '../../routes/paths';
import { pageNames } from '../../constants';
import { useNavigate } from 'react-router';
import { utilsActions } from '../../redux/actions/utilsActions';
import {
    boardService,
    boardToMemberService,
    cadenceService,
    committeeService,
    committeeToMemberService,
    coordinatorService,
    coordinatorToMemberService,
    memberService,
    newEventService,
} from '../../services';
import { useParams } from 'react-router-dom';
import { IBoardGetListRes } from '../../interfaces/board/boardRes';
import { IBoardToMemberGetByCadenceIdRes } from '../../interfaces/board/boardToMemberRes';
import { ICoordinatorGetListRes } from '../../interfaces/coordinator/coordinatorRes';
import { ICoordinatorToMemberGetByCadenceIdRes } from '../../interfaces/coordinator/coordinatorToMemberRes';
import { ICadenceGetByIdRes } from '../../interfaces/cadence/cadenceRes';
import { ICommitteeToMemberGetByCadenceIdRes } from '../../interfaces/committee/committeeToMemberRes';
import { INewEventGetByCadenceIdRes } from '../../interfaces/event/newEventRes';
import { ICommitteeGetListRes } from '../../interfaces/committee/committeeRes';
import { ImgCrmHome, UserAvatar } from '../../assets/img';
import { intToRoman, joinStyle } from '../../utils';
import { IMemberGetListRes } from '../../interfaces/member/memberRes';
import { ScrollY } from '../../ui';

const pathMap = [
    { url: PATH_CADENCE.ROOT, title: pageNames.pages.cadence },
    { url: PATH_CADENCE.DETAILS, title: pageNames.global.details },
];

export default function CadenceDetailPage() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [cadenceInfo, setCadenceInfo] = useState<ICadenceGetByIdRes | null>(null);
    const [boardList, setBoardList] = useState<IBoardGetListRes[]>([]);
    const [coordinatorList, setCoordinatorList] = useState<ICoordinatorGetListRes[]>([]);
    const [committeeList, setCommitteeList] = useState<ICommitteeGetListRes[]>([]);
    const [boardToMemberList, setBoardToMemberList] = useState<IBoardToMemberGetByCadenceIdRes[]>([]);
    const [coordinatorToMemberList, setCoordinatorToMemberList] = useState<ICoordinatorToMemberGetByCadenceIdRes[]>([]);
    const [committeeToMemberList, setCommitteeToMemberList] = useState<ICommitteeToMemberGetByCadenceIdRes[]>([]);
    // const [eventList, setEventList] = useState<IEventGetListRes[]>([]);
    const [newEventList, setNewEventList] = useState<INewEventGetByCadenceIdRes[]>([]);
    // const [respList, setRespList] = useState<IResponsibleGetListRes[]>([]);
    // const [memberToNewEvent, setMemberToNewEvent] = useState<INewEventToMemberGetListRes[]>([]);
    const [memberList, setMemberList] = useState<IMemberGetListRes[]>([]);

    const [openTab, setOpenTab] = useState<'board' | 'coordinator' | 'event'>('board');

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        if (!id) return;

        try {
            utilsActions.loading(true);

            const [
                cadenceInfoRes,
                boardListRes,
                coordinatorListRes,
                committeeListRes,
                boardToMemberListRes,
                coordinatorToMemberListRes,
                committeeToMemberListRes,
                // eventListRes,
                newEventListRes,
                // respListRes,
                // memberToNewEventRes,
                memberListRes,
            ] = await Promise.all([
                cadenceService.getById({ id }),
                boardService.getList(),
                coordinatorService.getList(),
                committeeService.getList(),
                boardToMemberService.getByCadenceId({ cadenceId: id }),
                coordinatorToMemberService.getByCadenceId({ cadenceId: id }),
                committeeToMemberService.getByCadenceId({ cadenceId: id }),
                // eventService.getList(),
                newEventService.getByCadenceId({ cadenceId: id }),
                // responsibleService.getList(),
                // newEventToMemberService.getList(),
                memberService.getList(),
            ]);

            setCadenceInfo(cadenceInfoRes);
            setBoardList(boardListRes);
            setCoordinatorList(coordinatorListRes);
            setCommitteeList(committeeListRes);
            setBoardToMemberList(boardToMemberListRes);
            setCoordinatorToMemberList(coordinatorToMemberListRes);
            setCommitteeToMemberList(committeeToMemberListRes);
            // setEventList(eventListRes);
            setNewEventList(newEventListRes);
            // setRespList(respListRes);
            // setMemberToNewEvent(memberToNewEventRes);
            setMemberList(memberListRes);
        } catch (err) {
            utilsActions.addMessage({
                status: 'error',
                message: 'Error loading data',
            });
        } finally {
            utilsActions.loading(false);
        }
    };

    const getMemberName = (memberId: number) => {
        const member = memberList.find((item) => item.id === memberId);
        if (!member) return '';
        return `${member.name} ${member.surname}`;
    };

    return (
        <ScrollY>
            <div className="p-4">
                {/*<BreadcrumbsContainer*/}
                {/*    path={pathMap}*/}
                {/*    buttons={[*/}
                {/*        { title: 'Edit', path: `${PATH_CADENCE.EDIT}/${id}` },*/}
                {/*        { title: 'List', path: PATH_CADENCE.LIST },*/}
                {/*    ]}*/}
                {/*/>*/}

                {/*{cadenceInfo && (*/}
                {/*    <PageHeader*/}
                {/*        title={`Cadence ${intToRoman(cadenceInfo.number)}`}*/}
                {/*        subtitle={`Cadence is ${cadenceInfo.isEnd ? 'end' : 'active'}`}*/}
                {/*        img={UserAvatar}*/}
                {/*    />*/}
                {/*)}*/}

                <div className={style['tobContainer']}>
                    <span
                        className={joinStyle(
                            style['tobContainer__tab'],
                            style[`tobContainer__tab--${openTab === 'board' ? 'active' : 'inActive'}`],
                        )}
                        onClick={() => setOpenTab('board')}
                    >
                        Board
                    </span>
                    <span
                        className={joinStyle(
                            style['tobContainer__tab'],
                            style[`tobContainer__tab--${openTab === 'coordinator' ? 'active' : 'inActive'}`],
                        )}
                        onClick={() => setOpenTab('coordinator')}
                    >
                        Committee
                    </span>
                    <span
                        className={joinStyle(
                            style['tobContainer__tab'],
                            style[`tobContainer__tab--${openTab === 'event' ? 'active' : 'inActive'}`],
                        )}
                        onClick={() => setOpenTab('event')}
                    >
                        Events
                    </span>
                </div>

                {/*{openTab === 'board' && (*/}
                {/*    <CardContainer>*/}
                {/*        {boardToMemberList.map((boardToMember) => (*/}
                {/*            <Card*/}
                {/*                key={boardToMember.id}*/}
                {/*                title={getMemberName(boardToMember.memberId)}*/}
                {/*                subtitle={boardList.find((board) => board.id === boardToMember.boardId)?.name}*/}
                {/*                img={ImgCrmHome}*/}
                {/*            />*/}
                {/*        ))}*/}
                {/*    </CardContainer>*/}
                {/*)}*/}

                {/*{openTab === 'coordinator' && (*/}
                {/*    <CardContainer>*/}
                {/*        {coordinatorToMemberList.map((coordinatorToMember) => (*/}
                {/*            <Card*/}
                {/*                key={coordinatorToMember.id}*/}
                {/*                title={getMemberName(coordinatorToMember.memberId)}*/}
                {/*                subtitle={*/}
                {/*                    coordinatorList.find(*/}
                {/*                        (coordinator) => coordinator.id === coordinatorToMember.coordinatorId,*/}
                {/*                    )?.name*/}
                {/*                }*/}
                {/*                img={ImgCrmHome}*/}
                {/*            />*/}
                {/*        ))}*/}
                {/*    </CardContainer>*/}
                {/*)}*/}

                {/*{openTab === 'event' && (*/}
                {/*    <CardContainer>*/}
                {/*        {newEventList.map((newEvent) => (*/}
                {/*            <Card key={newEvent.id} title={newEvent.name} img={ImgCrmHome} />*/}
                {/*        ))}*/}
                {/*    </CardContainer>*/}
                {/*)}*/}
            </div>
        </ScrollY>
    );
}
