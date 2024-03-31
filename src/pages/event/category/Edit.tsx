import React, { useEffect, useState } from 'react';
import { PATH_EVENT } from '../../../routes/paths';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Breadcrumbs,
    Button,
    CardAdd,
    CardContainer,
    CardMember,
    Input,
    PopupContent,
    ScrollY,
    Switch,
    Tab,
} from '../../../ui';
import { useEventCategoryContext } from '../../../contexts/EventCategoryContext';
import { SvgInfo, SvgResponsible, SvgWg } from '../../../assets/svg';
import PopupForm from '../../../components/popup/form/PopupForm';
import { getSvg } from '../../../utils/getSvg';

export default function EventCategoryEditPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [openTab, setOpenTab] = useState<string>('Info');

    const [isOpenPopupEditPosition, setIsOpenPopupEditPosition] = useState(false);
    const [isOpenPopupNewPosition, setIsOpenPopupNewPosition] = useState(false);

    const [positionId, setPositionId] = useState<number | null>(null);
    const [positionIndex, setPositionIndex] = useState<number | null>(null);

    const [positionName, setPositionName] = useState('');
    const [positionStatus, setPositionStatus] = useState(true);

    const {
        initEventCategoryEdit,
        eventCategoryEditData,
        editOldPosition,
        deleteOldPosition,
        addNewPosition,
        editNewPosition,
        deleteNewPosition,
        submitEventCategoryEdit,
        discardEventCategoryEdit,
    } = useEventCategoryContext();

    useEffect(() => {
        if (!id) return;
        initEventCategoryEdit(id);
    }, []);

    const handlerOpenAddNewPosition = () => {
        setPositionId(null);
        setPositionIndex(null);

        setPositionName('');
        setPositionStatus(true);

        setIsOpenPopupEditPosition(false);
        setIsOpenPopupNewPosition(true);
    };
    const handlerOpenEditNewPosition = (index: number) => {
        if (!eventCategoryEditData) return;
        const findPosition = eventCategoryEditData.newPositions.find((item, i) => i === index);
        if (!findPosition) return;

        setPositionId(null);
        setPositionIndex(index);

        setPositionName(findPosition.name);
        setPositionStatus(findPosition.status);

        setIsOpenPopupEditPosition(true);
        setIsOpenPopupNewPosition(false);
    };
    const handlerOpenEditOldPosition = (id: number) => {
        if (!eventCategoryEditData) return;
        const findPosition = eventCategoryEditData.positions.find((item) => item.id === id);
        if (!findPosition) return;

        setPositionId(id);
        setPositionIndex(null);

        setPositionName(findPosition.name);
        setPositionStatus(findPosition.status);

        setIsOpenPopupEditPosition(true);
        setIsOpenPopupNewPosition(false);
    };

    const handlerPopupSave = () => {
        if (!eventCategoryEditData) return;

        if (isOpenPopupEditPosition) {
            if (positionId !== null) {
                editOldPosition({
                    id: positionId,
                    name: positionName,
                    role: openTab,
                    status: positionStatus,
                });
            } else if (positionIndex !== null) {
                editNewPosition(
                    {
                        name: positionName,
                        role: openTab,
                        status: positionStatus,
                    },
                    positionIndex,
                );
            }
        } else if (isOpenPopupNewPosition) {
            addNewPosition({
                name: positionName,
                role: openTab,
                status: positionStatus,
            });
        }

        handlerClosePopup();
    };
    const handlerPopupDelete = () => {
        if (positionId !== null) {
            deleteOldPosition(positionId);
        } else if (positionIndex !== null) {
            deleteNewPosition(positionIndex);
        }

        handlerClosePopup();
    };
    const handlerClosePopup = () => {
        setIsOpenPopupNewPosition(false);
        setIsOpenPopupEditPosition(false);
    };

    const handlerDiscard = () => {
        if (!id) return;
        discardEventCategoryEdit();
        navigate(`${PATH_EVENT.CATEGORY.DETAILS}/${id}`);
    };

    const handlerSubmit = () => {
        submitEventCategoryEdit();
    };
    const handlerDelete = () => {};

    const breadcrumbsPath = () => {
        if (!id || !eventCategoryEditData) {
            return [
                { url: PATH_EVENT.CATEGORY.LIST, title: 'Event categories' },
                { url: PATH_EVENT.CATEGORY.CREATE, title: 'New category' },
            ];
        }

        return [
            { url: PATH_EVENT.CATEGORY.LIST, title: 'Event categories' },
            { url: `${PATH_EVENT.CATEGORY.DETAILS}/${id}`, title: eventCategoryEditData.name },
            { url: `${PATH_EVENT.CATEGORY.EDIT}/${id}`, title: 'Edit' },
        ];
    };

    const tabs = [
        { title: 'Info', svg: <SvgInfo /> },
        { title: 'Responsible', svg: <SvgResponsible /> },
        { title: 'WG', svg: <SvgWg /> },
    ];

    return (
        <>
            <ScrollY>
                <Breadcrumbs column={true} path={breadcrumbsPath()}>
                    <Button title={'Discard'} color={'red'} onClick={handlerDiscard} />
                    <Button title={'Save'} color={'green'} onClick={handlerSubmit} />
                </Breadcrumbs>

                <Tab onClick={setOpenTab} value={openTab} tabs={tabs} />

                {openTab === 'Info' && <div>Info</div>}

                {openTab === 'Responsible' && (
                    <>
                        <CardContainer p={'0 16px'}>
                            {eventCategoryEditData &&
                                eventCategoryEditData.positions.map((item, i) => {
                                    if (item.role !== 'Responsible') return null;
                                    return (
                                        <CardMember
                                            key={item.id}
                                            title={item.name}
                                            svg={getSvg(item.name)}
                                            onClick={() => handlerOpenEditOldPosition(item.id)}
                                        />
                                    );
                                })}

                            {eventCategoryEditData &&
                                eventCategoryEditData.newPositions.map((item, i) => {
                                    if (item.role !== 'Responsible') return null;
                                    return (
                                        <CardMember
                                            key={i}
                                            title={item.name}
                                            svg={getSvg(item.name)}
                                            onClick={() => handlerOpenEditNewPosition(i)}
                                        />
                                    );
                                })}

                            <CardAdd onClick={handlerOpenAddNewPosition} />
                        </CardContainer>
                    </>
                )}

                {openTab === 'WG' && (
                    <>
                        <CardContainer p={'0 16px'}>
                            {eventCategoryEditData &&
                                eventCategoryEditData.positions.map((item, i) => {
                                    if (item.role !== 'WG') return null;
                                    return (
                                        <CardMember
                                            key={item.id}
                                            title={item.name}
                                            svg={getSvg(item.name)}
                                            onClick={() => handlerOpenEditOldPosition(item.id)}
                                        />
                                    );
                                })}

                            {eventCategoryEditData &&
                                eventCategoryEditData.newPositions.map((item, i) => {
                                    if (item.role !== 'WG') return null;
                                    return (
                                        <CardMember
                                            key={i}
                                            title={item.name}
                                            svg={getSvg(item.name)}
                                            onClick={() => handlerOpenEditNewPosition(i)}
                                        />
                                    );
                                })}

                            <CardAdd onClick={handlerOpenAddNewPosition} />
                        </CardContainer>
                    </>
                )}
            </ScrollY>

            <PopupForm
                title={`${isOpenPopupNewPosition ? 'Add new' : 'Edit'} ${openTab}`} //
                isOpen={isOpenPopupNewPosition || isOpenPopupEditPosition}
                onClose={handlerClosePopup}
                onSubmit={handlerPopupSave}
                onDelete={isOpenPopupEditPosition ? handlerPopupDelete : undefined}
                w={'500px'}
            >
                <PopupContent sx={{ mb: '8px' }} onOne>
                    <Input label={'Name'} value={positionName} setValue={setPositionName} />
                    <Switch label={'Is active'} value={positionStatus} onClick={setPositionStatus} />
                </PopupContent>
            </PopupForm>
        </>
    );
}
