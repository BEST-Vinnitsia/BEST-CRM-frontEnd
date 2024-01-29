import React, { useState } from 'react';
import {
    BreadcrumbsContainer,
    Button,
    CircleButton,
    LongButton,
    PopupContainer,
    PopupWrapper,
    ScrollY,
    SelectButton,
} from '../../components';
import { PATH_BaC } from '../../routes/paths';
import { pageNames } from '../../constants';
import { useNavigate } from 'react-router';
import { SvgArrowLeft, SvgArrowRight, SvgLogo } from '../../assets/svg';

const pathMap = [
    { url: PATH_BaC.ROOT, title: pageNames.pages.BaC },
    { url: PATH_BaC.DETAILS, title: pageNames.global.details },
];

export default function BoardAndCoordinatorsDetailPage() {
    const navigate = useNavigate();

    return (
        <>
            <ScrollY>
                <div className="p-4">
                    <BreadcrumbsContainer path={pathMap}>
                        <div className="flex">
                            <Button onClick={() => navigate(`${PATH_BaC.EDIT}/id`)} title="Edit" />
                            <Button onClick={() => navigate(PATH_BaC.CREATE)} title="Create" />
                            <Button onClick={() => navigate(PATH_BaC.LIST)} title="List" />
                        </div>
                    </BreadcrumbsContainer>
                </div>

                <div className="p-1 flex flex-row">
                    <span className="px-2 py-1">
                        <Button title="Test" size="small" />
                    </span>
                    <span className="px-2 py-1">
                        <Button title="Test" svg={<SvgArrowLeft />} svgPosition="left" size="small" />
                    </span>
                    <span className="px-2 py-1">
                        <Button title="Test" svg={<SvgArrowRight />} size="small" />
                    </span>
                </div>

                <div className="p-1 flex flex-row">
                    <span className="px-2 py-1">
                        <Button title="Test" size="medium" />
                    </span>
                    <span className="px-2 py-1">
                        <Button title="Test" svg={<SvgArrowLeft />} svgPosition="left" size="medium" />
                    </span>
                    <span className="px-2 py-1">
                        <Button title="Test" svg={<SvgArrowRight />} size="medium" />
                    </span>
                </div>

                <div className="p-1 flex flex-row">
                    <span className="px-2 py-1">
                        <Button title="Test" size="large" />
                    </span>
                    <span className="px-2 py-1">
                        <Button title="Test" svg={<SvgArrowLeft />} svgPosition="left" size="large" />
                    </span>
                    <span className="px-2 py-1">
                        <Button title="Test" svg={<SvgArrowRight />} size="large" />
                    </span>
                </div>

                <div className="p-1 flex flex-row">
                    <span className="px-2 py-1">
                        <CircleButton size="small" svg={<SvgLogo />} />
                    </span>
                    <span className="px-2 py-1">
                        <CircleButton size="medium" svg={<SvgLogo />} />
                    </span>
                    <span className="px-2 py-1">
                        <CircleButton size="large" svg={<SvgLogo />} />
                    </span>
                </div>

                <div className="p-1 flex flex-row">
                    <span className="py-1 px-2 w-60">
                        <LongButton title="Long button" size="small" />
                    </span>
                    <span className="py-1 px-2 w-60">
                        <LongButton title="Long button" />
                    </span>
                    <span className="py-1 px-2 w-60">
                        <LongButton title="Long button" size="large" />
                    </span>
                </div>

                <div className="p-1 flex flex-row">
                    <span className="py-1 px-2 w-60">
                        <LongButton title="Long button" size="small" color="dark" />
                    </span>
                    <span className="py-1 px-2 w-60">
                        <LongButton title="Long button" color="dark" />
                    </span>
                    <span className="py-1 px-2 w-60">
                        <LongButton title="Long button" size="large" color="dark" />
                    </span>
                </div>

                <div className="p-1 flex flex-row">
                    <span className="py-1 px-2 w-60">
                        <LongButton title="Long button" disable />
                    </span>
                    <span className="py-1 px-2 w-60">
                        <LongButton title="Long button" color="dark" disable />
                    </span>
                </div>

                <div className="p-1 flex flex-row">
                    <span className="py-1 px-2 w-60">
                        <LongButton title="Long button" loading />
                    </span>
                    <span className="py-1 px-2 w-60">
                        <LongButton title="Long button" color="dark" loading />
                    </span>
                </div>

                <div className="p-1 flex flex-row">
                    <span className="py-1 px-2 w-60">
                        <LongButton title="Long button" loading disable />
                    </span>
                    <span className="py-1 px-2 w-60">
                        <LongButton title="Long button" color="dark" loading disable />
                    </span>
                </div>

                <div className="p-1 flex flex-row">
                    <span className="py-1 px-2 w-60">
                        <SelectButton title="Long button" />
                    </span>

                    <span className="py-1 px-2 w-60">
                        <SelectButton title="Long button" svg={<SvgLogo />} />
                    </span>

                    <span className="py-1 px-2 w-60">
                        <SelectButton title="Long button" svg={<SvgLogo />} svgPosition="right" />
                    </span>
                </div>

                <div className="p-1 flex flex-row">
                    <span className="py-1 px-2 w-60">
                        <SelectButton title="Long button" active />
                    </span>

                    <span className="py-1 px-2 w-60">
                        <SelectButton title="Long button" svg={<SvgLogo />} active />
                    </span>

                    <span className="py-1 px-2 w-60">
                        <SelectButton title="Long button" svg={<SvgLogo />} svgPosition="right" active />
                    </span>
                </div>

                <div className="p-1 flex flex-row">
                    <span className="py-1 px-2 w-60">
                        <SelectButton title="Long button" color="red" />
                    </span>

                    <span className="py-1 px-2 w-60">
                        <SelectButton title="Long button" svg={<SvgLogo />} color="red" />
                    </span>

                    <span className="py-1 px-2 w-60">
                        <SelectButton title="Long button" svg={<SvgLogo />} svgPosition="right" color="red" />
                    </span>
                </div>
            </ScrollY>
        </>
    );
}
