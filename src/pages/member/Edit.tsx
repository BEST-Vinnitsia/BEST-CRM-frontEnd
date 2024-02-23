import React, { useEffect, useState } from 'react';
import style from './styleEdit.module.scss';
import { BreadcrumbsContainer, Button, Input, ScrollY, Select } from '../../components';
import { PATH_MEMBER } from '../../routes/paths';
import { useNavigate, useParams } from 'react-router-dom';
import { clothingSize, pageNames } from '../../constants';
import {
    boardService,
    boardToMemberService,
    cadenceService,
    committeeToMemberService,
    coordinatorService,
    coordinatorToMemberService,
    eventService,
    memberService,
    newEventService,
    newEventToMemberService,
    responsibleService,
} from '../../services';
import { useForm, useInput, useSelect } from '../../hooks';
import { utilsActions } from '../../redux/actions/utilsActions';
// import { ICadence } from '../../interfaces/cadence';
// import { IBoard } from '../../interfaces/board/board';
// import { ICoordinator } from '../../interfaces/coordinator/coordinator';
import { committeeService } from '../../services/committee/committee';
import { IMemberGetByIdRes } from '../../interfaces/member/memberRes';
import { ICadenceGetListRes } from '../../interfaces/cadence/cadenceRes';
import { IBoardGetListRes } from '../../interfaces/board/boardRes';
import { ICoordinatorGetListRes } from '../../interfaces/coordinator/coordinatorRes';
import { ICommitteeGetListRes } from '../../interfaces/committee/committeeRes';
import { IResponsibleGetListRes } from '../../interfaces/event/responsibleRes';
import { INewEventGetListRes } from '../../interfaces/event/newEventRes';
import { IEventGetListRes } from '../../interfaces/event/eventRes';
import { IBoardToMemberGetByMemberIdRes } from '../../interfaces/board/boardToMemberRes';
import { ICoordinatorToMemberGetByMemberIdRes } from '../../interfaces/coordinator/coordinatorToMemberRes';
import { ICommitteeToMemberGetByMemberIdRes } from '../../interfaces/committee/committeeToMemberRes';
import { INewEventToMemberGetListRes } from '../../interfaces/event/newEventToMemberRes';
import SelectBoardAndCadence from '../../components/select/SelectBoardAndCadence';
import SelectCommitteeAndCadence from '../../components/select/SelectCommitteeAndCadence';
import SelectCoordinatorAndCadence from '../../components/select/SelectCoordinatorAndCadence';
import SelectEventAndResp from '../../components/select/SelectEventAndResp';
import { IBoardToMemberCreateReq } from '../../interfaces/board/boardToMemberReq';
import { ICommitteeToMemberCreateReq } from '../../interfaces/committee/committeeToMemberReq';
import { ICoordinatorToMemberCreateReq } from '../../interfaces/coordinator/coordinatorToMemberReq';
import { INewEventToMemberCreateReq } from '../../interfaces/event/newEventToMemberReq';
import { clothingSizeConst } from '../../constants/membership';
// import { ICommittee } from '../../interfaces/committee/committee';
// import { IResponsible } from '../../interfaces/event/responsible';
// import { INewEvent } from '../../interfaces/event/newEvent';
// import { IEvent } from '../../interfaces/event/event';

const pathMapEdit = [
    { url: PATH_MEMBER.ROOT, title: pageNames.pages.member },
    { url: PATH_MEMBER.EDIT, title: pageNames.global.edit },
];

const pathMapCreate = [
    { url: PATH_MEMBER.ROOT, title: pageNames.pages.member },
    { url: PATH_MEMBER.CREATE, title: pageNames.global.create },
];

