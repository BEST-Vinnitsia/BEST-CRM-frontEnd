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
import { memberService } from '../../services';
import { formatDate, intToRoman } from '../../utils';
import { utilsActions } from '../../redux/actions/utilsActions';
import { IMemberListAllInfo } from '../../interfaces/member/memberBigData';

const pathMap = [
    { url: PATH_MEMBER.ROOT, title: pageNames.pages.member },
    { url: PATH_MEMBER.LIST, title: pageNames.global.list },
];

export default function MemberListPage() {
    const navigate = useNavigate();

    const [memberList, setMemberList] = useState<IMemberListAllInfo[]>([]);

    const checkboxHook = useCheckbox(memberList.map((item: any) => item.id));

    useEffect(() => {
        getMemberListAllInfo();
    }, []);

    const getMemberListAllInfo = async () => {
        try {
            const memberListPromise = memberService.getListAllInfo();

            utilsActions.loading(true);
            const [memberList] = await Promise.all([memberListPromise]);
            utilsActions.loading(false);

            setMemberList(memberList);
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
                                <Text text={'Board'} color={'gray'} width={'bold'} type={'span-sm'} />
                            </TH>
                            <TH>
                                <Text text={'Coordinator'} color={'gray'} width={'bold'} type={'span-sm'} />
                            </TH>
                            <TH>
                                <Text text={'Event'} color={'gray'} width={'bold'} type={'span-sm'} />
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
                        {memberList.map((item, i) => (
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
                                    {item.boardToMember &&
                                        item.boardToMember.map((btm, i) => (
                                            <Label
                                                key={btm.id}
                                                title={`${intToRoman(btm.cadence.number)} ${btm.board.name}`}
                                            />
                                        ))}
                                </TD>
                                <TD>
                                    {item.coordinatorToMember &&
                                        item.coordinatorToMember.map((ctm, i) => (
                                            <Label
                                                key={ctm.id}
                                                title={`${intToRoman(ctm.cadence.number)} ${ctm.coordinator.name}`}
                                            />
                                        ))}
                                </TD>
                                <TD>
                                    {item.memberToEvent &&
                                        item.memberToEvent.map((etm, i) => (
                                            <Label
                                                key={etm.id}
                                                title={`${intToRoman(etm.newEvent.cadence.number)} ${etm.newEvent.event.name} ${etm.responsible.name} ${etm.responsible.role}`}
                                            />
                                        ))}
                                </TD>
                                <TD>
                                    {item.committeeToMember &&
                                        item.committeeToMember.map((ctm, i) => (
                                            <Label
                                                key={ctm.id}
                                                title={`${intToRoman(ctm.cadence.number)} ${ctm.committee.name}`}
                                            />
                                        ))}
                                </TD>
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
