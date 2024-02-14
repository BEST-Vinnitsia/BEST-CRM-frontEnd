import React from 'react';
import { BreadcrumbsContainer, Button, Input } from '../../components';
import { PATH_EVENT } from '../../routes/paths';
import { useNavigate, useParams } from 'react-router-dom';
import { pageNames } from '../../constants';
import { useForm, useInput } from '../../hooks';
import { utilsActions } from '../../redux/actions/utilsActions';
import { committeeService, eventService } from '../../services';

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

    const [form] = useForm([useInput({ name: 'name' })]);

    const submit = async () => {
        try {
            utilsActions.loading(true);
            if (id) {
            } else {
                await eventService.create({ name: form.name.value, isActive: true });
                form.name.setValue('');
                utilsActions.addMessage({
                    status: 'success',
                    message: 'Add event is done',
                });
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

    return (
        <>
            <div className="p-4">
                <BreadcrumbsContainer path={pathMapCreate}>
                    <div className="flex">
                        <Button onClick={() => navigate(PATH_EVENT.LIST)} title="List" />
                    </div>
                </BreadcrumbsContainer>

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
