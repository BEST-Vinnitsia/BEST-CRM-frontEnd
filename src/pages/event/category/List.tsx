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

export default function EventCategoryListPage() {
    const navigate = useNavigate();
    const [isOpenCreatePopup, setIsOpenCreatePopup] = useState(false);
    const [newEventCategoryType, setNewEventCategoryType] = useState('');
    const [newEventCategoryName, setNewEventCategoryName] = useState('');
    const [newEventCategoryStatus, setNewEventCategoryStatus] = useState('');

    const {
        eventCategories, //
        getEventCategories,
    } = useEventCategoryContext();

    useEffect(() => {
        getEventCategories();
    }, []);

    const handlerClickAddEventCategory = () => {
        setIsOpenCreatePopup(true);
    };

    const breadcrumbsPath = [
        { url: PATH_EVENT.CATEGORY.ROOT, title: 'Event categories' }, //
    ];

    return (
        <>
            <ScrollY>
                <Breadcrumbs column={true} path={breadcrumbsPath}>
                    <Button title={'Add'} onClick={handlerClickAddEventCategory} />
                </Breadcrumbs>

                <Title title={'Local'} color={'whiteGray'} p={'0 16px'} />
                <CardContainer p={'0 16px'}>
                    {eventCategories.map((item) => {
                        if (item.type !== 'Local') return null;

                        return (
                            <CardEvent
                                key={item.id} //
                                title={item.name}
                                subtitle={item.status}
                                imgUrl={ImgJFLogo}
                                onClick={() => navigate(`${PATH_EVENT.CATEGORY.DETAILS}/${item.id}`)}
                            />
                        );
                    })}
                </CardContainer>

                <Title title={'External'} color={'whiteGray'} p={'0 16px'} />
                <CardContainer p={'0 16px'}>
                    {eventCategories.map((item) => {
                        if (item.type !== 'External') return null;

                        return (
                            <CardEvent
                                key={item.id} //
                                title={item.name}
                                subtitle={item.status}
                                imgUrl={ImgJFLogo}
                                onClick={() => navigate(`${PATH_EVENT.CATEGORY.DETAILS}/${item.id}`)}
                            />
                        );
                    })}
                </CardContainer>

                <Title title={'Internal'} color={'whiteGray'} p={'0 16px'} />
                <CardContainer p={'0 16px'}>
                    {eventCategories.map((item) => {
                        if (item.type !== 'Internal') return null;

                        return (
                            <CardEvent
                                key={item.id} //
                                title={item.name}
                                subtitle={item.status}
                                imgUrl={ImgJFLogo}
                                onClick={() => navigate(`${PATH_EVENT.CATEGORY.DETAILS}/${item.id}`)}
                            />
                        );
                    })}
                </CardContainer>
            </ScrollY>

            <PopupForm
                title={'Add new'} //
                isOpen={isOpenCreatePopup}
                onClose={() => setIsOpenCreatePopup(false)}
                w={'500px'}
            >
                <PopupContent sx={{ mb: '8px' }} onOne>
                    <Input label={'Type'} value={newEventCategoryType} setValue={setNewEventCategoryType} />
                    <Input label={'Name'} value={newEventCategoryName} setValue={setNewEventCategoryName} />
                    <Select
                        label={'Status'}
                        value={newEventCategoryStatus}
                        setValue={setNewEventCategoryStatus}
                        arr={[
                            { value: 'Active', title: 'Active' },
                            { value: 'In active', title: 'In active' },
                            { value: 'Completed', title: 'Completed' },
                            { value: 'in progress', title: 'in progress' },
                            { value: 'Is relevant', title: 'Is relevant' },
                        ]}
                    />
                </PopupContent>
            </PopupForm>
        </>
    );
}
