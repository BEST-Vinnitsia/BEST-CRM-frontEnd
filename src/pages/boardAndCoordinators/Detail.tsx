import React, { useEffect, useState } from 'react';
import { BreadcrumbsContainer, Button, ScrollY } from '../../components';
import { PATH_BaC } from '../../routes/paths';
import { pageNames } from '../../constants';
import { useNavigate } from 'react-router';
import { Navigate, useParams } from 'react-router-dom';
import { boardService, coordinatorService } from '../../services';
import { IBoard } from '../../interfaces/board/board';
import { ICoordinator } from '../../interfaces/coordinator/coordinator';
import { utilsActions } from '../../redux/actions/utilsActions';

const pathMap = [
    { url: PATH_BaC.ROOT, title: pageNames.pages.BaC },
    { url: PATH_BaC.DETAILS, title: pageNames.global.details },
];

export default function BoardAndCoordinatorsDetailPage() {
    const navigate = useNavigate();
    const { id, who } = useParams();

    const [BaC, setBaC] = useState<IBoard | ICoordinator | null>(null);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        if (!id || !who) return;

        try {
            utilsActions.loading(true);

            if (who === 'board') {
                const res = await boardService.getById({ id });
                setBaC(res);
            } else if (who === 'coordinator') {
                const res = await coordinatorService.getById({ id });
                setBaC(res);
            }
        } catch (err) {
            utilsActions.addMessage({
                status: 'error',
                message: 'Error loading data',
            });
        } finally {
            utilsActions.loading(false);
        }
    };

    const deletePosition = async () => {
        if (!id || !who) return;

        try {
            utilsActions.loading(true);

            if (who === 'board') {
                await boardService.deleteMany({ boardsId: [id] });

                navigate(PATH_BaC.LIST);

                utilsActions.addMessage({
                    status: 'success',
                    message: 'Board is deleted',
                });
            } else if (who === 'coordinator') {
                await coordinatorService.deleteMany({ coordinatorsId: [id] });

                navigate(PATH_BaC.LIST);

                utilsActions.addMessage({
                    status: 'success',
                    message: 'Coordinator is deleted',
                });
            }
        } catch (err) {
            utilsActions.addMessage({
                status: 'error',
                message: 'Error delete position',
            });
        } finally {
            utilsActions.loading(false);
        }
    };

    if (!id || !who) <Navigate to={PATH_BaC.LIST} />;

    return (
        <>
            <ScrollY>
                <div className="p-4">
                    <BreadcrumbsContainer path={pathMap}>
                        <div className="flex">
                            <Button onClick={deletePosition} title="delete" />
                            <Button onClick={() => navigate(`${PATH_BaC.EDIT}/${who}/${id}`)} title="Edit" />
                            <Button onClick={() => navigate(PATH_BaC.LIST)} title="List" />
                        </div>
                    </BreadcrumbsContainer>

                    <div>
                        {BaC && (
                            <div>
                                <span className={'block'}>{BaC.name}</span>
                                <span className={'block'}>{`Is active: ${BaC.isActive}`}</span>
                            </div>
                        )}
                    </div>
                </div>
            </ScrollY>
        </>
    );
}
