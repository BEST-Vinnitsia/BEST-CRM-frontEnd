import React from 'react';
import { PATH_BaC } from '../../routes/paths';
    import { BreadcrumbsContainer, Button, ScrollY } from '../../components';
import { useNavigate } from 'react-router-dom';
import { pageNames } from '../../constants';

const pathMap = [
    { url: PATH_BaC.ROOT, title: pageNames.pages.BaC },
    { url: PATH_BaC.LIST, title: pageNames.global.list },
];

export default function BoardAndCoordinatorsListPage() {
    const navigate = useNavigate();

    return (
        <ScrollY>
            <div className="p-4">
                <BreadcrumbsContainer path={pathMap}>
                    <div className="flex">
                        <Button onClick={() => navigate(`${PATH_BaC.EDIT}/id`)} title="Edit" />
                        <Button onClick={() => navigate(PATH_BaC.CREATE)} title="Create" />
                        <Button onClick={() => navigate(`${PATH_BaC.DETAILS}/id`)} title="Details" />
                    </div>
                </BreadcrumbsContainer>
            </div>
        </ScrollY>
    );
}