export default function MemberEditPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [member, setMember] = useState<IMemberGetByIdRes>();
    const [cadenceList, setCadenceList] = useState<ICadenceGetListRes[]>([]);
    const [boardList, setBoardList] = useState<IBoardGetListRes[]>([]);
    const [boardToMemberList, setBoardToMemberList] = useState<IBoardToMemberGetByMemberIdRes[]>([]);
    const [coordinatorList, setCoordinatorList] = useState<ICoordinatorGetListRes[]>([]);
    const [coordinatorToMemberList, setCoordinatorToMemberList] = useState<ICoordinatorToMemberGetByMemberIdRes[]>([]);
    const [committeeList, setCommitteeList] = useState<ICommitteeGetListRes[]>([]);
    const [committeeToMemberList, setCommitteeToMemberList] = useState<ICommitteeToMemberGetByMemberIdRes[]>([]);
    const [responsibleList, setResponsibleList] = useState<IResponsibleGetListRes[]>([]);
    const [newEventList, setNewEventList] = useState<INewEventGetListRes[]>([]);
    const [newEventToMemberList, setNewEventToMemberList] = useState<INewEventToMemberGetListRes[]>([]);
    const [eventList, setEventList] = useState<IEventGetListRes[]>([]);

    const [selectBoard, setSelectBoard] = useState<{ id: number; cadenceId: string; boardId: string }[]>([]);
    const [selectCommittee, setSelectCommittee] = useState<{ id: number; cadenceId: string; committeeId: string }[]>(
        [],
    );
    const [selectCoordinator, setSelectCoordinator] = useState<
        { id: number; cadenceId: string; coordinatorId: string }[]
    >([]);

    const [selectEvent, setSelectEvent] = useState<
        { id: number; eventId: string; newEventId: string; responsibleId: string }[]
    >([]);

    const [form] = useForm([
        useInput({ name: 'name' }),
        useInput({ name: 'surname' }),
        useInput({ name: 'middleName' }),
        useInput({ name: 'bestEmail' }),
        useInput({ name: 'email' }),
        useInput({ name: 'phone' }),
        useInput({ name: 'socialNetwork' }),
        useSelect({ name: 'membership', required: true }),
        useInput({ name: 'group' }),
        useInput({ name: 'faculty' }),
        useSelect({ name: 'clothingSize', required: true }),
        useInput({ name: 'homeAddress' }),
        useInput({ name: 'birthday' }),
    ]);

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        setSelectBoard(
            boardToMemberList.map((item, i) => ({
                id: i,
                boardId: item.boardId.toString(),
                cadenceId: item.cadenceId.toString(),
            })),
        );
    }, [boardToMemberList]);

    useEffect(() => {
        setSelectCommittee(
            committeeToMemberList.map((item, i) => ({
                id: i,
                committeeId: item.committeeId.toString(),
                cadenceId: item.cadenceId.toString(),
            })),
        );
    }, [boardToMemberList]);

    useEffect(() => {
        setSelectCoordinator(
            coordinatorToMemberList.map((item, i) => ({
                id: i,
                coordinatorId: item.coordinatorId.toString(),
                cadenceId: item.cadenceId.toString(),
            })),
        );
    }, [boardToMemberList]);

    useEffect(() => {
        setSelectEvent(
            newEventToMemberList.map((item, i) => ({
                id: i,
                responsibleId: item.responsibleId.toString(),
                newEventId: item.newEventId.toString(),
                eventId: item.newEventId.toString(),
            })),
        );
    }, [newEventToMemberList]);

    const clearForm = () => {
        form.name.setValue('');
        form.surname.setValue('');
        form.middleName.setValue('');
        form.bestEmail.setValue('');
        form.email.setValue('');
        form.phone.setValue('');
        form.socialNetwork.setValue('');
        form.membership.setValue('');
        form.group.setValue('');
        form.faculty.setValue('');
        form.clothingSize.setValue('');
        form.homeAddress.setValue('');
        form.birthday.setValue('');
    };

    const getData = async () => {
        try {
            utilsActions.loading(true);

            const [
                cadenceRes, //
                boardRes,
                coordinatorRes,
                committeeRes,
                responsibleRes,
                newEventRes,
                eventRes,
            ] = await Promise.all([
                cadenceService.getList(),
                boardService.getList(),
                coordinatorService.getList(),
                committeeService.getList(),
                responsibleService.getList(),
                newEventService.getList(),
                eventService.getList(),
            ]);

            if (id) {
                const [
                    memberRes, //
                    boardToMemberRes,
                    coordinatorToMemberRes,
                    committeeToMemberRes,
                    newEventToMemberRes,
                ] = await Promise.all([
                    memberService.getById({ id }),
                    boardToMemberService.getByMemberId({ memberId: id }),
                    coordinatorToMemberService.getByMemberId({ memberId: id }),
                    committeeToMemberService.getByMemberId({ memberId: id }),
                    newEventToMemberService.getByMemberId({ memberId: id }),
                ]);

                setMember(memberRes);
                setBoardToMemberList(boardToMemberRes);
                setCoordinatorToMemberList(coordinatorToMemberRes);
                setCommitteeToMemberList(committeeToMemberRes);
                setNewEventToMemberList(newEventToMemberRes);

                form.name.setValue(memberRes.name);
                form.surname.setValue(memberRes.surname);
                form.middleName.setValue(memberRes.middleName);
                form.bestEmail.setValue(memberRes.bestEmail ? memberRes.bestEmail : '');
                form.email.setValue(memberRes.email);
                form.phone.setValue(memberRes.phone);
                form.socialNetwork.setValue(memberRes.socialNetwork);
                form.membership.setValue(memberRes.membership);
                form.group.setValue(memberRes.group);
                form.faculty.setValue(memberRes.faculty);
                form.clothingSize.setValue(memberRes.clothingSize ? memberRes.clothingSize : '');
                form.homeAddress.setValue(memberRes.homeAddress ? memberRes.homeAddress : '');
                form.birthday.setValue(memberRes.birthday.toString());
            }

            setCadenceList(cadenceRes);
            setBoardList(boardRes);
            setCoordinatorList(coordinatorRes);
            setCommitteeList(committeeRes);
            setResponsibleList(responsibleRes);
            setNewEventList(newEventRes);
            setEventList(eventRes);
        } catch (err) {
            utilsActions.addMessage({
                status: 'error',
                message: 'Error loading data',
            });
        } finally {
            utilsActions.loading(false);
        }
    };

    const getBoardReqData = (memberId: number) => {
        const boardAddReqData: IBoardToMemberCreateReq[] = [];
        const boardDeleteReqData: number[] = [];

        boardToMemberList.forEach((boardToMember) => {
            const existsInSelectBoard = selectBoard.some(
                (item) =>
                    boardToMember.boardId.toString() === item.boardId &&
                    boardToMember.cadenceId.toString() === item.cadenceId,
            );

            if (!existsInSelectBoard) {
                boardDeleteReqData.push(boardToMember.id);
            }
        });

        selectBoard.forEach((item) => {
            const existingBoardToMember = boardToMemberList.find(
                (boardToMember) =>
                    boardToMember.boardId.toString() === item.boardId &&
                    boardToMember.cadenceId.toString() === item.cadenceId,
            );

            if (!existingBoardToMember) {
                boardAddReqData.push({
                    memberId: memberId,
                    boardId: parseInt(item.boardId),
                    cadenceId: parseInt(item.cadenceId),
                    excluded: false,
                    excludedDate: null,
                });
            }
        });

        return { boardAddReqData, boardDeleteReqData };
    };

    const getCommitteeReqData = (memberId: number) => {
        const committeeAddReqData: ICommitteeToMemberCreateReq[] = [];
        const committeeDeleteReqData: number[] = [];

        committeeToMemberList.forEach((committeeToMember) => {
            const existsInSelectBoard = selectCommittee.some(
                (item) =>
                    committeeToMember.committeeId.toString() === item.committeeId &&
                    committeeToMember.cadenceId.toString() === item.cadenceId,
            );

            if (!existsInSelectBoard) {
                committeeDeleteReqData.push(committeeToMember.id);
            }
        });

        selectCommittee.forEach((item) => {
            const existingBoardToMember = committeeToMemberList.find(
                (committeeToMember) =>
                    committeeToMember.committeeId.toString() === item.committeeId &&
                    committeeToMember.cadenceId.toString() === item.cadenceId,
            );

            if (!existingBoardToMember) {
                committeeAddReqData.push({
                    memberId: memberId,
                    committeeId: parseInt(item.committeeId),
                    cadenceId: parseInt(item.cadenceId),
                    isLeader: false,
                    excluded: false,
                    excludedDate: null,
                });
            }
        });

        return { committeeAddReqData, committeeDeleteReqData };
    };

    const getCoordinatorReqData = (memberId: number) => {
        const coordinatorAddReqData: ICoordinatorToMemberCreateReq[] = [];
        const coordinatorDeleteReqData: number[] = [];

        coordinatorToMemberList.forEach((coordinatorToMember) => {
            const existsInSelectCoordinator = selectCoordinator.some(
                (item) =>
                    coordinatorToMember.coordinatorId.toString() === item.coordinatorId &&
                    coordinatorToMember.cadenceId.toString() === item.cadenceId,
            );

            if (!existsInSelectCoordinator) {
                coordinatorDeleteReqData.push(coordinatorToMember.id);
            }
        });

        selectCoordinator.forEach((item) => {
            const existingCoordinatorToMember = coordinatorToMemberList.find(
                (coordinatorToMember) =>
                    coordinatorToMember.coordinatorId.toString() === item.coordinatorId &&
                    coordinatorToMember.cadenceId.toString() === item.cadenceId,
            );

            if (!existingCoordinatorToMember) {
                coordinatorAddReqData.push({
                    memberId: memberId,
                    coordinatorId: parseInt(item.coordinatorId),
                    cadenceId: parseInt(item.cadenceId),
                    excluded: false,
                    excludedDate: null,
                });
            }
        });

        return { coordinatorAddReqData, coordinatorDeleteReqData };
    };

    const getNewEventReqData = (memberId: number) => {
        const newEventAddReqData: INewEventToMemberCreateReq[] = [];
        const newEventDeleteReqData: number[] = [];

        newEventToMemberList.forEach((newEventToMember) => {
            const existsInSelectNewEvent = selectEvent.some(
                (item) =>
                    newEventToMember.newEventId.toString() === item.newEventId &&
                    newEventToMember.responsibleId.toString() === item.responsibleId,
            );

            if (!existsInSelectNewEvent) {
                newEventDeleteReqData.push(newEventToMember.id);
            }
        });

        selectEvent.forEach((item) => {
            const existingNewEventToMember = newEventToMemberList.find(
                (newEventToMember) =>
                    newEventToMember.newEventId.toString() === item.newEventId &&
                    newEventToMember.responsibleId.toString() === item.responsibleId,
            );

            if (!existingNewEventToMember) {
                newEventAddReqData.push({
                    memberId: memberId,
                    newEventId: parseInt(item.newEventId),
                    responsibleId: parseInt(item.responsibleId),
                    excluded: false,
                    excludedDate: null,
                });
            }
        });

        return { newEventAddReqData, newEventDeleteReqData };
    };

    const submit = async () => {
        try {
            utilsActions.loading(true);

            if (id) {
                const updateMember = memberService.update({
                    id: parseInt(id),
                    name: form.name.value,
                    surname: form.surname.value,
                    middleName: form.middleName.value,
                    membership: form.membership.value,
                    email: form.email.value,
                    bestEmail: form.bestEmail.value,
                    clothingSize: form.clothingSize.value,
                    phone: form.phone.value,
                    socialNetwork: form.socialNetwork.value,
                    birthday: new Date(form.birthday.value),
                    homeAddress: form.homeAddress.value,
                    faculty: form.faculty.value,
                    group: form.group.value,
                });

                const { boardAddReqData, boardDeleteReqData } = getBoardReqData(parseInt(id));
                const { committeeAddReqData, committeeDeleteReqData } = getCommitteeReqData(parseInt(id));
                const { coordinatorAddReqData, coordinatorDeleteReqData } = getCoordinatorReqData(parseInt(id));
                const { newEventAddReqData, newEventDeleteReqData } = getNewEventReqData(parseInt(id));

                const boardDeleteRes = boardToMemberService.deleteArray({ id: boardDeleteReqData });
                const committeeDeleteRes = committeeToMemberService.deleteArray({ id: committeeDeleteReqData });
                const coordinatorDeleteRes = coordinatorToMemberService.deleteArray({ id: coordinatorDeleteReqData });
                const newEventDeleteRes = newEventToMemberService.deleteArray({ id: newEventDeleteReqData });

                console.log(committeeAddReqData);

                const boardAddRes = Promise.all(boardAddReqData.map(async (item) => boardToMemberService.create(item)));
                const committeeAddRes = Promise.all(
                    committeeAddReqData.map(async (item) => committeeToMemberService.create(item)),
                );
                const coordinatorAddRes = Promise.all(
                    coordinatorAddReqData.map(async (item) => coordinatorToMemberService.create(item)),
                );
                const newEventAddRes = Promise.all(
                    newEventAddReqData.map(async (item) => newEventToMemberService.create(item)),
                );

                await Promise.all([
                    updateMember,
                    boardDeleteRes,
                    committeeDeleteRes,
                    coordinatorDeleteRes,
                    newEventDeleteRes,
                    boardAddRes,
                    committeeAddRes,
                    coordinatorAddRes,
                    newEventAddRes,
                ]);
            }

            navigate(PATH_MEMBER.LIST);
            clearForm();
            utilsActions.addMessage({
                status: 'success',
                message: `${id ? 'Update' : 'Add'} member is done`,
            });
        } catch (err) {
            utilsActions.addMessage({
                status: 'error',
                message: 'Error add member',
            });
        } finally {
            utilsActions.loading(false);
        }
    };

    //
    //
    //

    return (
        <>
            <ScrollY>
                <div className="p-4">
                    <BreadcrumbsContainer
                        path={id ? pathMapEdit : pathMapCreate}
                        buttons={
                            id
                                ? [
                                      { title: 'Details', path: `${PATH_MEMBER.DETAILS}/${id}` },
                                      { title: 'List', path: PATH_MEMBER.LIST },
                                  ]
                                : [{ title: 'List', path: PATH_MEMBER.LIST }]
                        }
                    />

                    <div className={style['boxContainer']}>
                        {/*<div></div>*/}
                        <div className={style['boxContainer__formBlock']}>
                            <div className={style['boxContainer__formBlock-inner']}>
                                <Input placeholder={'Name'} hookProps={form.name} />
                                <Input placeholder={'Surname'} hookProps={form.surname} />
                                <Input placeholder={'Middle name'} hookProps={form.middleName} />
                                <Select
                                    placeholder={'Membership'}
                                    hookProps={form.membership}
                                    data={clothingSizeConst.map((item) => ({ id: item, name: item }))}
                                />
                            </div>

                            <div className={style['boxContainer__formBlock-inner']}>
                                <Input placeholder={'Email'} hookProps={form.email} />
                                <Input placeholder={'BEST email'} hookProps={form.bestEmail} />
                                <Input placeholder={'Phone'} hookProps={form.phone} />
                                <Input placeholder={'Message'} hookProps={form.socialNetwork} />
                            </div>

                            <div className={style['boxContainer__formBlock-inner']}>
                                <Input placeholder={'Group'} hookProps={form.group} />
                                <Input placeholder={'Faculty'} hookProps={form.faculty} />
                            </div>

                            <div className={style['boxContainer__formBlock-inner']}>
                                <Input placeholder={'Day of birth'} hookProps={form.birthday} />
                                <Input placeholder={'Home address'} hookProps={form.homeAddress} />
                                <Select
                                    placeholder={'Clothing size'}
                                    hookProps={form.clothingSize}
                                    data={clothingSize.map((item) => ({ id: item, name: item }))}
                                />
                            </div>

                            <SelectBoardAndCadence
                                title={'Board'}
                                boardList={boardList}
                                cadenceList={cadenceList}
                                selectArray={selectBoard}
                                setSelectArray={setSelectBoard}
                            />

                            <SelectCommitteeAndCadence
                                title={'Committee'}
                                committeeList={committeeList}
                                cadenceList={cadenceList}
                                selectArray={selectCommittee}
                                setSelectArray={setSelectCommittee}
                            />

                            <SelectCoordinatorAndCadence
                                title={'Coordinator'}
                                coordinatorList={coordinatorList}
                                cadenceList={cadenceList}
                                selectArray={selectCoordinator}
                                setSelectArray={setSelectCoordinator}
                            />

                            <SelectEventAndResp
                                title={'New event to member'}
                                cadenceList={cadenceList}
                                respList={responsibleList}
                                eventList={eventList}
                                newEventList={newEventList}
                                selectArray={selectEvent}
                                setSelectArray={setSelectEvent}
                            />

                            <div className={style['boxContainer__formBlock-button']}>
                                <Button title={'Submit'} onClick={submit} />
                            </div>
                        </div>
                    </div>
                </div>
            </ScrollY>
        </>
    );
}
