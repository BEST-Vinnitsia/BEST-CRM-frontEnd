import React, { useEffect, useState } from 'react';
import {
    BreadcrumbsContainer,
    Card,
    CardContainer,
    PageHeader,
    ScrollY,
    Title,
    TitleContainer,
} from '../../components';
import { PATH_BaC } from '../../routes/paths';
import { pageNames } from '../../constants';
import { useNavigate } from 'react-router';
import { Navigate, useParams } from 'react-router-dom';
import { utilsActions } from '../../redux/actions/utilsActions';
import {
    boardService,
    boardToMemberService,
    cadenceService,
    coordinatorService,
    coordinatorToMemberService,
    memberService,
} from '../../services';
import { IBoardGetByIdRes } from '../../interfaces/board/boardRes';
import { ICoordinatorGetByIdRes } from '../../interfaces/coordinator/coordinatorRes';
import { ImgCrmHome, UserAvatar } from '../../assets/img';
import { IBoardToMemberGetByBoardIdRes } from '../../interfaces/board/boardToMemberRes';
import { ICadenceGetListRes } from '../../interfaces/cadence/cadenceRes';
import { intToRoman } from '../../utils';
import { IMemberGetListRes } from '../../interfaces/member/memberRes';
import { ICoordinatorToMemberGetByCoordinatorIdRes } from '../../interfaces/coordinator/coordinatorToMemberRes';
// import { IBoardAllInfo } from '../../interfaces/board/boardAllInfo';
// import { ICoordinatorAllInfo } from '../../interfaces/coordinator/coordinatorAllInfo';

const pathMap = [
    { url: PATH_BaC.ROOT, title: pageNames.pages.BaC },
    { url: PATH_BaC.DETAILS, title: pageNames.global.details },
];

export default function BoardAndCoordinatorsDetailPage() {
    const navigate = useNavigate();
    const { id, who } = useParams();

    const [boardInfo, setBoardInfo] = useState<IBoardGetByIdRes | null>(null);
    const [boardToMemberList, setBoardToMemberList] = useState<IBoardToMemberGetByBoardIdRes[]>([]);
    const [coordinatorInfo, setCoordinatorInfo] = useState<ICoordinatorGetByIdRes | null>(null);
    const [coordinatorToMemberList, setCoordinatorToMemberList] = useState<ICoordinatorToMemberGetByCoordinatorIdRes[]>(
        [],
    );
    const [cadenceList, setCadenceList] = useState<ICadenceGetListRes[]>([]);
    const [memberList, setMemberList] = useState<IMemberGetListRes[]>([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        if (!id || !who) return;

        try {
            utilsActions.loading(true);
            if (who === 'board') {
                const [boardRes, boardToMemberRes, cadenceRes, memberRes] = await Promise.all([
                    await boardService.getById({ id }),
                    await boardToMemberService.getByBoardId({ boardId: id }),
                    await cadenceService.getList(),
                    await memberService.getList(),
                ]);

                setBoardInfo(boardRes);
                setBoardToMemberList(boardToMemberRes);
                setCadenceList(cadenceRes);
                setMemberList(memberRes);
            } else if (who === 'coordinator') {
                const [coordinatorRes, coordinatorToMemberRes, cadenceRes, memberRes] = await Promise.all([
                    await coordinatorService.getById({ id }),
                    await coordinatorToMemberService.getByCoordinatorId({ coordinatorId: id }),
                    await cadenceService.getList(),
                    await memberService.getList(),
                ]);

                setCoordinatorInfo(coordinatorRes);
                setCoordinatorToMemberList(coordinatorToMemberRes);
                setCadenceList(cadenceRes);
                setMemberList(memberRes);
            }
        } catch (err) {
            utilsActions.addMessage({
                status: 'error',
                message: 'Error loading data',
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

    if (!id || !who) <Navigate to={PATH_BaC.LIST} />;

    return (
        <>
            <ScrollY>
                <div className="p-4">
                    {/*<BreadcrumbsContainer*/}
                    {/*    path={pathMap}*/}
                    {/*    buttons={[*/}
                    {/*        { title: 'Edit', path: `${PATH_BaC.EDIT}/${who}/${id}` },*/}
                    {/*        { title: 'List', path: PATH_BaC.LIST },*/}
                    {/*    ]}*/}
                    {/*/>*/}

                    {boardInfo && (
                        <>
                            <PageHeader
                                title={`${boardInfo.name}`}
                                subtitle={`${boardInfo.fullName} / ${boardInfo.isActive ? 'Active' : 'Disable'}`}
                                img={UserAvatar}
                            />

                            <TitleContainer position={'center'}>
                                <Title title={'History'} color={'whiteGray'} size={'40'} />
                            </TitleContainer>

                            {boardToMemberList.length > 0 && (
                                <>
                                    <CardContainer>
                                        {boardToMemberList.map((item) => (
                                            <Card
                                                key={item.id}
                                                title={getMemberName(item.memberId)}
                                                subtitle={`Cadence ${intToRoman(getCadence(item.cadenceId))}`}
                                                img={ImgCrmHome}
                                            />
                                        ))}
                                    </CardContainer>
                                </>
                            )}
                        </>
                    )}

                    {/*    */}
                    {/*    */}
                    {/*    */}

                    {coordinatorInfo && (
                        <>
                            <PageHeader
                                title={`${coordinatorInfo.name}`}
                                subtitle={`${coordinatorInfo.fullName} / ${coordinatorInfo.isActive ? 'Active' : 'Disable'}`}
                                img={UserAvatar}
                            />

                            <TitleContainer position={'center'}>
                                <Title title={'History'} color={'whiteGray'} size={'40'} />
                            </TitleContainer>

                            {coordinatorToMemberList.length > 0 && (
                                <>
                                    <CardContainer>
                                        {coordinatorToMemberList.map((item) => (
                                            <Card
                                                key={item.id}
                                                title={getMemberName(item.memberId)}
                                                subtitle={`Cadence ${intToRoman(getCadence(item.cadenceId))}`}
                                                img={ImgCrmHome}
                                            />
                                        ))}
                                    </CardContainer>
                                </>
                            )}
                        </>
                    )}
                </div>
            </ScrollY>
        </>
    );
}
