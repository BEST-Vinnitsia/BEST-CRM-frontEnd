import React, { useEffect, useState } from 'react';
import { PATH_EVENT } from '../../../routes/paths';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import {
    Breadcrumbs,
    Button,
    CardAdd,
    CardContainer,
    CardMember,
    Input,
    PopupContent,
    ScrollY,
    Select,
    Switch,
    Tab,
} from '../../../ui';
import { useEventCategoryContext } from '../../../contexts/EventCategoryContext';
import PopupForm from '../../../components/popup/form/PopupForm';
import { getSvg } from '../../../utils/getSvg';
import { PopupMessage } from '../../../components';
import { eventStatus, eventTabs, eventTypes } from '../../../constants/event';

interface IPositionForm {
    id: number | null;
    index: number | null;
    name: string;
    status: boolean;
}

interface IFormsPopups {
    editPosition: boolean;
    newPosition: boolean;
}

interface IMessagesPopups {
    discard: boolean;
    delete: boolean;
}

interface IFormInfo {
    type: string;
    name: string;
    status: string;
}

const breadcrumbsPath = (id: string, eventCategoryName?: string) => {
    return [
        { url: PATH_EVENT.CATEGORY.LIST, title: 'Event categories' },
        { url: `${PATH_EVENT.CATEGORY.DETAILS}/${id}`, title: eventCategoryName || 'Event' },
        { url: `${PATH_EVENT.CATEGORY.EDIT}/${id}`, title: 'Edit' },
    ];
};

