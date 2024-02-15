import React, { useEffect, useState } from 'react';
import { BreadcrumbsContainer, Button, Text } from '../../components';
import { PATH_COMMITTEE } from '../../routes/paths';
import { pageNames } from '../../constants';
import { useNavigate } from 'react-router';
import { utilsActions } from '../../redux/actions/utilsActions';
import { committeeService } from '../../services';
import { ICommitteeAllInfo } from '../../interfaces/committee/committeeAllInfo';
import { Navigate, useParams } from 'react-router-dom';
import { intToRoman } from '../../utils';

const pathMap = [
    { url: PATH_COMMITTEE.ROOT, title: pageNames.pages.committee },
    { url: PATH_COMMITTEE.DETAILS, title: pageNames.global.details },
];

export default function CommitteeDetailPage() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [committee, setCommittee] = useState<ICommitteeAllInfo | null>(null);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        if (!id) return;

        try {
            utilsActions.loading(true);

            const res = await committeeService.getByIdAllInfo({ id });
            setCommittee(res);
        } catch (err) {
            utilsActions.addMessage({
                status: 'error',
                message: 'Error loading data',
            });
        } finally {
            utilsActions.loading(false);
        }
    };

    const deleteCommittee = async () => {
        if (!id) return;

        try {
            utilsActions.loading(true);

            await committeeService.deleteMany({ committeesId: [id] });

            navigate(PATH_COMMITTEE.LIST);

            utilsActions.addMessage({
                status: 'success',
                message: 'Committee is deleted',
            });
        } catch (err) {
            utilsActions.addMessage({
                status: 'error',
                message: 'Error delete committee',
            });
        } finally {
            utilsActions.loading(false);
        }
    };

    if (!id) <Navigate to={PATH_COMMITTEE.LIST} />;

    return (
        <>
            <div className="p-4">
                <BreadcrumbsContainer path={pathMap}>
                    <div className="flex">
                        <Button onClick={deleteCommittee} title="Delete" />
                        <Button onClick={() => navigate(`${PATH_COMMITTEE.EDIT}/id`)} title="Edit" />
                        <Button onClick={() => navigate(PATH_COMMITTEE.LIST)} title="List" />
                    </div>
                </BreadcrumbsContainer>

                {committee && (
                    <div>
                        <Text text={committee.name} />
                        <Text text={`Is active: ${committee.isActive}`} />

                        {committee.committeeToMember.map((item) => (
                            <div>
                                <Text text={`${item.member.name} ${item.member.surname}`} />
                                <Text text={`Cadence: ${intToRoman(item.cadence.number)}`} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
