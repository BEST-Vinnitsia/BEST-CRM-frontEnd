import React, { createContext, useContext, useState } from 'react';
import { eventCategoryServices } from '../services/eventCategoryServices';
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
    submitEventCategoryEdit: () => void;
    discardEventCategoryEdit: () => void;
    initEventCategoryEdit: (idStr: string) => void;
    editOldPosition: (date: IEventCategoryPosition) => void;
    deleteOldPosition: (id: number) => void;
    addNewPosition: (date: IEventCategoryNewPosition) => void;
    editNewPosition: (date: IEventCategoryNewPosition, index: number) => void;
    deleteNewPosition: (index: number) => void;

    // delete
    deleteEventCategory: (idStr: string) => void;
}

interface IEventCategoryProviderProps {
    children: React.ReactNode;
}

const EventCategoryContext = createContext<IProps>(null!);

export const EventCategoryProvider = (props: IEventCategoryProviderProps) => {
    // categories list
    const [eventCategories, setEventCategories] = useState<IEventCategories[]>([]);
    // details about all categories
    const [eventCategoriesDetails, setEventCategoriesDetails] = useState<IEventCategoryDetails[]>([]);
    // details about open category
    const [eventCategoryDetails, setEventCategoryDetails] = useState<IEventCategoryDetails | undefined>(undefined);
    // edit category
    const [eventCategoryEditData, setEventCategoryEditData] = useState<IEventCategoryEdit | undefined>(undefined);

    // list
    const getEventCategories = async () => {
        if (eventCategories.length) return;

        try {
            const res = await eventCategoryServices.getList();

            // TODO: it`s mock data
            // const res: IEventCategories[] = [
            //     { id: 1, type: 'local', name: 'Job Fair', status: 'is relevant' },
            //     { id: 2, type: 'local', name: 'BEST Courses', status: 'is relevant' },
            //     { id: 3, type: 'local', name: 'IT–Revolution', status: 'is relevant' },
            //     { id: 4, type: 'external', name: 'EBEC', status: 'is relevant' },
            // ];

            setEventCategories(res);
        } catch (err) {
            console.error(err);
        }
    };

    // details
    const getEventCategoryDetails = async (idStr: string) => {
        setEventCategoryDetails(undefined);

        if (!idStr) return;
        const id = parseInt(idStr);
        const findEventCategoryDetails = eventCategoriesDetails.find((item) => item.id === id);

        if (findEventCategoryDetails) {
            setEventCategoryDetails(findEventCategoryDetails);
        } else {
            try {
                const res = await eventCategoryServices.getById({ id });

                // TODO: it`s mock data
                // const res: IEventCategoryDetails = {
                //     id: id,
                //     type: 'local',
                //     name: 'IT-Revolution',
                //     status: 'in active',
                //     positions: [
                //         { id: 1, role: 'Responsible', name: 'Main Organizer', status: true },
                //         { id: 2, role: 'Responsible', name: 'Human Responses', status: true },
                //         { id: 4, role: 'Responsible', name: 'Fundraising', status: true },
                //         { id: 5, role: 'Responsible', name: 'Designer', status: true },
                //         { id: 6, role: 'Responsible', name: 'Public Resources', status: true },
                //         { id: 3, role: 'WG', name: 'Human Responses', status: true },
                //     ],
                // };

                setEventCategoriesDetails((prev) => [...prev, res]);
                setEventCategoryDetails(res);
            } catch (err) {
                console.error(err);
            }
        }
    };

    // edit
    const initEventCategoryEdit = async (idStr: string) => {
        setEventCategoryEditData(undefined);

        if (!idStr) return;
        const id = parseInt(idStr);
        const findEventCategoryDetails = eventCategoriesDetails.find((item) => item.id === id);

        if (findEventCategoryDetails) {
            setEventCategoryEditData({ ...findEventCategoryDetails, newPositions: [] });
        } else {
            const res = await eventCategoryServices.getById({ id });

            // TODO: it`s mock data
            // const res: IEventCategoryDetails = {
            //     id: id,
            //     type: 'local',
            //     name: 'IT-Revolution',
            //     status: 'in active',
            //     positions: [
            //         { id: 1, role: 'Responsible', name: 'Main Organizer', status: true },
            //         { id: 2, role: 'Responsible', name: 'Human Responses', status: true },
            //         { id: 4, role: 'Responsible', name: 'Fundraising', status: true },
            //         { id: 5, role: 'Responsible', name: 'Designer', status: true },
            //         { id: 6, role: 'Responsible', name: 'Public Resources', status: true },
            //         { id: 3, role: 'WG', name: 'Human Responses', status: true },
            //     ],
            // };

            setEventCategoriesDetails((prev) => [...prev, res]);
            setEventCategoryEditData({ ...res, newPositions: [] });
        }
    };

    const submitEventCategoryEdit = async () => {
        if (!eventCategoryEditData) return;

        try {
            const res = await eventCategoryServices.update(eventCategoryEditData);
            // TODO: must update state details and list
            console.log(res);
        } catch (err) {
            console.error(err);
        }
    };

    const discardEventCategoryEdit = () => {
        setEventCategoryEditData(undefined);
    };

    const editOldPosition = (data: IEventCategoryPosition) => {
        if (!eventCategoryEditData) return;
        setEventCategoryEditData({
            ...eventCategoryEditData,
            positions: eventCategoryEditData.positions.map((item) => {
                if (item.id !== data.id) return item;
                return data;
            }),
        });
    };
    const deleteOldPosition = (id: number) => {
        if (!eventCategoryEditData) return;
        setEventCategoryEditData({
            ...eventCategoryEditData,
            positions: eventCategoryEditData.positions.filter((item) => item.id !== id),
        });
    };
    const addNewPosition = (data: IEventCategoryNewPosition) => {
        if (!eventCategoryEditData) return;
        setEventCategoryEditData({
            ...eventCategoryEditData,
            newPositions: [...eventCategoryEditData.newPositions, data],
        });
    };
    const editNewPosition = (data: IEventCategoryNewPosition, index: number) => {
        if (!eventCategoryEditData) return;
        setEventCategoryEditData({
            ...eventCategoryEditData,
            newPositions: eventCategoryEditData.newPositions.map((item, i) => {
                if (index !== i) return item;
                return data;
            }),
        });
    };
    const deleteNewPosition = (index: number) => {
        if (!eventCategoryEditData) return;
        setEventCategoryEditData({
            ...eventCategoryEditData,
            newPositions: eventCategoryEditData.newPositions.filter((item, i) => i !== index),
        });
    };

    // delete
    const deleteEventCategory = async (idStr: string) => {
        if (!idStr) return;
        const id = parseInt(idStr);

        try {
            const res = await eventCategoryServices.delete({ id });
            // TODO: must update state details and list
            console.log(res);
        } catch (err) {
            console.error(err);
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
                submitEventCategoryEdit,
                deleteEventCategory,
                discardEventCategoryEdit,
                eventCategoryEditData,
                editOldPosition,
                deleteOldPosition,
                addNewPosition,
                editNewPosition,
                deleteNewPosition,
            }}
        >
            {props.children}
        </EventCategoryContext.Provider>
    );
};

export const useEventCategoryContext = () => useContext(EventCategoryContext);
