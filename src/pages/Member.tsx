import React, { useEffect } from 'react';
import style from '../styles/style.module.scss';
import { TableRow, TableContainer, ScrollY, BreadcrumbsContainer, Button } from '../components';
import { SvgClose } from '../assets/svg';
import { PATH_MEMBERSHIP } from '../routes/paths';
import { utilsActions } from '../redux/actions/utilsActions';

const test = [
    [
        { title: 'asdasd' },
        { title: 'asdasd' },
        { title: 'asdasd' },
        { title: 'asdasd' },
        { title: 'asdasd' },
        { title: 'asdasd' },
        { title: 'asdasd' },
        { title: 'asdasd' },
        { title: 'asdasd' },
        { title: 'asdasd' },
    ],
];
export default function MemberPage() {
    const repeatedArray = Array.from({ length: 15 }, () => [...test[0]]);

    useEffect(() => {
        utilsActions.loading(true);
        setTimeout(() => {
            utilsActions.loading(false);
        }, 2000);
    }, []);

    return (
        <>
            <ScrollY>
                <div className="px-4 py-3">
                    <BreadcrumbsContainer
                        title=""
                        path={[
                            { url: PATH_MEMBERSHIP.ROOT, title: 'membership' },
                            { url: PATH_MEMBERSHIP.LIST, title: 'list' },
                        ]}
                    >
                        <Button svg={<SvgClose />} title="test" />
                    </BreadcrumbsContainer>
                </div>

                <TableContainer
                    head={[
                        { size: '50', title: '1' },
                        { size: '100', title: '2' },
                        { size: '150', title: '3' },
                        { size: '200', title: '4' },
                        { size: '100', title: '5' },
                        { size: '100', title: '6' },
                        { size: '100', title: '7' },
                        { size: '100', title: '8' },
                        { size: '100', title: '9' },
                        { size: '100', title: '10' },
                    ]}
                >
                    {repeatedArray.map((item, i) => (
                        <TableRow key={i} titleList={item} />
                    ))}
                </TableContainer>
            </ScrollY>
        </>
    );
}
