import React, { useEffect, useState } from 'react';
import style from './styleEdit.module.scss';
import { BreadcrumbsContainer, Button, Input, ScrollY } from '../../components';
import { PATH_MEMBER } from '../../routes/paths';
import { useNavigate, useParams } from 'react-router-dom';
import { pageNames } from '../../constants';
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
import { useForm, useInput } from '../../hooks';
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

    useEffect(() => {
        getData();
    }, []);

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

    const submit = async () => {
        try {
            utilsActions.loading(true);

            if (id) {
                await memberService.update({
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
                    <BreadcrumbsContainer path={id ? pathMapEdit : pathMapCreate}>
                        <div className="flex">
                            {id && <Button onClick={() => navigate(`${PATH_MEMBER.DETAILS}/${id}`)} title="Details" />}
                            <Button onClick={() => navigate(PATH_MEMBER.LIST)} title="List" />
                        </div>
                    </BreadcrumbsContainer>

                    <div className={style['boxContainer']}>
                        <div></div>
                        <div className={style['boxContainer__formBlock']}>
                            <div className={style['boxContainer__formBlock-inner']}>
                                <Input placeholder={'Name'} hookProps={form.name} />
                                <Input placeholder={'Surname'} hookProps={form.surname} />
                                <Input placeholder={'Middle name'} hookProps={form.middleName} />
                                <Input placeholder={'Membership'} hookProps={form.membership} />
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
                                <Input placeholder={'Clothing size'} hookProps={form.clothingSize} />
                            </div>

                            <div className={style['boxContainer__formBlock-button']}>
                                <Button title={'Submit'} onClick={submit} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex">
                    {/*<div className="w-96 mx-5">*/}
                    {/*    <SelectBoardAndCadence*/}
                    {/*        title={'Board'}*/}
                    {/*        cadenceList={cadenceList}*/}
                    {/*        boardList={boardList}*/}
                    {/*        selectArray={boardSelect}*/}
                    {/*        setSelectArray={setBoardSelect}*/}
                    {/*    />*/}

                    {/*    <SelectCoordinatorAndCadence*/}
                    {/*        title={'Coordinator'}*/}
                    {/*        cadenceList={cadenceList}*/}
                    {/*        coordinatorList={coordinatorList}*/}
                    {/*        selectArray={coordinatorSelect}*/}
                    {/*        setSelectArray={setCoordinatorSelect}*/}
                    {/*    />*/}

                    {/*    <SelectCommitteeAndCadence*/}
                    {/*        title={'Committee'}*/}
                    {/*        cadenceList={cadenceList}*/}
                    {/*        committeeList={committeeList}*/}
                    {/*        selectArray={committeeSelect}*/}
                    {/*        setSelectArray={setCommitteeSelect}*/}
                    {/*    />*/}

                    {/*    <SelectEventAndResp*/}
                    {/*        title={'Event'}*/}
                    {/*        cadenceList={cadenceList}*/}
                    {/*        newEventList={newEventList}*/}
                    {/*        eventList={eventList}*/}
                    {/*        respList={responsibleList}*/}
                    {/*        selectArray={eventSelect}*/}
                    {/*        setSelectArray={setEventSelect}*/}
                    {/*    />*/}
                    {/*</div>*/}
                </div>
            </ScrollY>
        </>
    );
}
