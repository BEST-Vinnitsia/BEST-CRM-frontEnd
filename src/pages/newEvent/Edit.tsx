import React, { useEffect, useState } from 'react';
import { BreadcrumbsContainer, Button, Input, ScrollY, Select } from '../../components';
import { PATH_EVENT, PATH_NEW_EVENT } from '../../routes/paths';
import { useNavigate, useParams } from 'react-router-dom';
import { pageNames } from '../../constants';
import { useForm, useInput, useSelect } from '../../hooks';
import { utilsActions } from '../../redux/actions/utilsActions';
import { cadenceService, eventService, newEventService } from '../../services';
import style from '../member/styleEdit.module.scss';
import { IEventGetListRes } from '../../interfaces/event/eventRes';
import { ICadenceGetListRes } from '../../interfaces/cadence/cadenceRes';
import { intToRoman } from '../../utils';

const pathMapEdit = [
    { url: PATH_EVENT.ROOT, title: pageNames.pages.newEvent },
    { url: PATH_NEW_EVENT.EDIT, title: pageNames.global.edit },
];

const pathMapCreate = [
    { url: PATH_EVENT.ROOT, title: pageNames.pages.newEvent },
    { url: PATH_NEW_EVENT.CREATE, title: pageNames.global.create },
];

export default function NewEventEditPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [eventList, setEventList] = useState<IEventGetListRes[]>([]);
    const [cadenceList, setCadenceList] = useState<ICadenceGetListRes[]>([]);
    const [form] = useForm([
        useInput({ name: 'name' }), //
        useSelect({ name: 'eventId' }),
        useSelect({ name: 'cadenceId' }),
    ]);

    useEffect(() => {
        getDate();
    }, []);

    const getDate = async () => {
        try {
            utilsActions.loading(true);

            const eventListRes = await eventService.getList();
            const cadenceListRes = await cadenceService.getList();
            setEventList(eventListRes);
            setCadenceList(cadenceListRes);

            if (!id) return;

            const res = await newEventService.getById({ id });
            form.name.setValue(res.name.toString());
            form.eventId.setValue(res.eventId.toString());
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
                await newEventService.update({
                    id: parseInt(id),
                    eventId: parseInt(form.eventId.value),
                    name: form.name.value,
                    cadenceId: parseInt(form.cadenceId.value),
                });
            } else {
                await newEventService.create({
                    eventId: parseInt(form.eventId.value),
                    name: form.name.value,
                    cadenceId: parseInt(form.cadenceId.value),
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

            await newEventService.delete({ id: id.toString() });

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
                {/*<BreadcrumbsContainer*/}
                {/*    path={id ? pathMapEdit : pathMapCreate}*/}
                {/*    buttons={*/}
                {/*        id*/}
                {/*            ? [*/}
                {/*                  { title: 'Details', path: `${PATH_NEW_EVENT.DETAILS}/${id}` },*/}
                {/*                  { title: 'List', path: PATH_EVENT.LIST },*/}
                {/*              ]*/}
                {/*            : [{ title: 'List', path: PATH_EVENT.LIST }]*/}
                {/*    }*/}
                {/*>*/}
                {/*    {id && <Button title={'Delete'} onClick={deleteEvent} />}*/}
                {/*</BreadcrumbsContainer>*/}

                <div className={style['boxContainer']}>
                    <div className={style['boxContainer__formBlock']}>

                        <div className={style['boxContainer__formBlock-inner']}>
                            <Select
                                placeholder={'Event'}
                                hookProps={form.eventId}
                                data={eventList.map((item) => ({ id: item.id, name: item.name }))}
                            />
                            <Select
                                placeholder={'Cadence'}
                                hookProps={form.cadenceId}
                                data={cadenceList.map((item) => ({
                                    id: item.id,
                                    name: `Cadence: ${intToRoman(item.number)}`,
                                }))}
                            />
                            <Input placeholder={'Name'} hookProps={form.name} />
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
