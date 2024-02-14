import React from 'react';
import { BreadcrumbsContainer, Button, Select } from '../../components';
import { PATH_CADENCE } from '../../routes/paths';
import { pageNames } from '../../constants';
import { useNavigate } from 'react-router';
import { useForm, useSelect } from '../../hooks';

const demoList = [
    { id: '1', name: 'Afghanistan' },
    { id: '2', name: 'Albania' },
    { id: '3', name: 'Algeria' },
    { id: '4', name: 'Andorra' },
    { id: '5', name: 'Angola' },
    { id: '6', name: 'Antigua and Barbuda' },
    { id: '7', name: 'Argentina' },
    { id: '8', name: 'Armenia' },
    { id: '9', name: 'Australia' },
    { id: '10', name: 'Australia 10' },
    { id: '11', name: 'Australia 11' },
    { id: '12', name: 'Australia 12' },
    { id: '13', name: 'Australia 13' },
    { id: '14', name: 'Australia 14' },
    { id: '15', name: 'Australia 15' },
    { id: '16', name: 'Australia 16' },
    { id: '17', name: 'Australia 17' },
    { id: '18', name: 'Australia 18' },
    { id: '19', name: 'Australia 19' },
    { id: '20', name: 'Australia 20' },
    { id: '21', name: 'Australia 21' },
];

const pathMap = [
    { url: PATH_CADENCE.ROOT, title: pageNames.pages.cadence },
    { url: PATH_CADENCE.LIST, title: pageNames.global.list },
];

export default function CadenceListPage() {
    const navigate = useNavigate();

    const [form] = useForm([useSelect({ name: 'test', required: true })]);

    return (
        <>
            <div className="p-4">
                <BreadcrumbsContainer path={pathMap}>
                    <div className="flex">
                        <Button onClick={() => navigate(`${PATH_CADENCE.EDIT}/id`)} title="Edit" />
                        <Button onClick={() => navigate(PATH_CADENCE.CREATE)} title="Create" />
                        <Button onClick={() => navigate(`${PATH_CADENCE.DETAILS}/id`)} title="Details" />
                    </div>
                </BreadcrumbsContainer>
            </div>

            <div className="px-4 py-3">
                <Select placeholder={'asd'} hookProps={form.test} data={demoList} />
            </div>
        </>
    );
}
