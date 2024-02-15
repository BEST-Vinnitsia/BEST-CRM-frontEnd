import React, { useEffect, useState } from 'react';
import { BreadcrumbsContainer, Button, Input, ScrollY, Text } from '../../components';
import { PATH_MEMBER } from '../../routes/paths';
import { useNavigate, useParams } from 'react-router-dom';
import { pageNames } from '../../constants';
import {
    boardService,
    cadenceService,
    coordinatorService,
    eventService,
    memberService,
    newEventService,
    responsibleService,
} from '../../services';
import { useForm, useInput } from '../../hooks';
import { uuid } from '../../utils';
import { utilsActions } from '../../redux/actions/utilsActions';
import { ICadence } from '../../interfaces/cadence';
import { IBoard } from '../../interfaces/board/board';
import { ICoordinator } from '../../interfaces/coordinator/coordinator';
import { committeeService } from '../../services/committee/committee';
import { ICommittee } from '../../interfaces/committee/committee';
import { IResponsible } from '../../interfaces/event/responsible';
import { INewEvent } from '../../interfaces/event/newEvent';
import { IEvent } from '../../interfaces/event/event';
import SelectBoardAndCadence from '../../components/select/SelectBoardAndCadence';
import SelectCoordinatorAndCadence from '../../components/select/SelectCoordinatorAndCadence';
import SelectCommitteeAndCadence from '../../components/select/SelectCommitteeAndCadence';
import SelectEventAndResp from '../../components/select/SelectEventAndResp';

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

    const [form] = useForm([
        useInput({ name: 'name' }),
        useInput({ name: 'surname' }),
        useInput({ name: 'middleName' }),
        useInput({ name: 'bestEmail' }),
        useInput({ name: 'email' }),
        useInput({ name: 'phone' }),
        useInput({ name: 'socialNetwork' }),
        useInput({ name: 'membership' }),
        useInput({ name: 'group' }),
        useInput({ name: 'faculty' }),
        useInput({ name: 'clothingSize' }),
        useInput({ name: 'homeAddress' }),
        useInput({ name: 'birthday' }),
    ]);

    const [cadenceList, setCadenceList] = useState<ICadence[]>([]);
    const [boardList, setBoardList] = useState<IBoard[]>([]);
    const [coordinatorList, setCoordinatorList] = useState<ICoordinator[]>([]);
    const [committeeList, setCommitteeList] = useState<ICommittee[]>([]);
    const [responsibleList, setResponsibleList] = useState<IResponsible[]>([]);
    const [newEventList, setNewEventList] = useState<INewEvent[]>([]);
    const [eventList, setEventList] = useState<IEvent[]>([]);
    //
    const [boardSelect, setBoardSelect] = useState<{ id: number; cadenceId: string; boardId: string }[]>([]);
    const [coordinatorSelect, setCoordinatorSelect] = useState<
        { id: number; cadenceId: string; coordinatorId: string }[]
    >([]);
    const [committeeSelect, setCommitteeSelect] = useState<{ id: number; cadenceId: string; committeeId: string }[]>(
        [],
    );
    const [eventSelect, setEventSelect] = useState<
        {
            id: number;
            eventId: string;
            newEventId: string;
            responsibleId: string;
        }[]
    >([]);

    //
    //
    //

    useEffect(() => {
        if (id) {
            getMember();
        }
        getData();
    }, []);

    const getMember = async () => {
        if (!id) return;

        const res = await memberService.getById({ id });
        if (!res) return;

        form.name.setValue(res.name);
        form.surname.setValue(res.surname);
        form.middleName.setValue(res.middleName);
        form.bestEmail.setValue(res.bestEmail ? res.bestEmail : '');
        form.email.setValue(res.email);
        form.phone.setValue(res.phone);
        form.socialNetwork.setValue(res.socialNetwork);
        form.membership.setValue(res.membership);
        form.group.setValue(res.group);
        form.faculty.setValue(res.faculty);
        form.clothingSize.setValue(res.clothingSize ? res.clothingSize : '');
        form.homeAddress.setValue(res.homeAddress ? res.homeAddress : '');
        form.birthday.setValue(res.birthday);
    };

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
        setBoardSelect([]);
        setCoordinatorSelect([]);
        setCommitteeSelect([]);
        setEventSelect([]);
    };

    const submitMember = async () => {
        try {
            if (id) {
                utilsActions.loading(true);

                const boardToMember = boardSelect
                    .filter((item) => item.boardId !== '' && item.cadenceId !== '')
                    .map((item) => ({ boardId: item.boardId, cadenceId: item.cadenceId }));
                const coordinatorToMember = coordinatorSelect
                    .filter((item) => item.coordinatorId !== '' && item.cadenceId !== '')
                    .map((item) => ({ coordinatorId: item.coordinatorId, cadenceId: item.cadenceId }));
                const committeeToMember = committeeSelect
                    .filter((item) => item.committeeId !== '' && item.cadenceId !== '')
                    .map((item) => ({ committeeId: item.committeeId, cadenceId: item.cadenceId }));
                const eventToMember = eventSelect
                    .filter((item) => item.newEventId !== '' && item.responsibleId !== '')
                    .map((item) => ({ responsibleId: item.responsibleId, eventId: item.newEventId }));

                const res = await memberService.updateAllInfo({
                    id,
                    name: form.name.value,
                    surname: form.surname.value,
                    middleName: form.middleName.value,

                    email: form.email.value,
                    phone: form.phone.value,
                    socialNetwork: form.socialNetwork.value,
                    bestEmail: form.bestEmail.value ? form.bestEmail.value : null,

                    membership: form.membership.value,
                    birthday: form.birthday.value,

                    group: form.group.value,
                    faculty: form.faculty.value,

                    clothingSize: form.clothingSize.value.toUpperCase(),
                    homeAddress: form.homeAddress.value,

                    boardToMember,
                    coordinatorToMember,
                    committeeToMember,
                    eventToMember,
                });

                clearForm();
                utilsActions.loading(false);
                utilsActions.addMessage({
                    status: 'success',
                    message: 'Update member is done',
                });
            } else {
                utilsActions.loading(true);

                const currentDate = new Date('2000-01-01');
                const boardToMember = boardSelect
                    .filter((item) => item.boardId !== '' && item.cadenceId !== '')
                    .map((item) => ({ boardId: item.boardId, cadenceId: item.cadenceId }));
                const coordinatorToMember = coordinatorSelect
                    .filter((item) => item.coordinatorId !== '' && item.cadenceId !== '')
                    .map((item) => ({ coordinatorId: item.coordinatorId, cadenceId: item.cadenceId }));
                const committeeToMember = committeeSelect
                    .filter((item) => item.committeeId !== '' && item.cadenceId !== '')
                    .map((item) => ({ committeeId: item.committeeId, cadenceId: item.cadenceId }));
                const eventToMember = eventSelect
                    .filter((item) => item.newEventId !== '' && item.responsibleId !== '')
                    .map((item) => ({ responsibleId: item.responsibleId, eventId: item.newEventId }));

                const res = await memberService.createWithAllInfo({
                    login: `${uuid.generate()}@gmail.com`,
                    password: 'P@ssword1234',

                    name: form.name.value,
                    surname: form.surname.value,
                    middleName: form.middleName.value,

                    email: form.email.value,
                    phone: form.phone.value,
                    socialNetwork: form.socialNetwork.value,
                    bestEmail: form.bestEmail.value ? form.bestEmail.value : null,

                    membership: form.membership.value,
                    birthday: currentDate.toISOString(),

                    group: form.group.value,
                    faculty: form.faculty.value,

                    clothingSize: form.clothingSize.value.toUpperCase(),
                    homeAddress: form.homeAddress.value,

                    boardToMember,
                    coordinatorToMember,
                    committeeToMember,
                    eventToMember,
                });

                clearForm();
                utilsActions.loading(false);
                utilsActions.addMessage({
                    status: 'success',
                    message: 'Add member is done',
                });
            }
        } catch (err) {
            utilsActions.loading(false);
            utilsActions.addMessage({
                status: 'error',
                message: 'Error add member',
            });
        }
    };

    const getData = async () => {
        try {
            utilsActions.loading(true);
            if (id) {
                const getAllInfoAboutMemberPromise = memberService.getByIdAllInfo({ id });
                const cadenceListPromise = cadenceService.getList();
                const boardListPromise = boardService.getList();
                const coordinatorListPromise = coordinatorService.getList();
                const committeeListPromise = committeeService.getList();
                const responsibleListPromise = responsibleService.getList();
                const newEventListPromise = newEventService.getList();
                const eventListPromise = eventService.getList();

                const [
                    getAllInfoAboutMemberRes,
                    cadenceListRes,
                    boardListRes,
                    coordinatorListRes,
                    committeeListRes,
                    responsibleListRes,
                    newEventListRes,
                    eventListRes,
                ] = await Promise.all([
                    getAllInfoAboutMemberPromise,
                    cadenceListPromise,
                    boardListPromise,
                    coordinatorListPromise,
                    committeeListPromise,
                    responsibleListPromise,
                    newEventListPromise,
                    eventListPromise,
                ]);

                setBoardSelect(
                    getAllInfoAboutMemberRes.boardToMember.map((item, i) => {
                        return { id: i, cadenceId: item.cadence.id, boardId: item.board.id };
                    }),
                );

                setCoordinatorSelect(
                    getAllInfoAboutMemberRes.coordinatorToMember.map((item, i) => {
                        return { id: i, cadenceId: item.cadence.id, coordinatorId: item.coordinator.id };
                    }),
                );

                setCommitteeSelect(
                    getAllInfoAboutMemberRes.committeeToMember.map((item, i) => {
                        return { id: i, cadenceId: item.cadence.id, committeeId: item.committee.id };
                    }),
                );

                setEventSelect(
                    getAllInfoAboutMemberRes.memberToEvent.map((item, i) => {
                        return {
                            id: i,
                            eventId: item.newEvent.event.id,
                            newEventId: item.newEvent.id,
                            responsibleId: item.responsible.id,
                        };
                    }),
                );

                setCadenceList(cadenceListRes);
                setBoardList(boardListRes);
                setCoordinatorList(coordinatorListRes);
                setCommitteeList(committeeListRes);
                setResponsibleList(responsibleListRes);
                setNewEventList(newEventListRes);
                setEventList(eventListRes);
            } else {
                const cadenceListPromise = cadenceService.getList();
                const boardListPromise = boardService.getList();
                const coordinatorListPromise = coordinatorService.getList();
                const committeeListPromise = committeeService.getList();
                const responsibleListPromise = responsibleService.getList();
                const newEventListPromise = newEventService.getList();
                const eventListPromise = eventService.getList();

                const [
                    cadenceListRes,
                    boardListRes,
                    coordinatorListRes,
                    committeeListRes,
                    responsibleListRes,
                    newEventListRes,
                    eventListRes,
                ] = await Promise.all([
                    cadenceListPromise,
                    boardListPromise,
                    coordinatorListPromise,
                    committeeListPromise,
                    responsibleListPromise,
                    newEventListPromise,
                    eventListPromise,
                ]);

                setCadenceList(cadenceListRes);
                setBoardList(boardListRes);
                setCoordinatorList(coordinatorListRes);
                setCommitteeList(committeeListRes);
                setResponsibleList(responsibleListRes);
                setNewEventList(newEventListRes);
                setEventList(eventListRes);
            }
        } catch (err) {
            utilsActions.addMessage({
                status: 'error',
                message: 'Error loading data',
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
                    <BreadcrumbsContainer path={id ? pathMapEdit : pathMapCreate}>
                        <div className="flex">
                            {id && <Button onClick={() => navigate(`${PATH_MEMBER.DETAILS}/${id}`)} title="Details" />}
                            <Button onClick={() => navigate(PATH_MEMBER.LIST)} title="List" />
                        </div>
                    </BreadcrumbsContainer>
                </div>

                <div className="flex">
                    <div className="w-96">
                        <Input placeholder={'Name'} hookProps={form.name} />
                        <Input placeholder={'Surname'} hookProps={form.surname} />
                        <Input placeholder={'Middle name'} hookProps={form.middleName} />
                        <Input placeholder={'BEST email'} hookProps={form.bestEmail} />
                        <Input placeholder={'Email'} hookProps={form.email} />
                        <Input placeholder={'Phone'} hookProps={form.phone} />
                        <Input placeholder={'Social network'} hookProps={form.socialNetwork} />
                        <Input placeholder={'Membership'} hookProps={form.membership} />
                        <Input placeholder={'Group'} hookProps={form.group} />
                        <Input placeholder={'Faculty'} hookProps={form.faculty} />
                        <Input placeholder={'Clothing size'} hookProps={form.clothingSize} />
                        <Input placeholder={'Home address'} hookProps={form.homeAddress} />
                        <Input placeholder={'Day of birth'} hookProps={form.birthday} />
                    </div>

                    <div className="w-96 mx-5">
                        <SelectBoardAndCadence
                            title={'Board'}
                            cadenceList={cadenceList}
                            boardList={boardList}
                            selectArray={boardSelect}
                            setSelectArray={setBoardSelect}
                        />

                        <SelectCoordinatorAndCadence
                            title={'Coordinator'}
                            cadenceList={cadenceList}
                            coordinatorList={coordinatorList}
                            selectArray={coordinatorSelect}
                            setSelectArray={setCoordinatorSelect}
                        />

                        <SelectCommitteeAndCadence
                            title={'Committee'}
                            cadenceList={cadenceList}
                            committeeList={committeeList}
                            selectArray={committeeSelect}
                            setSelectArray={setCommitteeSelect}
                        />

                        <SelectEventAndResp
                            title={'Event'}
                            cadenceList={cadenceList}
                            newEventList={newEventList}
                            eventList={eventList}
                            respList={responsibleList}
                            selectArray={eventSelect}
                            setSelectArray={setEventSelect}
                        />
                    </div>
                </div>

                <Button title={'Submit'} onClick={submitMember} />
            </ScrollY>
        </>
    );
}

const SelectEvent = ({
    newEventList,
    eventList,
    cadenceList,
    responsibleList,
}: {
    newEventList: INewEvent[];
    eventList: IEvent[];
    cadenceList: ICadence[];
    responsibleList: IResponsible[];
}) => {
    const [selectNewEventId, setSelectNewEventId] = useState('');

    return (
        <div>
            <Text text={'Event'} type={'h4'} color={'gray'} />

            <select
                className="text-black w-80"
                onChange={(e) => setSelectNewEventId(e.target.value)}
                value={selectNewEventId}
            >
                <option value={''}>null</option>

                {newEventList.map((item) => {
                    const eventName = eventList.find((n) => n.id === item.eventId);
                    const cadenceNumber = cadenceList.find((n) => n.id === item.cadenceId);

                    if (!cadenceNumber || !eventName) return <React.Fragment key={item.id} />;

                    return (
                        <option key={item.id} value={item.eventId}>
                            {`${eventName.name}\`${cadenceNumber.number}`}
                        </option>
                    );
                })}
            </select>

            <select className="text-black w-80">
                {responsibleList
                    .filter((item) => item.eventId === selectNewEventId)
                    .map((item) => (
                        <option key={item.id} value={item.name}>
                            {item.name}
                        </option>
                    ))}
            </select>
        </div>
    );
};
