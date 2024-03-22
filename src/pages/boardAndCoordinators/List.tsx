import React, { useEffect, useState } from 'react';
import { PATH_BaC } from '../../routes/paths';
import { useNavigate } from 'react-router-dom';
import { pageNames } from '../../constants';
// import { ICoordinator } from '../../interfaces/coordinator/coordinator';
import { boardService, coordinatorService } from '../../services';
import { utilsActions } from '../../redux/actions/utilsActions';
import { IBoardGetListRes } from '../../interfaces/board/boardRes';
import { ICoordinatorGetListRes } from '../../interfaces/coordinator/coordinatorRes';
import { ScrollY } from '../../ui';

const pathMap = [
    { url: PATH_BaC.ROOT, title: pageNames.pages.BaC },
    { url: PATH_BaC.LIST, title: pageNames.global.list },
];

export default function BoardAndCoordinatorsListPage() {
    const navigate = useNavigate();

    const [boardList, setBoardList] = useState<IBoardGetListRes[]>([]);
    const [coordinatorList, setCoordinatorList] = useState<ICoordinatorGetListRes[]>([]);

    useEffect(() => {
        getInfo();
    }, []);

    const getInfo = async () => {
        try {
            utilsActions.loading(true);

            const boardListPromise = boardService.getList();
            const coordinatorListPromise = coordinatorService.getList();

            const [boardRes, coordinatorRes] = await Promise.all([boardListPromise, coordinatorListPromise]);

            setBoardList(boardRes);
            setCoordinatorList(coordinatorRes);
        } catch (err) {
            utilsActions.addMessage({
                status: 'error',
                message: 'Error loading data',
            });
        } finally {
            utilsActions.loading(false);
        }
    };

    const toDetails = (id: number, who: 'board' | 'coordinator') => {
        navigate(`${PATH_BaC.DETAILS}/${who}/${id}`);
    };

    return (
        <ScrollY>
            <div className="p-4">
                {/*<BreadcrumbsContainer path={pathMap} buttons={[{ title: 'Create', path: PATH_BaC.CREATE }]} />*/}

                {/*<TitleContainer position={'center'}>*/}
                {/*    <Title title={'Board'} color={'whiteGray'} size={'32'} />*/}
                {/*</TitleContainer>*/}

                {/*<CardContainer>*/}
                {/*    {boardList.map((item) => (*/}
                {/*        <SmallCard*/}
                {/*            key={item.id}*/}
                {/*            title={item.name}*/}
                {/*            // subtitle={item.isActive ? 'Active' : 'Disable'}*/}
                {/*            subtitle={item.fullName}*/}
                {/*            onClick={() => toDetails(item.id, 'board')}*/}
                {/*            svg={<SvgBoardAndCoordinatorsSidebar />}*/}
                {/*        />*/}
                {/*    ))}*/}
                {/*</CardContainer>*/}

                {/*  */}

                <div className={'h-8'} />

                {/*<TitleContainer position={'center'}>*/}
                {/*    <Title title={'Coordinators'} color={'whiteGray'} size={'32'} />*/}
                {/*</TitleContainer>*/}

                {/*<CardContainer>*/}
                {/*    {coordinatorList.map((item) => (*/}
                {/*        <SmallCard*/}
                {/*            key={item.id}*/}
                {/*            title={item.name}*/}
                {/*            // subtitle={item.isActive ? 'Active' : 'Disable'}*/}
                {/*            subtitle={item.fullName}*/}
                {/*            onClick={() => toDetails(item.id, 'coordinator')}*/}
                {/*            svg={<SvgBoardAndCoordinatorsSidebar />}*/}
                {/*        />*/}
                {/*    ))}*/}
                {/*</CardContainer>*/}
            </div>
        </ScrollY>
    );
}
