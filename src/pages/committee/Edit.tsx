import React from 'react';
import { BreadcrumbsContainer, Button, Input } from '../../components';
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

    const [form] = useForm([useInput({ name: 'name' })]);

    const submit = async () => {
        try {
            utilsActions.loading(true);
            if (id) {
            } else {
                await committeeService.create({ name: form.name.value, isActive: true });
                form.name.setValue('');
                utilsActions.addMessage({
                    status: 'success',
                    message: 'Add committee is done',
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
                        <Button onClick={() => navigate(PATH_COMMITTEE.LIST)} title="List" />
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
