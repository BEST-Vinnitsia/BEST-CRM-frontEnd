import React, { useEffect } from 'react';
import style from '../styles/style.module.scss';
import { TableRow, TableContainer, ScrollY, BreadcrumbsContainer, Button } from '../components';
import { SvgClose } from '../assets/svg';
import { PATH_MEMBER, PATH_MEMBERSHIP } from '../routes/paths';
import { utilsActions } from '../redux/actions/utilsActions';
import Table from '../components/table v2/table';

export default function MemberPage() {
    useEffect(() => {
        utilsActions.loading(true);
        setTimeout(() => {
            utilsActions.loading(false);
        }, 2000);
    }, []);

    return (
        <>
            <ScrollY>
                <div className="p-2">
                    <BreadcrumbsContainer
                        title="Members"
                        path={[
                            { url: PATH_MEMBER.ROOT, title: 'member' },
                            { url: PATH_MEMBER.LIST, title: 'list' },
                        ]}
                    >
                        <Button title="Add member" />
                    </BreadcrumbsContainer>
                </div>

                <Table />
            </ScrollY>
        </>
    );
}
