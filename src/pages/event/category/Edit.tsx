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
import { IEventCategoryNewPosition, IEventCategoryPosition } from '../../../interfaces/eventCategory';

export default function EventCategoryEditPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [openTab, setOpenTab] = useState<string>('Info');

    const [isOpenEditPopupPosition, setIsOpenEditPopupPosition] = useState(false);
    const [isOpenPopupPosition, setIsOpenPopupPosition] = useState(false);
    const [newPositionId, setNewPositionId] = useState<number | null>(null);
    const [newPositionIndex, setNewPositionIndex] = useState<number | null>(null);
    const [newPositionName, setNewPositionName] = useState('');
    const [newPositionStatus, setNewPositionStatus] = useState(true);

    const {
        initEventCategoryEdit, //
        eventCategoryEditData,
        editPosition,
    } = useEventCategoryContext();

    useEffect(() => {
        if (!id) return;
        initEventCategoryEdit(id);
    }, []);

    const openPopup = (data?: IEventCategoryPosition | IEventCategoryNewPosition, index?: number) => {
        if (!eventCategoryEditData) return;

        if (!data && !index) {
            setNewPositionId(null);
            setNewPositionIndex(null);

            setNewPositionName('');
            setNewPositionStatus(true);
            setIsOpenPopupPosition(true);
        }

        if (data && index !== undefined) {
            const newPosition = eventCategoryEditData.newPositions.find((item, i) => index === i);
            if (!newPosition) return;
            setNewPositionId(null);
            setNewPositionIndex(index);

            setNewPositionName(newPosition.name);
            setNewPositionStatus(newPosition.status);
            setIsOpenEditPopupPosition(true);
        }

        if (data !== undefined && !index && 'id' in data) {
            const position = eventCategoryEditData.positions.find((item) => item.id === data.id);
            if (!position) return;
            setNewPositionId(position.id);
            setNewPositionIndex(null);

            setNewPositionName(position.name);
            setNewPositionStatus(position.status);
            setIsOpenEditPopupPosition(true);
        }
    };

    const handlerUpdatePositionSubmit = () => {
        if (newPositionId !== null) {
            editPosition({
                id: newPositionId,
                name: newPositionName,
                role: openTab,
                status: newPositionStatus,
            });
        } else if (newPositionIndex !== null) {
            editPosition(
                {
                    name: newPositionName,
                    role: openTab,
                    status: newPositionStatus,
                },
                newPositionIndex,
            );
        } else {
            editPosition({
                name: newPositionName,
                role: openTab,
                status: newPositionStatus,
            });
        }

        setIsOpenEditPopupPosition(false);
        setIsOpenPopupPosition(false);
    };

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
                    <Button
                        title={'Discard'}
                        color={'red'}
                        onClick={() => navigate(`${PATH_EVENT.CATEGORY.EDIT}/${id}`)}
                    />
                    <Button
                        title={'Save'}
                        color={'green'}
                        onClick={() => navigate(`${PATH_EVENT.CATEGORY.EDIT}/${id}`)}
                    />
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
                                            onClick={() => openPopup(item)}
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
                                            onClick={() => openPopup(item, i)}
                                        />
                                    );
                                })}

                            <CardAdd onClick={() => openPopup()} />
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
                                            onClick={() => openPopup(item)}
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
                                            onClick={() => openPopup(item, i)}
                                        />
                                    );
                                })}

                            <CardAdd onClick={() => openPopup()} />
                        </CardContainer>
                    </>
                )}
            </ScrollY>

            <PopupForm
                title={`${isOpenPopupPosition ? 'Add new' : 'Edit'} ${openTab}`} //
                isOpen={isOpenPopupPosition || isOpenEditPopupPosition}
                onClose={() => {
                    setIsOpenPopupPosition(false);
                    setIsOpenEditPopupPosition(false);
                }}
                onSubmit={() => handlerUpdatePositionSubmit()}
                w={'500px'}
            >
                <PopupContent sx={{ mb: '8px' }} onOne>
                    <Input label={'Name'} value={newPositionName} setValue={setNewPositionName} />
                    <Switch label={'Is active'} value={newPositionStatus} onClick={setNewPositionStatus} />
                </PopupContent>
            </PopupForm>
        </>
    );
}
