import React, { useEffect, useState } from 'react';
import { PATH_CADENCE } from '../../routes/paths';
import { useNavigate, useParams } from 'react-router-dom';
import { pageNames } from '../../constants';
import { BreadcrumbsContainer, Button, Input, LongButton } from '../../components';
import { useForm, useInput } from '../../hooks';
import style from '../member/styleEdit.module.scss';
import { utilsActions } from '../../redux/actions/utilsActions';
import { cadenceService } from '../../services';

const pathMapEdit = [
    { url: PATH_CADENCE.ROOT, title: pageNames.pages.cadence },
    { url: PATH_CADENCE.EDIT, title: pageNames.global.edit },
];

const pathMapCreate = [
    { url: PATH_CADENCE.ROOT, title: pageNames.pages.cadence },
    { url: PATH_CADENCE.CREATE, title: pageNames.global.create },
];

export default function CadenceEditPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form] = useForm([
        useInput({ name: 'number' }), //
    ]);
    const [isEnd, setIsEnd] = useState(true);

    useEffect(() => {
        getDate();
    }, []);

    const getDate = async () => {
        try {
            if (!id) return;
            utilsActions.loading(true);

            const res = await cadenceService.getById({ id });
            form.number.setValue(res.number.toString());
            setIsEnd(res.isEnd);
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
                await cadenceService.update({
                    id: parseInt(id),
                    number: parseInt(form.number.value),
                    isEnd: isEnd,
                    endDate: new Date().toISOString(),
                    startDate: new Date().toISOString(),
                });
            } else {
                await cadenceService.create({
                    number: parseInt(form.number.value),
                    isEnd: isEnd,
                    endDate: new Date().toISOString(),
                    startDate: new Date().toISOString(),
                });
            }

            utilsActions.addMessage({
                status: 'success',
                message: `${id ? 'Update' : 'Add'} cadence is done`,
            });

            navigate(PATH_CADENCE.LIST);
        } catch (err) {
            utilsActions.addMessage({
                status: 'error',
                message: `Error ${id ? 'update' : 'create'}`,
            });
        } finally {
            utilsActions.loading(false);
        }
    };

    const deleteCadence = async () => {
        if (!id) return;

        try {
            utilsActions.loading(true);

            await cadenceService.delete({ id: id.toString() });

            utilsActions.addMessage({
                status: 'success',
                message: `Cadence is deleted`,
            });

            navigate(PATH_CADENCE.LIST);
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
                <BreadcrumbsContainer
                    path={id ? pathMapEdit : pathMapCreate}
                    buttons={
                        id
                            ? [
                                  { title: 'Details', path: `${PATH_CADENCE.DETAILS}/${id}` },
                                  { title: 'List', path: PATH_CADENCE.LIST },
                              ]
                            : [{ title: 'List', path: PATH_CADENCE.LIST }]
                    }
                >
                    {id && <Button title={'Delete'} onClick={deleteCadence} />}
                </BreadcrumbsContainer>

                <div className={style['boxContainer']}>
                    <div className={style['boxContainer__formBlock']}>
                        <div className={style['boxContainer__formBlock-inner']}>
                            <LongButton
                                color={'dark'}
                                title={`Cadence is end: ${isEnd ? 'yes' : 'no'}`}
                                onClick={() => setIsEnd((prev) => !prev)}
                            />
                        </div>

                        <div className={style['boxContainer__formBlock-inner']}>
                            <Input placeholder={'Cadence number'} hookProps={form.number} />
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
