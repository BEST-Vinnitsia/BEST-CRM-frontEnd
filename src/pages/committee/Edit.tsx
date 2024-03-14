import React, { useEffect, useState } from 'react';
import style from '../member/styleEdit.module.scss';
import { BreadcrumbsContainer, Button, Input, LongButton } from '../../components';
import { PATH_COMMITTEE } from '../../routes/paths';
import { useNavigate, useParams } from 'react-router-dom';
import { pageNames } from '../../constants';
import { useForm, useInput } from '../../hooks';
import { utilsActions } from '../../redux/actions/utilsActions';
import { committeeService } from '../../services';

const pathMapEdit = [
    { url: PATH_COMMITTEE.ROOT, title: pageNames.pages.committee },
    { url: PATH_COMMITTEE.EDIT, title: pageNames.global.edit },
];

const pathMapCreate = [
    { url: PATH_COMMITTEE.ROOT, title: pageNames.pages.committee },
    { url: PATH_COMMITTEE.CREATE, title: pageNames.global.create },
];

export default function CommitteeEditPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [activePosition, setActivePosition] = useState(true);
    const [form] = useForm([
        useInput({ name: 'name' }), //
        useInput({ name: 'fullName' }),
    ]);

    useEffect(() => {
        getDate();
    }, []);

    const getDate = async () => {
        try {
            if (!id) return;

            utilsActions.loading(true);

            const res = await committeeService.getById({ id });
            form.name.setValue(res.name);
            form.fullName.setValue(res.fullName);
            setActivePosition(res.isActive);
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
                await committeeService.update({
                    id: parseInt(id),
                    name: form.name.value,
                    fullName: form.fullName.value,
                    isActive: activePosition,
                });
            } else {
                await committeeService.create({
                    name: form.name.value,
                    fullName: form.fullName.value,
                    isActive: activePosition,
                });
            }

            utilsActions.addMessage({
                status: 'success',
                message: `${id ? 'Update' : 'Add'} committee is done`,
            });

            navigate(PATH_COMMITTEE.LIST);
        } catch (err) {
            utilsActions.addMessage({
                status: 'error',
                message: `Error ${id ? 'update' : 'create'}`,
            });
        } finally {
            utilsActions.loading(false);
        }
    };

    const deletePosition = async () => {
        if (!id) return;

        try {
            utilsActions.loading(true);

            await committeeService.delete({ id: id.toString() });

            utilsActions.addMessage({
                status: 'success',
                message: 'Committee is deleted',
            });

            navigate(PATH_COMMITTEE.LIST);
        } catch (err) {
            utilsActions.addMessage({
                status: 'error',
                message: 'Error delete position',
            });
        } finally {
            utilsActions.loading(false);
        }
    };

    return (
        <>
            <div className="p-4">
                {/*<BreadcrumbsContainer*/}
                {/*    path={id ? pathMapEdit : pathMapCreate}*/}
                {/*    buttons={*/}
                {/*        id*/}
                {/*            ? [*/}
                {/*                  { title: 'Details', path: `${PATH_COMMITTEE.DETAILS}//${id}` },*/}
                {/*                  { title: 'List', path: PATH_COMMITTEE.LIST },*/}
                {/*              ]*/}
                {/*            : [{ title: 'List', path: PATH_COMMITTEE.LIST }]*/}
                {/*    }*/}
                {/*>*/}
                {/*    {id && <Button title={'Delete'} onClick={deletePosition} />}*/}
                {/*</BreadcrumbsContainer>*/}

                <div className={style['boxContainer']}>
                    <div className={style['boxContainer__formBlock']}>
                        <div className={style['boxContainer__formBlock-inner']}>
                            <LongButton
                                color={'dark'}
                                title={`Active: ${activePosition ? 'Yes' : 'No'}`}
                                onClick={() => setActivePosition((prev) => !prev)}
                            />
                        </div>

                        <div className={style['boxContainer__formBlock-inner']}>
                            <Input placeholder={'Name'} hookProps={form.name} />
                            <Input placeholder={'Full name'} hookProps={form.fullName} />
                        </div>

                        <div className={style['boxContainer__formBlock-button']}>
                            <Button title={'Submit'} onClick={submit} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
