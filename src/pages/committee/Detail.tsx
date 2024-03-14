import React, { useEffect, useState } from 'react';
import style from './details.module.scss';
import { PATH_COMMITTEE } from '../../routes/paths';
import { pageNames } from '../../constants';
import { useNavigate } from 'react-router';
import { utilsActions } from '../../redux/actions/utilsActions';
// import { ICommitteeAllInfo } from '../../interfaces/committee/committeeAllInfo';
import { Navigate, useParams } from 'react-router-dom';
import {
    BreadcrumbsContainer,
    Card,
    CardContainer,
    PageHeader,
    ScrollY,
    Title,
    TitleContainer,
} from '../../components';
import { ICommitteeGetByIdRes } from '../../interfaces/committee/committeeRes';
import { cadenceService, committeeService, committeeToMemberService, memberService } from '../../services';
import { ICommitteeToMemberGetByCommitteeIdRes } from '../../interfaces/committee/committeeToMemberRes';
import { ICadenceGetListRes } from '../../interfaces/cadence/cadenceRes';
import { ImgCrmHome, UserAvatar } from '../../assets/img';
import { intToRoman } from '../../utils';
import { IMemberGetListRes } from '../../interfaces/member/memberRes';

const pathMap = [
    { url: PATH_COMMITTEE.ROOT, title: pageNames.pages.committee },
    { url: PATH_COMMITTEE.DETAILS, title: pageNames.global.details },
];

export default function CommitteeDetailPage() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [committeeInfo, setCommitteeInfo] = useState<ICommitteeGetByIdRes | null>(null);
    const [memberToCommitteeList, setMemberToCommitteeList] = useState<ICommitteeToMemberGetByCommitteeIdRes[]>([]);
    const [cadenceList, setCadenceList] = useState<ICadenceGetListRes[]>([]);
    const [memberList, setMemberList] = useState<IMemberGetListRes[]>([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        if (!id) return;

        try {
            utilsActions.loading(true);

            const [committeeRes, memberToCommitteeRes, cadenceRes, memebrRes] = await Promise.all([
                committeeService.getById({ id }),
                committeeToMemberService.getByCommitteeId({ committeeId: id }),
                cadenceService.getList(),
                memberService.getList(),
            ]);

            setCommitteeInfo(committeeRes);
            setMemberToCommitteeList(memberToCommitteeRes);
            setCadenceList(cadenceRes);
            setMemberList(memebrRes);
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
            // utilsActions.loading(true);

            // await committeeService.deleteMany({ committeesId: [id] });

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

    const getCadence = (cadenceId: number) => {
        const cadence = cadenceList.find((item) => item.id === cadenceId);
        if (!cadence) return 0;
        return cadence.number;
    };

    const getMemberName = (memberId: number) => {
        const member = memberList.find((item) => item.id === memberId);
        if (!member) return '';
        return `${member.name} ${member.surname}`;
    };

    if (!id) <Navigate to={PATH_COMMITTEE.LIST} />;

    return (
        <ScrollY>
            <div className="p-4">
                {/*<BreadcrumbsContainer*/}
                {/*    path={pathMap}*/}
                {/*    buttons={[*/}
                {/*        { title: 'Edit', path: `${PATH_COMMITTEE.EDIT}/${id}` },*/}
                {/*        { title: 'List', path: PATH_COMMITTEE.LIST },*/}
                {/*    ]}*/}
                {/*/>*/}

                {committeeInfo && (
                    <>
                        <PageHeader
                            title={`${committeeInfo.name}`}
                            subtitle={`${committeeInfo.fullName} / ${committeeInfo.isActive ? 'Active' : 'Disable'}`}
                            img={UserAvatar}
                        />

                        {cadenceList.map((cadence) => (
                            <div key={cadence.id} className={style['cadenceBlock']}>
                                <TitleContainer position={'center'}>
                                    <Title
                                        title={`Cadence ${intToRoman(cadence.number)}`}
                                        color={cadence.number % 2 === 0 ? 'green' : 'blue'}
                                        size={'40'}
                                    />
                                </TitleContainer>

                                <CardContainer>
                                    {memberToCommitteeList
                                        .filter((memberToCommittee) => memberToCommittee.cadenceId === cadence.id)
                                        .map((memberToCommittee) => (
                                            <Card
                                                key={memberToCommittee.id}
                                                title={getMemberName(memberToCommittee.memberId)}
                                                subtitle={memberToCommittee.isLeader ? 'Coordinator' : 'Member'}
                                                img={ImgCrmHome}
                                            />
                                        ))}
                                </CardContainer>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </ScrollY>
    );
}
