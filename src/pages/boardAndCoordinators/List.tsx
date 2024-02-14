import React, { useEffect, useState } from 'react';
import { PATH_BaC } from '../../routes/paths';
import { BreadcrumbsContainer, Button, ScrollY, Text } from '../../components';
import { useNavigate } from 'react-router-dom';
import { pageNames } from '../../constants';
import { ICoordinator } from '../../interfaces/coordinator/coordinator';
import { boardService, coordinatorService } from '../../services';
import { utilsActions } from '../../redux/actions/utilsActions';
import { IBoard } from '../../interfaces/board/board';

const pathMap = [
    { url: PATH_BaC.ROOT, title: pageNames.pages.BaC },
    { url: PATH_BaC.LIST, title: pageNames.global.list },
];

export default function BoardAndCoordinatorsListPage() {
    const navigate = useNavigate();

    const [coordinatorList, setCoordinatorList] = useState<ICoordinator[]>([]);
    const [boardList, setBoardList] = useState<IBoard[]>([]);

    useEffect(() => {
        getInfo();
    }, []);

    const getInfo = async () => {
        try {
            const boardListPromise = boardService.getList();
            const coordinatorListPromise = coordinatorService.getList();

            utilsActions.loading(true);
            const [boardRes, coordinatorRes] = await Promise.all([boardListPromise, coordinatorListPromise]);
            utilsActions.loading(false);

            setBoardList(boardRes);
            setCoordinatorList(coordinatorRes);
        } catch (err) {
            utilsActions.loading(false);
            utilsActions.addMessage({
                status: 'error',
                message: 'Error loading data',
            });
        }
    };

    return (
        <ScrollY>
            <div className="p-4">
                <BreadcrumbsContainer path={pathMap}>
                    <div className="flex">
                        <Button onClick={() => navigate(PATH_BaC.CREATE)} title="Create" />
                    </div>
                </BreadcrumbsContainer>

                <div className="mb-5">
                    <Text text={'Board'} color={'gray'} />

                    {boardList.map((item) => (
                        <div key={item.id}>
                            <Text text={item.name} />
                        </div>
                    ))}
                </div>

                <div>
                    <Text text={'Coordinators'} color={'gray'} />

                    {coordinatorList.map((item) => (
                        <div key={item.id}>
                            <Text text={item.name} />
                        </div>
                    ))}
                </div>
            </div>
        </ScrollY>
    );
}
