import React, { useEffect, useState } from 'react';
import { BreadcrumbsContainer, Button, Input, LongButton } from '../../components';
import { PATH_BaC } from '../../routes/paths';
import { useNavigate, useParams } from 'react-router-dom';
import { pageNames } from '../../constants';
import { utilsActions } from '../../redux/actions/utilsActions';
import { useForm, useInput } from '../../hooks';
import { boardService, coordinatorService } from '../../services';
import style from '../member/styleEdit.module.scss';

const pathMapEdit = [
    { url: PATH_BaC.ROOT, title: pageNames.pages.BaC },
    { url: PATH_BaC.EDIT, title: pageNames.global.edit },
];

const pathMapCreate = [
    { url: PATH_BaC.ROOT, title: pageNames.pages.BaC },
    { url: PATH_BaC.CREATE, title: pageNames.global.create },
];

export default function BoardAndCoordinatorsEditPage() {
    const { id, who } = useParams();
    const navigate = useNavigate();

    const [form] = useForm([
        useInput({ name: 'name' }), //
        useInput({ name: 'fullName' }),
    ]);
    const [toggleForm, setToggleForm] = useState<'board' | 'coordinator'>('board');
    const [activePosition, setActivePosition] = useState(true);

    useEffect(() => {
        getDate();
    }, []);

    const getDate = async () => {
        try {
            if (!id || !who) return;
            utilsActions.loading(true);

            if (who === 'board') {
                const res = await boardService.getById({ id });
                form.name.setValue(res.name);
                form.fullName.setValue(res.fullName);
                setActivePosition(res.isActive);
                setToggleForm('board');
            } else if (who === 'coordinator') {
                const res = await coordinatorService.getById({ id });
                form.name.setValue(res.name);
                form.fullName.setValue(res.fullName);
                setActivePosition(res.isActive);
                setToggleForm('coordinator');
            }
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
                if (toggleForm === 'board') {
                    await boardService.update({
                        id: parseInt(id),
                        name: form.name.value,
                        fullName: form.fullName.value,
                        isActive: activePosition,
                    });
                } else if (toggleForm === 'coordinator') {
                    await coordinatorService.update({
                        id: parseInt(id),
                        name: form.name.value,
                        fullName: form.fullName.value,
                        isActive: activePosition,
                    });
                }
            } else {
                if (toggleForm === 'board') {
                    await boardService.create({
                        name: form.name.value,
                        fullName: form.fullName.value,
                        isActive: activePosition,
                    });
                } else if (toggleForm === 'coordinator') {
                    await coordinatorService.create({
                        name: form.name.value,
                        fullName: form.fullName.value,
                        isActive: activePosition,
                    });
                }
            }

            utilsActions.addMessage({
                status: 'success',
                message: `${id ? 'Update' : 'Add'} ${toggleForm} is done`,
            });
            
            navigate(PATH_BaC.LIST);
        } catch (err) {
            utilsActions.addMessage({
                status: 'error',
                message: `Error ${id ? 'update' : 'create'}`,
            });
        } finally {
            utilsActions.loading(false);
        }
    };

    const toggleFormFunc = () => {
        setToggleForm((prev) => (prev === 'board' ? 'coordinator' : 'board'));
    };

    const deletePosition = async () => {
        if (!id || !who) return;

        try {
            utilsActions.loading(true);

            if (who === 'board') {
                await boardService.delete({ id: id.toString() });
            } else if (who === 'coordinator') {
                await coordinatorService.delete({ id: id.toString() });
            }

            utilsActions.addMessage({
                status: 'success',
                message: `${who === 'board' ? 'Board' : 'Coordinator'} is deleted`,
            });

            navigate(PATH_BaC.LIST);
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
                {/*                  { title: 'Details', path: `${PATH_BaC.DETAILS}/${who}/${id}` },*/}
                {/*                  { title: 'List', path: PATH_BaC.LIST },*/}
                {/*              ]*/}
                {/*            : [{ title: 'List', path: PATH_BaC.LIST }]*/}
                {/*    }*/}
                {/*>*/}
                {/*    {id && <Button title={'Delete'} onClick={deletePosition} />}*/}
                {/*</BreadcrumbsContainer>*/}

                <div className={style['boxContainer']}>
                    <div className={style['boxContainer__formBlock']}>
                        <div className={style['boxContainer__formBlock-inner']}>
                            {!id && !who && (
                                <LongButton color={'dark'} title={`Create ${toggleForm}`} onClick={toggleFormFunc} />
                            )}
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
