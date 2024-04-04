import React, { useEffect, useState } from 'react';
import { PATH_EVENT } from '../../../routes/paths';
import { useNavigate } from 'react-router';
import {
    Breadcrumbs,
    Button,
    CardContainer,
    CardEvent,
    Input,
    PopupContent,
    ScrollY,
    Select,
    Title,
} from '../../../ui';
import { useEventCategoryContext } from '../../../contexts/EventCategoryContext';
import { ImgJFLogo } from '../../../assets/img';
import PopupForm from '../../../components/popup/form/PopupForm';
import { eventKinds, eventStatus, eventTypes } from '../../../constants/event';

const breadcrumbsPath = [
    { url: PATH_EVENT.CATEGORY.ROOT, title: 'Event categories' }, //
];

export default function EventCategoryListPage() {
    const navigate = useNavigate();

    const [isOpenCreatePopup, setIsOpenCreatePopup] = useState(false);
    const [newEventCategoryType, setNewEventCategoryType] = useState('');
    const [newEventCategoryName, setNewEventCategoryName] = useState('');
    const [newEventCategoryStatus, setNewEventCategoryStatus] = useState('');

    const {
        eventCategories, //
        getEventCategory,
        createEventCategory,
    } = useEventCategoryContext();

    useEffect(() => {
        getEventCategory.list();
    }, []);

    const dropStates = () => {
        setIsOpenCreatePopup(false);
        setNewEventCategoryType('');
        setNewEventCategoryName('');
        setNewEventCategoryStatus('');
    };

    const handlerClickAddEventCategory = () => {
        setIsOpenCreatePopup(true);
    };

    const handlerSubmitAddEventCategory = async () => {
        try {
            await createEventCategory.submit({
                name: newEventCategoryName,
                status: newEventCategoryStatus,
                type: newEventCategoryType,
            });

            dropStates();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <ScrollY>
                <Breadcrumbs column={true} path={breadcrumbsPath}>
                    <Button title={'Add'} onClick={handlerClickAddEventCategory} />
                </Breadcrumbs>

                {eventKinds.map((event, i) => (
                    <React.Fragment key={i}>
                        <Title title={event} color={'whiteGray'} p={'0 16px'} />
                        <CardContainer p={'0 16px'}>
                            {eventCategories
                                .filter((item) => item.type.toLowerCase() === event.toLowerCase())
                                .map((item) => (
                                    <CardEvent
                                        key={item.id}
                                        title={item.name}
                                        subtitle={item.status}
                                        imgUrl={ImgJFLogo}
                                        onClick={() => navigate(`${PATH_EVENT.CATEGORY.DETAILS}/${item.id}`)}
                                    />
                                ))}
                        </CardContainer>
                    </React.Fragment>
                ))}
            </ScrollY>

            <PopupForm
                title={'Add new'}
                isOpen={isOpenCreatePopup}
                onClose={() => setIsOpenCreatePopup(false)}
                onSubmit={handlerSubmitAddEventCategory}
                w={'500px'}
            >
                <PopupContent sx={{ mb: '8px' }} onOne>
                    <Select
                        label={'Type'}
                        value={newEventCategoryType}
                        setValue={setNewEventCategoryType}
                        arr={eventTypes}
                    />
                    <Input label={'Name'} value={newEventCategoryName} setValue={setNewEventCategoryName} />
                    <Select
                        label={'Status'}
                        value={newEventCategoryStatus}
                        setValue={setNewEventCategoryStatus}
                        arr={eventStatus}
                    />
                </PopupContent>
            </PopupForm>
        </>
    );
}
