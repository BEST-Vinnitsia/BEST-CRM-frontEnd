import React, { useState } from 'react';
import { BreadcrumbsContainer, Button, Text } from '../../components';
import { PATH_COMMITTEE } from '../../routes/paths';
import { pageNames } from '../../constants';
import { useNavigate } from 'react-router';

const pathMap = [
    { url: PATH_COMMITTEE.ROOT, title: pageNames.pages.committee },
    { url: PATH_COMMITTEE.DETAILS, title: pageNames.global.details },
];

export default function CommitteeDetailPage() {
    const navigate = useNavigate();

    return (
        <>
            <div className="p-4">
                <BreadcrumbsContainer path={pathMap}>
                    <div className="flex">
                        <Button onClick={() => navigate(`${PATH_COMMITTEE.EDIT}/id`)} title="Edit" />
                        <Button onClick={() => navigate(PATH_COMMITTEE.CREATE)} title="Create" />
                        <Button onClick={() => navigate(PATH_COMMITTEE.LIST)} title="List" />
                    </div>
                </BreadcrumbsContainer>
            </div>

            <div className="p-1 flex flex-row">
                <span className="px-2 py-1">
                    <Text text="Title" />
                </span>
                <span className="px-2 py-1">
                    <Text text="Title" fontFamily="mono" />
                </span>
                <span className="px-2 py-1 w-14">
                    <Text text="Title" horizon="center" />
                </span>
                <span className="px-2 py-1">
                    <Text text="Title" width="bold" />
                </span>
                <span className="px-2 py-1">
                    <Text text="Title" width="lite" />
                </span>
                <span className="px-2 py-1 w-14">
                    <Text text="Lorem ipsum" space="nowrap" />
                </span>
            </div>

            <div className="p-1 flex flex-row">
                <span className="px-2 py-1">
                    <Text text="Title" color="gray" />
                </span>

                <span className="px-2 py-1">
                    <Text text="Title" color="gray" fontFamily="mono" />
                </span>
            </div>

            <div className="p-1 flex flex-row">
                <span className="px-2 py-1">
                    <Text text="Title" type="span-sm" />
                </span>

                <span className="px-2 py-1">
                    <Text text="Title" type="span-sm" fontFamily="mono" />
                </span>

                <span className="px-2 py-1">
                    <Text text="Title" color="gray" type="span-sm" />
                </span>

                <span className="px-2 py-1">
                    <Text text="Title" color="gray" fontFamily="mono" type="span-sm" />
                </span>
            </div>

            <div className="p-1 flex flex-row">
                <span className="px-2 py-1">
                    <Text text="Title" type="h1" />
                </span>
                <span className="px-2 py-1">
                    <Text text="Title" type="h2" />
                </span>
                <span className="px-2 py-1">
                    <Text text="Title" type="h3" />
                </span>
                <span className="px-2 py-1">
                    <Text text="Title" type="h4" />
                </span>
                <span className="px-2 py-1">
                    <Text text="Title" type="h5" />
                </span>
                <span className="px-2 py-1">
                    <Text text="Title" type="h6" />
                </span>
            </div>

            <div className="p-1 flex flex-row">
                <span className="px-2 py-1">
                    <Text text="Title" type="h1" width="bold" />
                </span>
                <span className="px-2 py-1">
                    <Text text="Title" type="h2" width="bold" />
                </span>
                <span className="px-2 py-1">
                    <Text text="Title" type="h3" width="bold" />
                </span>
                <span className="px-2 py-1">
                    <Text text="Title" type="h4" width="bold" />
                </span>
                <span className="px-2 py-1">
                    <Text text="Title" type="h5" width="bold" />
                </span>
                <span className="px-2 py-1">
                    <Text text="Title" type="h6" width="bold" />
                </span>
            </div>
        </>
    );
}
