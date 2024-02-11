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
import { memberService } from '../../services';
import { formatDate } from '../../utils';

const pathMap = [
    { url: PATH_MEMBER.ROOT, title: pageNames.pages.member },
    { url: PATH_MEMBER.LIST, title: pageNames.global.list },
];

export default function MemberListPage() {
    const navigate = useNavigate();

    const [memberList, setMemberList] = useState<IMember[]>([]);
    const checkboxHook = useCheckbox(memberList.map((item) => item.id));

    // useEffect(() => {
    //     utilsActions.loading(true);
    //     setTimeout(() => {
    //         utilsActions.loading(false);
    //     }, 2000);
    // }, []);

    useEffect(() => {
        getMemberList();
    }, []);

    const getMemberList = async () => {
        const res = await memberService.getList();
        if (!res) return;
        setMemberList(res);
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
                                        <Text text={item.login} type={'span-sm'} color={'gray'} />
                                    </div>
                                </TD>
                                <TD>{/*<Text text={item.phone} type={'span-sm'} />*/}</TD>
                                <TD>{/*<Text text={item.message} type={'span-sm'} />*/}</TD>
                                <TD>
                                    <div>
                                        <Text text={item.faculty} type={'span-sm'} />
                                        <Text text={item.group} type={'span-sm'} color={'gray'} />
                                    </div>
                                </TD>
                                <TD>
                                    <Label title={item.membership} />
                                </TD>
                                <TD />
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
