import React, { useEffect } from 'react';
import {
    BreadcrumbsContainer,
    Button, Label,
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
import { utilsActions } from '../../redux/actions/utilsActions';
import { pageNames } from '../../constants';
import { useNavigate } from 'react-router';
import { useCheckbox } from '../../hooks/useCheckbox';
import Checkbox from '../../components/table/checkbox/Checkbox';

const tableData = [
    {
        id: 'asd',
        name: 'Name',
        surname: 'Surname',
        email: 'email@gmail.com',
        phone: '+380971234567',
        faculty: 'ФМІБ',
        group: 'УБ-21б',
        message: '@telegram',
        status: 'Observer',
        hb: '01.01.2001',
    },
    {
        id: 'asdsd',
        name: 'Name',
        surname: 'Surname',
        email: 'email 2@gmail.com',
        phone: '+380971234567',
        faculty: 'ФМІБ',
        group: 'УБ-21б',
        message: '@telegram',
        status: 'Observer',
        hb: '01.01.2001',
    },
];

const pathMap = [
    { url: PATH_MEMBER.ROOT, title: pageNames.pages.member },
    { url: PATH_MEMBER.LIST, title: pageNames.global.list },
];

export default function MemberListPage() {
    const navigate = useNavigate();
    const checkboxHook = useCheckbox(tableData.map((item) => item.id));

    // useEffect(() => {
    //     utilsActions.loading(true);
    //     setTimeout(() => {
    //         utilsActions.loading(false);
    //     }, 2000);
    // }, []);

    return (
        <>
            <ScrollY>
                <div className="p-4">
                    <BreadcrumbsContainer path={pathMap}>
                        <div className="flex">
                            <Button onClick={() => navigate(`${PATH_MEMBER.EDIT}/id`)} title="Edit" />
                            <Button onClick={() => navigate(PATH_MEMBER.CREATE)} title="Create" />
                            <Button onClick={() => navigate(`${PATH_MEMBER.DETAILS}/id`)} title="Details" />
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
                        {tableData.map((item, i) => (
                            <TRBody key={i}>
                                <TD sx={{ p: '0px 0px 0px 8px' }}>
                                    <Checkbox
                                        active={checkboxHook.checkSelectRow(item.id)}
                                        onClick={() => checkboxHook.selectRow(item.id)}
                                    />
                                </TD>

                                <TD>
                                    <div>
                                        <Text text={`${item.name} ${item.surname}`} type={'span-sm'} />
                                        <Text text={item.email} type={'span-sm'} color={'gray'} />
                                    </div>
                                </TD>
                                <TD>
                                    <Text text={item.phone} type={'span-sm'} />
                                </TD>
                                <TD>
                                    <Text text={item.message} type={'span-sm'} />
                                </TD>
                                <TD>
                                    <div>
                                        <Text text={item.faculty} type={'span-sm'} />
                                        <Text text={item.group} type={'span-sm'} color={'gray'} />
                                    </div>
                                </TD>
                                <TD>
                                    <Label title={item.status} />
                                </TD>
                                <TD />
                                <TD />
                                <TD>
                                    <Text text={item.hb} type={'span-sm'} />
                                </TD>
                            </TRBody>
                        ))}
                    </TBody>
                </Table>
            </ScrollY>
        </>
    );
}
