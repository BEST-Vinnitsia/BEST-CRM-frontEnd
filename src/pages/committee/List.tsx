import React, { useEffect, useState } from 'react';
import { BreadcrumbsContainer, Button, Text } from '../../components';
import { PATH_COMMITTEE } from '../../routes/paths';
import { utilsActions } from '../../redux/actions/utilsActions';
import { pageNames } from '../../constants';
import { useNavigate } from 'react-router';
import { committeeService } from '../../services';
import { ICommittee } from '../../interfaces/committee/committee';

const pathMap = [
    { url: PATH_COMMITTEE.ROOT, title: pageNames.pages.committee },
    { url: PATH_COMMITTEE.LIST, title: pageNames.global.list },
];

export default function CommitteeListPage() {
    const navigate = useNavigate();

    const [committeeList, setCommitteeList] = useState<ICommittee[]>([]);

    useEffect(() => {
        getInfo();
    }, []);

    const getInfo = async () => {
        try {
            const committeeListPromise = committeeService.getList();

            utilsActions.loading(true);
            const [committeeRes] = await Promise.all([committeeListPromise]);
            utilsActions.loading(false);

            setCommitteeList(committeeRes);
        } catch (err) {
            utilsActions.loading(false);
            utilsActions.addMessage({
                status: 'error',
                message: 'Error loading data',
            });
        }
    };

    return (
        <>
            <div className="p-4">
                <BreadcrumbsContainer path={pathMap}>
                    <div className="flex">
                        <Button onClick={() => navigate(PATH_COMMITTEE.CREATE)} title="Create" />
                    </div>
                </BreadcrumbsContainer>

                <div className="mb-5">
                    <Text text={'Committee'} color={'gray'} />

                    {committeeList.map((item) => (
                        <div key={item.id}>
                            <Text text={item.name} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
