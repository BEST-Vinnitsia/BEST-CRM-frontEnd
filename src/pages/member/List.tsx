import React, { useEffect, useState } from 'react';
import {
    BreadcrumbsContainer,
    Button,
    Label,
    ScrollY,
    Table,
    TBody,
    TD,
    Text,
    TH,
    THead,
    TRBody,
    TRHead,
} from '../../components';
import { PATH_MEMBER } from '../../routes/paths';
import { pageNames } from '../../constants';
import { useNavigate } from 'react-router';
import { useCheckbox } from '../../hooks';
import Checkbox from '../../components/table/checkbox/Checkbox';
import { IMember } from '../../interfaces/member/member';
import { boardService, boardToMemberService, cadenceService, memberService } from '../../services';
import { formatDate, intToRoman } from '../../utils';
import { IBoard } from '../../interfaces/board/board';
import { IBoardToMember } from '../../interfaces/board/boardToMember';
import { ICadence } from '../../interfaces/cadence';
import { utilsActions } from '../../redux/actions/utilsActions';

const pathMap = [
    { url: PATH_MEMBER.ROOT, title: pageNames.pages.member },
    { url: PATH_MEMBER.LIST, title: pageNames.global.list },
];

export default function MemberListPage() {
    const navigate = useNavigate();

    const [memberList, setMemberList] = useState<IMember[]>([]);
    const [boardList, setBoardList] = useState<IBoard[]>([]);
    const [boardToMemberList, setBoardToMemberList] = useState<IBoardToMember[]>([]);
    const [cadenceList, setCadenceList] = useState<ICadence[]>([]);
    const [groupData, setGroupData] = useState<any>([]);

    const checkboxHook = useCheckbox(groupData.map((item: any) => item.id));
    
    useEffect(() => {
        getDataWithServer();
    }, []);

    useEffect(() => {
        if (boardList.length === 0) return;
        if (boardToMemberList.length === 0) return;
        if (cadenceList.length === 0) return;

        group();
    }, [boardList, boardToMemberList, cadenceList]);

    const getDataWithServer = async () => {
        try {
            const memberListPromise = memberService.getList();
            const cadenceListPromise = cadenceService.getList();
            const boardListPromise = boardService.getList();
            const memberToBoardListPromise = boardToMemberService.getList();

            utilsActions.loading(true);
            const [memberList, cadenceList, boardList, memberToBoardList] = await Promise.all([
                memberListPromise,
                cadenceListPromise,
                boardListPromise,
                memberToBoardListPromise,
            ]);
            utilsActions.loading(false);

            setMemberList(memberList);
            setCadenceList(cadenceList);
            setBoardList(boardList);
            setBoardToMemberList(memberToBoardList);
        } catch (err) {
            utilsActions.loading(false);
            utilsActions.addMessage({
                status: 'error',
                message: 'Error loading data',
            });
        }
    };

    const group = () => {
        const boardToMemberAndCadence = boardToMemberList.map((btm) => {
            const cadence = cadenceList.filter((c) => c.id === btm.cadenceId);
            const position = boardList.filter((b) => b.id === btm.boardId);

            return {
                memberId: btm.memberId,
                board: {
                    ...position[0],
                    cadence: cadence[0],
                },
            };
        });

        const newMemberList: any[] = [];
        const memberIdUnique = Array.from(new Set(boardToMemberAndCadence.map((item) => item.memberId)));

        for (const member of memberList) {
            if (memberIdUnique.includes(member.id)) {
                const filter = boardToMemberAndCadence.filter((item) => item.memberId === member.id);
                newMemberList.push({ ...member, board: filter.map((item) => item.board) });
                continue;
            }
            newMemberList.push(member);
        }
        setGroupData(newMemberList);
    };

    return (
        <>
            <ScrollY>
                <div className="p-4">
                    <BreadcrumbsContainer path={pathMap}>
                        <div className="flex">
                            <Button onClick={() => navigate(PATH_MEMBER.CREATE)} title="Create" />
                        </div>
                    </BreadcrumbsContainer>
                </div>

                <Table>
                    <THead>
                        <TRHead>
                            <TH type={'checkbox'}>
                                <Checkbox
                                    active={checkboxHook.checkSelectAll()}
                                    onClick={checkboxHook.selectAll}
                                    isHead
                                />
                            </TH>
                            <TH>
                                <Text text={'Name'} color={'gray'} width={'bold'} type={'span-sm'} />
                            </TH>
                            <TH>
                                <Text text={'Email'} color={'gray'} width={'bold'} type={'span-sm'} />
                            </TH>
                            <TH>
                                <Text text={'Phone'} color={'gray'} width={'bold'} type={'span-sm'} />
                            </TH>
                            <TH>
                                <Text text={'Message'} color={'gray'} width={'bold'} type={'span-sm'} />
                            </TH>
                            <TH>
                                <Text text={'VNTU'} color={'gray'} width={'bold'} type={'span-sm'} />
                            </TH>
                            <TH>
                                <Text text={'Status'} color={'gray'} width={'bold'} type={'span-sm'} />
                            </TH>
                            <TH>
                                <Text text={'Position'} color={'gray'} width={'bold'} type={'span-sm'} />
                            </TH>
                            <TH>
                                <Text text={'Committee'} color={'gray'} width={'bold'} type={'span-sm'} />
                            </TH>
                            <TH>
                                <Text text={'Happy Birthday'} color={'gray'} width={'bold'} type={'span-sm'} />
                            </TH>
                        </TRHead>
                    </THead>
                    <TBody>
                        {groupData.map((item: any, i: number) => (
                            <TRBody key={i}>
                                <TD sx={{ p: '0px 0px 0px 8px' }}>
                                    <Checkbox
                                        active={checkboxHook.checkSelectRow(item.id)}
                                        onClick={() => checkboxHook.selectRow(item.id)}
                                    />
                                </TD>

                                <TD>
                                    <div onClick={() => navigate(`${PATH_MEMBER.DETAILS}/${item.id}`)}>
                                        <Text text={`${item.name} ${item.surname}`} type={'span-sm'} />
                                        <Text
                                            text={item.bestEmail ? item.bestEmail : 'there is no BEST mail'}
                                            type={'span-sm'}
                                            color={'gray'}
                                        />
                                    </div>
                                </TD>
                                <TD>
                                    <Text text={item.email} type={'span-sm'} />
                                </TD>
                                <TD>
                                    <Text text={item.phone} type={'span-sm'} />
                                </TD>
                                <TD>
                                    <Text text={item.socialNetwork} type={'span-sm'} />
                                </TD>
                                <TD>
                                    <div>
                                        <Text text={item.faculty} type={'span-sm'} />
                                        <Text text={item.group} type={'span-sm'} color={'gray'} />
                                    </div>
                                </TD>
                                <TD>
                                    <Label title={item.membership} />
                                </TD>
                                <TD>
                                    {item.board &&
                                        item.board.map((item: any, i: number) => (
                                            <Label key={i} title={`${intToRoman(item.cadence.number)} ${item.name}`} />
                                        ))}
                                </TD>
                                <TD />
                                <TD>
                                    <Text text={formatDate(new Date(item.birthday))} type={'span-sm'} />
                                </TD>
                            </TRBody>
                        ))}
                    </TBody>
                </Table>
            </ScrollY>
        </>
    );
}
