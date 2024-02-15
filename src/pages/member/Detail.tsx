import React, { useEffect, useState } from 'react';
import { BreadcrumbsContainer, Button, Text } from '../../components';
import { PATH_MEMBER } from '../../routes/paths';
import { pageNames } from '../../constants';
import { useNavigate } from 'react-router';
import { Navigate, useParams } from 'react-router-dom';
import { memberService } from '../../services';
import { formatDate, intToRoman } from '../../utils';
import { IMemberListAllInfo } from '../../interfaces/member/memberBigData';
import { utilsActions } from '../../redux/actions/utilsActions';

const pathMap = [
    { url: PATH_MEMBER.ROOT, title: pageNames.pages.member },
    { url: PATH_MEMBER.DETAILS, title: pageNames.global.details },
];

export default function MemberDetailPage() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [member, setMember] = useState<IMemberListAllInfo | null>(null);

    useEffect(() => {
        getMember();
    }, []);

    if (!id) return <Navigate to={PATH_MEMBER.LIST} />;

    const getMember = async () => {
        if (!id) return;
        try {
            utilsActions.loading(true);
            
            const res = await memberService.getByIdAppInfo({ id });
            setMember(res);
        } catch (err) {
            utilsActions.addMessage({
                status: 'error',
                message: 'Error loading data',
            });
        } finally {
            utilsActions.loading(false);
        }
    };

    return (
        <>
            <div className="p-4">
                <BreadcrumbsContainer path={pathMap}>
                    <div className="flex">
                        <Button onClick={() => navigate(`${PATH_MEMBER.EDIT}/${id}`)} title="Edit" />
                        <Button onClick={() => navigate(PATH_MEMBER.LIST)} title="List" />
                    </div>
                </BreadcrumbsContainer>
            </div>

            {member && (
                <div>
                    <Text text={member.name} />
                    <Text text={member.surname} />
                    <Text text={member.bestEmail ? member.bestEmail : ''} />
                    <Text text={member.membership} />
                    <Text text={member.faculty} />
                    <Text text={member.group} />
                    <Text text={formatDate(new Date(member.birthday))} />

                    <hr />
                    <Text text={'Board'} />
                    {member.boardToMember.map((item) => (
                        <div>
                            <span>{`${item.board.name} ${intToRoman(item.cadence.number)}`}</span>
                        </div>
                    ))}

                    <hr />
                    <Text text={'Coordinator'} />
                    {member.coordinatorToMember.map((item) => (
                        <div>
                            <span>{`${item.coordinator.name} ${intToRoman(item.cadence.number)}`}</span>
                        </div>
                    ))}

                    <hr />
                    <Text text={'Committee'} />
                    {member.committeeToMember.map((item) => (
                        <div>
                            <span>{`${item.committee.name} ${intToRoman(item.cadence.number)}`}</span>
                            <span className="block">{`Position: `}</span>
                        </div>
                    ))}

                    <hr />
                    <Text text={'Event'} />
                    {member.memberToEvent.map((item) => (
                        <div>
                            <span>{`${item.newEvent.event.name} ${intToRoman(item.newEvent.cadence.number)}`}</span>
                            <span className="block">{`Position: ${item.responsible.name} ${item.responsible.role}`}</span>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
