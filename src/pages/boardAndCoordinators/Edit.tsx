import React, { useEffect, useState } from 'react';
import { BreadcrumbsContainer, Button, Input } from '../../components';
import { PATH_BaC } from '../../routes/paths';
import { useNavigate, useParams } from 'react-router-dom';
import { pageNames } from '../../constants';
import { utilsActions } from '../../redux/actions/utilsActions';
import { useForm, useInput } from '../../hooks';
import { boardService, coordinatorService } from '../../services';

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

    const [form] = useForm([useInput({ name: 'name' })]);
    const [toggleForm, setToggleForm] = useState<'board' | 'coordinator'>('board');

    useEffect(() => {
        getDate();
    }, []);

    const getDate = async () => {
        try {
            if (id && who) {
                if (who === 'board') {
                    const res = await boardService.getById({ id });
                    form.name.setValue(res.name);
                    setToggleForm('board');
                } else if (who === 'coordinator') {
                    const res = await coordinatorService.getById({ id });
                    form.name.setValue(res.name);
                    setToggleForm('coordinator');
                }
            }
        } catch (err) {
            utilsActions.addMessage({
                status: 'error',
                message: 'Error get data',
            });
        }
    };

    const submit = async () => {
        try {
            utilsActions.loading(true);
            if (id) {
                const payload = { id, name: form.name.value, isActive: true };

                if (toggleForm === 'board') {
                    await boardService.update(payload);

                    utilsActions.addMessage({
                        status: 'success',
                        message: 'Update board is done',
                    });
                } else if (toggleForm === 'coordinator') {
                    await coordinatorService.update(payload);

                    utilsActions.addMessage({
                        status: 'success',
                        message: 'Update coordinator is done',
                    });
                }
            } else {
                const payload = { name: form.name.value, isActive: true };

                if (toggleForm === 'board') {
                    await boardService.create(payload);

                    utilsActions.addMessage({
                        status: 'success',
                        message: 'Add board is done',
                    });
                } else if (toggleForm === 'coordinator') {
                    await coordinatorService.create(payload);

                    utilsActions.addMessage({
                        status: 'success',
                        message: 'Add coordinator is done',
                    });
                }

                form.name.setValue('');
            }
        } catch (err) {
            utilsActions.addMessage({
                status: 'error',
                message: 'Error create',
            });
        } finally {
            utilsActions.loading(false);
        }
    };

    const toggleFormFunc = () => {
        setToggleForm((prev) => (prev === 'board' ? 'coordinator' : 'board'));
    };

    return (
        <>
            <div className="p-4">
                <BreadcrumbsContainer path={id ? pathMapEdit : pathMapCreate}>
                    <div className="flex">
                        <Button onClick={() => navigate(PATH_BaC.LIST)} title="List" />
                    </div>
                </BreadcrumbsContainer>

                {!id && !who && <Button title={`Create ${toggleForm}`} onClick={toggleFormFunc} />}

                <div className="w-96">
                    <Input placeholder={'Name'} hookProps={form.name} />
                </div>
                <div className="mt-2">
                    <Button title="Submit" onClick={submit} />
                </div>
            </div>
        </>
    );
}
