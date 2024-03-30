import React, { createContext, useContext, useState } from 'react';
import {
    IEventCategories,
    IEventCategoryDetails,
    IEventCategoryEdit,
    IEventCategoryNewPosition,
    IEventCategoryPosition,
} from '../interfaces/eventCategory';

interface IProps {
    // list
    eventCategories: IEventCategories[];
    getEventCategories: () => void;

    // details
    eventCategoryDetails: IEventCategoryDetails | undefined;
    getEventCategoryDetails: (idStr: string) => void;

    // update
    eventCategoryEditData: IEventCategoryEdit | undefined;
    initEventCategoryEdit: (idStr: string) => void;
    editPosition: (data: IEventCategoryPosition | IEventCategoryNewPosition, index?: number) => void;
}

interface IEventCategoryProviderProps {
    children: React.ReactNode;
}

const EventCategoryContext = createContext<IProps>(null!);

export const EventCategoryProvider = (props: IEventCategoryProviderProps) => {
    const [eventCategories, setEventCategories] = useState<IEventCategories[]>([]); // categories list
    const [eventCategoriesDetails, setEventCategoriesDetails] = useState<IEventCategoryDetails[]>([]); // details about all categories
    const [eventCategoryDetails, setEventCategoryDetails] = useState<IEventCategoryDetails>(); // details about open category
    const [eventCategoryEditData, setEventCategoryEditData] = useState<IEventCategoryEdit>(); // edit category

    // list
    const getEventCategories = () => {
        if (eventCategories.length) return;
        setEventCategories([
            { id: 1, type: 'Local', name: 'Job Fair', status: 'Is relevant' },
            { id: 2, type: 'Local', name: 'BEST Courses', status: 'Is relevant' },
            { id: 3, type: 'Local', name: 'IT–Revolution', status: 'Is relevant' },
            { id: 4, type: 'External', name: 'EBEC', status: 'Is relevant' },
        ]);
    };

    // details
    const getEventCategoryDetails = (idStr: string) => {
        setEventCategoryDetails(undefined);

        if (!idStr) return;
        const id = parseInt(idStr);

        const findEventCategoryDetails = eventCategoriesDetails.find((item) => item.id === id);

        if (findEventCategoryDetails) {
            setEventCategoryDetails(findEventCategoryDetails);
            return;
        }

        if (!findEventCategoryDetails) {
            const data: IEventCategoryDetails = {
                id: id,
                type: 'Local',
                name: 'IT-Revolution',
                status: 'In active',
                positions: [
                    { id: 1, role: 'Responsible', name: 'Main Organizer', status: true },
                    { id: 2, role: 'Responsible', name: 'Human Responses', status: true },
                    { id: 4, role: 'Responsible', name: 'Fundraising', status: true },
                    { id: 5, role: 'Responsible', name: 'Designer', status: true },
                    { id: 6, role: 'Responsible', name: 'Public Resources', status: true },
                    { id: 3, role: 'WG', name: 'Human Responses', status: true },
                ],
            };

            setEventCategoriesDetails((prev) => [...prev, data]);
            setEventCategoryDetails(data);
        }
    };

    // edit
    const initEventCategoryEdit = (idStr: string) => {
        setEventCategoryEditData(undefined);

        if (!idStr) return;
        const id = parseInt(idStr);

        const findEventCategoryDetails = eventCategoriesDetails.find((item) => item.id === id);

        if (findEventCategoryDetails) {
            setEventCategoryDetails(findEventCategoryDetails);
            setEventCategoryEditData({ ...findEventCategoryDetails, newPositions: [] });
            return;
        }

        if (!findEventCategoryDetails) {
            const data: IEventCategoryDetails = {
                id: id,
                type: 'Local',
                name: 'IT-Revolution',
                status: 'In active',
                positions: [
                    { id: 1, role: 'Responsible', name: 'Main Organizer', status: true },
                    { id: 2, role: 'Responsible', name: 'Human Responses', status: true },
                    { id: 4, role: 'Responsible', name: 'Fundraising', status: true },
                    { id: 5, role: 'Responsible', name: 'Designer', status: true },
                    { id: 6, role: 'Responsible', name: 'Public Resources', status: true },
                    { id: 3, role: 'WG', name: 'Human Responses', status: true },
                ],
            };

            setEventCategoriesDetails((prev) => [...prev, data]);
            setEventCategoryDetails(data);
            setEventCategoryEditData({ ...data, newPositions: [] });
        }
    };
    const editPosition = (data: IEventCategoryPosition | IEventCategoryNewPosition, index?: number) => {
        if (!eventCategoryEditData) return;

        if ('id' in data) {
            setEventCategoryEditData({
                ...eventCategoryEditData,
                positions: eventCategoryEditData.positions.map((item) => {
                    if (item.id !== data.id) return item;
                    return data;
                }),
            });
        } else if (index !== undefined) {
            setEventCategoryEditData({
                ...eventCategoryEditData,
                newPositions: eventCategoryEditData.newPositions.map((item, i) => {
                    if (index !== i) return item;
                    return data;
                }),
            });
        } else {
            setEventCategoryEditData({
                ...eventCategoryEditData,
                newPositions: [...eventCategoryEditData.newPositions, data],
            });
        }
    };

    return (
        <EventCategoryContext.Provider
            value={{
                // list
                getEventCategories,
                eventCategories,
                // Details
                getEventCategoryDetails,
                eventCategoryDetails,
                // Edit
                initEventCategoryEdit,
                eventCategoryEditData,
                editPosition,
            }}
        >
            {props.children}
        </EventCategoryContext.Provider>
    );
};

export const useEventCategoryContext = () => useContext(EventCategoryContext);
