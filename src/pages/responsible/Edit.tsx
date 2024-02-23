import React, { useEffect, useState } from 'react';
import { BreadcrumbsContainer, Button, Input, LongButton, ScrollY, Select } from '../../components';
import { PATH_EVENT, PATH_RESP } from '../../routes/paths';
import { useNavigate, useParams } from 'react-router-dom';
import { pageNames } from '../../constants';
import { useForm, useInput, useSelect } from '../../hooks';
import { utilsActions } from '../../redux/actions/utilsActions';
import { eventService, responsibleService } from '../../services';
import style from '../member/styleEdit.module.scss';
import { IEventGetListRes } from '../../interfaces/event/eventRes';

const pathMapEdit = [
    { url: PATH_EVENT.ROOT, title: pageNames.pages.event },
    { url: PATH_RESP.EDIT, title: pageNames.global.edit },
];

const pathMapCreate = [
    { url: PATH_EVENT.ROOT, title: pageNames.pages.event },
    { url: PATH_RESP.CREATE, title: pageNames.global.create },
];

export default function ResponsibleEditPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [eventList, setEventList] = useState<IEventGetListRes[]>([]);
    const [form] = useForm([
        useInput({ name: 'name' }), //
        useInput({ name: 'fullName' }),
        useInput({ name: 'role' }),
        useInput({ name: 'description' }),
        useSelect({ name: 'eventId' }),
    ]);
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        getDate();
    }, []);

    const getDate = async () => {
        try {
            utilsActions.loading(true);

            const eventListRes = await eventService.getList();
            setEventList(eventListRes);

            if (!id) return;

            const res = await responsibleService.getById({ id });
            form.name.setValue(res.name.toString());
            form.fullName.setValue(res.fullName.toString());
            form.role.setValue(res.role.toString());
            form.description.setValue(res.description.toString());
            form.eventId.setValue(res.eventId.toString());
            setIsActive(res.isActive);
        } catch (err) {
            utilsActions.addMessage({
                status: 'error',
                message: 'Error get data',
            });
        } finally {
            utilsActions.loading(false);
        }
    };

    const submit = async () => {
        try {
            utilsActions.loading(true);
            if (id) {
                await responsibleService.update({
                    id: parseInt(id),
                    eventId: parseInt(form.eventId.value),
                    name: form.name.value,
                    fullName: form.fullName.value,
                    description: form.fullName.value,
                    role: form.role.value,
                    isActive: isActive,
                });
            } else {
                await responsibleService.create({
                    eventId: parseInt(form.eventId.value),
                    name: form.name.value,
                    fullName: form.fullName.value,
                    description: form.fullName.value,
                    role: form.role.value,
                    isActive: isActive,
                });
            }

            utilsActions.addMessage({
                status: 'success',
                message: `${id ? 'Update' : 'Add'} event is done`,
            });

            navigate(PATH_EVENT.LIST);
        } catch (err) {
            utilsActions.addMessage({
                status: 'error',
                message: `Error ${id ? 'update' : 'create'}`,
            });
        } finally {
            utilsActions.loading(false);
        }
    };

    const deleteEvent = async () => {
        if (!id) return;

        try {
            utilsActions.loading(true);

            await responsibleService.delete({ id: id.toString() });

            utilsActions.addMessage({
                status: 'success',
                message: `Event is deleted`,
            });

            navigate(PATH_EVENT.LIST);
        } catch (err) {
            utilsActions.addMessage({
                status: 'error',
                message: 'Error delete event',
            });
        } finally {
            utilsActions.loading(false);
        }
    };

    return (
        <ScrollY>
            <div className="p-4">
                <BreadcrumbsContainer
                    path={id ? pathMapEdit : pathMapCreate}
                    buttons={
                        id
                            ? [
                                  { title: 'Details', path: `${PATH_RESP.DETAILS}/${id}` },
                                  { title: 'List', path: PATH_EVENT.LIST },
                              ]
                            : [{ title: 'List', path: PATH_EVENT.LIST }]
                    }
                >
                    {id && <Button title={'Delete'} onClick={deleteEvent} />}
                </BreadcrumbsContainer>

                <div className={style['boxContainer']}>
                    <div className={style['boxContainer__formBlock']}>
                        <div className={style['boxContainer__formBlock-inner']}>
                            <LongButton
                                color={'dark'}
                                title={`Is ${isActive ? 'active' : 'disable'}`}
                                onClick={() => setIsActive((prev) => !prev)}
                            />
                        </div>

                        <div className={style['boxContainer__formBlock-inner']}>
                            <Select
                                placeholder={'Event'}
                                hookProps={form.eventId}
                                data={eventList.map((item) => ({ id: item.id, name: item.name }))}
                            />
                            <Input placeholder={'Name'} hookProps={form.name} />
                            <Input placeholder={'Full name'} hookProps={form.fullName} />
                            <Input placeholder={'Role'} hookProps={form.role} />
                            <Input placeholder={'Description'} hookProps={form.description} />
                        </div>

                        <div className={style['boxContainer__formBlock-button']}>
                            <Button title={'Submit'} onClick={submit} />
                        </div>
                    </div>
                </div>
            </div>
        </ScrollY>
    );
}
