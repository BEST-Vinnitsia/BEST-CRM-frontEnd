import React, { useEffect, useState } from 'react';
import { BreadcrumbsContainer, Button, Text } from '../../components';
import { PATH_MEMBER } from '../../routes/paths';
import { pageNames } from '../../constants';
import { useNavigate } from 'react-router';
import { Navigate, useParams } from 'react-router-dom';
import { memberService } from '../../services';
import { IMember } from '../../interfaces/member/member';
import { formatDate } from '../../utils';

const pathMap = [
    { url: PATH_MEMBER.ROOT, title: pageNames.pages.member },
    { url: PATH_MEMBER.DETAILS, title: pageNames.global.details },
];

export default function MemberDetailPage() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [member, setMember] = useState<IMember | null>(null);

    useEffect(() => {
        getMember();
    }, []);

    if (!id) return <Navigate to={PATH_MEMBER.LIST} />;

    const getMember = async () => {
        if (!id) return;
        const res = await memberService.getById({ id });
        if (!res) return;
        setMember(res);
    };

    // const getPhones = async () => {
    //     const res = await memberService.getById({ id });
    //     if (!res) return;
    //     setMember(res);
    // };
    //
    // const getEmails = async () => {
    //     const res = await memberService.getById({ id });
    //     if (!res) return;
    //     setMember(res);
    // };
    //
    // const getEmails = async () => {
    //     const res = await memberService.getById({ id });
    //     if (!res) return;
    //     setMember(res);
    // };

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
                    <Text text={member.middleName} />
                    <Text text={member.bestEmail ? member.bestEmail : ''} />
                    <Text text={member.membership} />
                    <Text text={member.faculty} />
                    <Text text={member.group} />
                    <Text text={member.homeAddress ? member.homeAddress : ''} />
                    <Text text={formatDate(new Date(member.birthday))} />
                </div>
            )}
        </>
    );
}
