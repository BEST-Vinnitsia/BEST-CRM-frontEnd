import React, { useEffect, useState } from 'react';
import { PATH_COMMITTEE } from '../../routes/paths';
import { utilsActions } from '../../redux/actions/utilsActions';
import { pageNames } from '../../constants';
import { useNavigate } from 'react-router';
import { committeeService } from '../../services';
import { ICommitteeGetListRes } from '../../interfaces/committee/committeeRes';
import { ScrollY } from '../../ui';
// import { ICommittee } from '../../interfaces/committee/committee';

const pathMap = [
    { url: PATH_COMMITTEE.ROOT, title: pageNames.pages.committee },
    { url: PATH_COMMITTEE.LIST, title: pageNames.global.list },
];

export default function CommitteeListPage() {
    const navigate = useNavigate();

    const [committeeList, setCommitteeList] = useState<ICommitteeGetListRes[]>([]);

    useEffect(() => {
        getInfo();
    }, []);

    const getInfo = async () => {
        try {
            utilsActions.loading(true);

            const [committeeRes] = await Promise.all([committeeService.getList()]);
            setCommitteeList(committeeRes);
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
        <ScrollY>
            <div className="p-4">
                {/*<BreadcrumbsContainer path={pathMap} buttons={[{ title: 'Create', path: PATH_COMMITTEE.CREATE }]} />*/}

                {/*<TitleContainer position={'center'}>*/}
                {/*    <Title title={'Committees'} color={'whiteGray'} size={'32'} />*/}
                {/*</TitleContainer>*/}

                {/*<CardContainer>*/}
                {/*    {committeeList.map((item) => (*/}
                {/*        <SmallCard*/}
                {/*            key={item.id}*/}
                {/*            title={item.name}*/}
                {/*            // subtitle={item.isActive ? 'Active' : 'Disable'}*/}
                {/*            subtitle={item.fullName}*/}
                {/*            onClick={() => navigate(`${PATH_COMMITTEE.DETAILS}/${item.id}`)}*/}
                {/*            svg={<SvgCommitteeSidebar />}*/}
                {/*        />*/}
                {/*    ))}*/}
                {/*</CardContainer>*/}
            </div>
        </ScrollY>
    );
}