export default function EventCategoryEditPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [openTab, setOpenTab] = useState<string>('Info');
    const [messagePopup, setMessagePopup] = useState<IMessagesPopups>({ discard: false, delete: false });
    const [formsPopups, setFormsPopups] = useState<IFormsPopups>({ editPosition: false, newPosition: false });
    const [formInfo, setFormInfo] = useState<IFormInfo | null>(null);
    const [positionForm, setPositionForm] = useState<IPositionForm | null>(null);

    const {
        eventCategoryEditData, //
        editEventCategory,
        deleteEventCategory,
    } = useEventCategoryContext();

    useEffect(() => {
        setMessagePopup({ discard: false, delete: false });
        setFormsPopups({ editPosition: false, newPosition: false });

        if (!id) return;

        editEventCategory.init(id);
    }, []);

    useEffect(() => {
        if (!id || !eventCategoryEditData) return;

        setFormInfo({
            type: eventCategoryEditData.type,
            name: eventCategoryEditData.name,
            status: eventCategoryEditData.status,
        });
    }, [eventCategoryEditData]);

    const handlerOpenAddNewPosition = () => {
        setPositionForm({ id: null, index: null, name: '', status: true });
        setFormsPopups({ editPosition: false, newPosition: true });
    };

    const handlerOpenEditNewPosition = (index: number) => {
        if (!eventCategoryEditData) return;
        const findPosition = eventCategoryEditData.newPositions.find((item, i) => i === index);
        if (!findPosition) return;

        setPositionForm({ id: null, index, name: findPosition.name, status: findPosition.status });
        setFormsPopups({ editPosition: true, newPosition: false });
    };

    const handlerOpenEditOldPosition = (id: number) => {
        if (!eventCategoryEditData) return;
        const findPosition = eventCategoryEditData.positions.find((item) => item.id === id);
        if (!findPosition) return;

        setPositionForm({ id, index: null, name: findPosition.name, status: findPosition.status });
        setFormsPopups({ editPosition: true, newPosition: false });
    };

    const handlerPopupSave = () => {
        if (!eventCategoryEditData) return;

        if (formsPopups.editPosition) {
            if (!positionForm) return;

            if (positionForm.id) {
                const { id, status, name } = positionForm;
                editEventCategory.position.updateOld({ id, status, name, role: openTab });
            } else if (positionForm.index) {
                const { index, status, name } = positionForm;
                editEventCategory.position.updateNew({ index, name, status, role: openTab });
            }
        } else if (formsPopups.newPosition) {
            if (!positionForm) return;

            const { status, name } = positionForm;
            editEventCategory.position.addNew({ name, status, role: openTab });
        }

        setFormsPopups({ editPosition: false, newPosition: false });
    };

    const handlerPopupDelete = () => {
        if (!positionForm) return;

        if (positionForm.id) {
            editEventCategory.position.deleteOld(positionForm.id);
        } else if (positionForm.index) {
            editEventCategory.position.deleteNew(positionForm.index);
        }

        setFormsPopups({ editPosition: false, newPosition: false });
    };
    const handlerClosePopup = () => setFormsPopups({ editPosition: false, newPosition: false });

    const handlerOpenDiscard = () => setMessagePopup({ delete: false, discard: true });
    const handlerOpenDelete = () => setMessagePopup({ delete: true, discard: false });
    const handlerCloseMessagePopup = () => setMessagePopup({ delete: false, discard: false });
    const handlerDiscard = () => {
        if (!id || !eventCategoryEditData) return;

        editEventCategory.discard();

        const paths = breadcrumbsPath(id, eventCategoryEditData.name);
        navigate(paths[1].url);
    };

    const handlerChangeInfo = (value: unknown, name: string) => {
        if (!formInfo) return;
        setFormInfo({ ...formInfo, [name]: value });
    };

    const handlerChangePosition = (value: unknown, name: string) => {
        setPositionForm((prev) => (!prev ? null : { ...prev, [name]: value }));
    };

    const handlerSubmit = async () => {
        try {
            if (!id || !eventCategoryEditData || !formInfo) return;

            await editEventCategory.submit(formInfo);

            const paths = breadcrumbsPath(id, eventCategoryEditData.name);
            navigate(paths[1].url);
        } catch (err) {
            console.error(err);
        }
    };
    const handlerDelete = async () => {
        try {
            if (!id) return;

            await deleteEventCategory.submit(id);

            navigate(breadcrumbsPath(id, eventCategoryEditData?.name)[0].url);
        } catch (err) {
            console.error(err);
        }
    };

    if (!id) return <Navigate to={PATH_EVENT.CATEGORY.LIST} />;

    return (
        <>
            <ScrollY>
                <Breadcrumbs column={true} path={breadcrumbsPath(id, eventCategoryEditData?.name)}>
                    <Button title={'Discard'} color={'red'} onClick={handlerOpenDiscard} />
                    <Button title={'Save'} color={'green'} onClick={handlerSubmit} />
                </Breadcrumbs>

                <Tab onClick={setOpenTab} value={openTab} tabs={eventTabs} />

                {openTab === 'Info' && (
                    <div className={'w-[400px] absolute top-[50%] left-0 right-0 mx-auto'}>
                        {formInfo && (
                            <>
                                <Select
                                    label={'Type'}
                                    value={formInfo.type}
                                    setValue={(value: string) => handlerChangeInfo(value, 'type')}
                                    arr={eventTypes}
                                />

                                <Input
                                    label={'Name'}
                                    value={formInfo.name}
                                    setValue={(value: string) => handlerChangeInfo(value, 'name')}
                                />
                                <Select
                                    label={'Status'}
                                    value={formInfo.status}
                                    setValue={(value: string) => handlerChangeInfo(value, 'status')}
                                    arr={eventStatus}
                                />
                                <Button title={'Delete category'} color={'red'} onClick={handlerOpenDelete} />
                            </>
                        )}
                    </div>
                )}

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
                title={`${formsPopups.newPosition ? 'Add new' : 'Edit'} ${openTab}`} //
                isOpen={formsPopups.editPosition || formsPopups.newPosition}
                onClose={handlerClosePopup}
                onSubmit={handlerPopupSave}
                onDelete={formsPopups.editPosition ? handlerPopupDelete : undefined}
                w={'500px'}
            >
                {positionForm && (
                    <PopupContent sx={{ mb: '8px' }} onOne>
                        <Input
                            label={'Name'}
                            value={positionForm.name}
                            setValue={(value) => handlerChangePosition(value, 'name')}
                        />
                        <Switch
                            label={'Is active'}
                            value={positionForm.status}
                            onClick={(value) => handlerChangePosition(value, 'status')}
                        />
                    </PopupContent>
                )}
            </PopupForm>

            <PopupMessage
                title={'Discard changes'}
                type={'error'}
                text={['You want discard changes?']}
                onSubmit={handlerDiscard}
                submitButtonName={'Discard'}
                isOpen={messagePopup.discard}
                onClose={handlerCloseMessagePopup}
            />

            <PopupMessage
                title={'Delete category'}
                type={'error'}
                text={[`You want delete ${eventCategoryEditData?.name || 'this event'}?`]}
                onSubmit={handlerDelete}
                submitButtonName={'Delete'}
                isOpen={messagePopup.delete}
                onClose={handlerCloseMessagePopup}
            />
        </>
    );
}
