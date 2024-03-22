import React, { useEffect, useState } from 'react';
import { PATH_CADENCE, PATH_EVENT } from '../../routes/paths';
import { useNavigate, useParams } from 'react-router-dom';
import { pageNames } from '../../constants';
import { useForm, useInput } from '../../hooks';
import { utilsActions } from '../../redux/actions/utilsActions';
import { eventService } from '../../services';
import { ScrollY } from '../../ui';

const pathMapEdit = [
    { url: PATH_EVENT.ROOT, title: pageNames.pages.event },
    { url: PATH_EVENT.EDIT, title: pageNames.global.edit },
];

const pathMapCreate = [
    { url: PATH_EVENT.ROOT, title: pageNames.pages.event },
    { url: PATH_EVENT.CREATE, title: pageNames.global.create },
];

export default function EventEditPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form] = useForm([
        useInput({ name: 'name' }), //
        useInput({ name: 'fullName' }),
    ]);
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        getDate();
    }, []);

    const getDate = async () => {
        try {
            if (!id) return;
            utilsActions.loading(true);

            const res = await eventService.getById({ id });
            form.name.setValue(res.name.toString());
            form.fullName.setValue(res.fullName.toString());
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
                await eventService.update({
                    id: parseInt(id),
                    name: form.name.value,
                    fullName: form.fullName.value,
                    isActive: isActive,
                });
            } else {
                await eventService.create({
                    name: form.name.value,
                    fullName: form.fullName.value,
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

            await eventService.delete({ id: id.toString() });

            utilsActions.addMessage({
                status: 'success',
                message: `Event is deleted`,
            });

            navigate(PATH_CADENCE.LIST);
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
                {/*                  { title: 'Details', path: `${PATH_EVENT.DETAILS}/${id}` },*/}
                {/*                  { title: 'List', path: PATH_EVENT.LIST },*/}
                {/*              ]*/}
                {/*            : [{ title: 'List', path: PATH_EVENT.LIST }]*/}
                {/*    }*/}
                {/*>*/}
                {/*    {id && <Button title={'Delete'} onClick={deleteEvent} />}*/}
                {/*</BreadcrumbsContainer>*/}

                {/*<div className={style['boxContainer']}>*/}
                {/*    <div className={style['boxContainer__formBlock']}>*/}
                {/*        <div className={style['boxContainer__formBlock-inner']}>*/}
                {/*            <LongButton*/}
                {/*                color={'dark'}*/}
                {/*                title={`Is ${isActive ? 'active' : 'disable'}`}*/}
                {/*                onClick={() => setIsActive((prev) => !prev)}*/}
                {/*            />*/}
                {/*        </div>*/}

                {/*        <div className={style['boxContainer__formBlock-inner']}>*/}
                {/*            <Input placeholder={'Name'} hookProps={form.name} />*/}
                {/*            <Input placeholder={'Full name'} hookProps={form.fullName} />*/}
                {/*        </div>*/}

                {/*        <div className={style['boxContainer__formBlock-button']}>*/}
                {/*            <Button title={'Submit'} onClick={submit} />*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </ScrollY>
    );
}
