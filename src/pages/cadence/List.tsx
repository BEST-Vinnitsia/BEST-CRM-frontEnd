import React, { useEffect, useState } from 'react';
import { PATH_CADENCE } from '../../routes/paths';
import { pageNames } from '../../constants';
import { useNavigate } from 'react-router';
import { BreadcrumbsContainer, CardContainer, ScrollY, SmallCard, TitleContainer } from '../../components';
import Title from '../../components/title/Title';
import { ICadenceGetListRes } from '../../interfaces/cadence/cadenceRes';
import { utilsActions } from '../../redux/actions/utilsActions';
import { cadenceService } from '../../services';
import { intToRoman } from '../../utils';
import { SvgMembershipSidebar } from '../../assets/svg';

const pathMap = [
    { url: PATH_CADENCE.ROOT, title: pageNames.pages.cadence },
    { url: PATH_CADENCE.LIST, title: pageNames.global.list },
];

export default function CadenceListPage() {
    const navigate = useNavigate();

    const [cadenceList, setCadenceList] = useState<ICadenceGetListRes[]>([]);

    useEffect(() => {
        getInfo();
    }, []);

    const getInfo = async () => {
        try {
            utilsActions.loading(true);

            const [cadenceListRes] = await Promise.all([cadenceService.getList()]);

            setCadenceList(cadenceListRes);
        } catch (err) {
            utilsActions.addMessage({
                status: 'error',
                message: 'Error loading data',
            });
        } finally {
            utilsActions.loading(false);
        }
    };

    const toDetails = (id: number) => {
        navigate(`${PATH_CADENCE.DETAILS}/${id}`);
    };

    return (
        <ScrollY>
            <div className="p-4">
                {/*<BreadcrumbsContainer path={pathMap} buttons={[{ title: 'Create', path: PATH_CADENCE.CREATE }]} />*/}

                <TitleContainer position={'center'}>
                    <Title title={'Cadence'} color={'whiteGray'} size={'32'} />
                </TitleContainer>

                <CardContainer>
                    {cadenceList.map((item) => (
                        <SmallCard
                            key={item.id}
                            title={`Cadence: ${intToRoman(item.number)}`}
                            subtitle={`Cadence is ${item.isEnd ? 'end' : 'active'}`}
                            onClick={() => toDetails(item.id)}
                            svg={<SvgMembershipSidebar />}
                        />
                    ))}
                </CardContainer>
            </div>
        </ScrollY>
    );
}
