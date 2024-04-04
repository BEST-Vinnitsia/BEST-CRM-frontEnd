import React, { createContext, useContext, useState } from 'react';
import { eventCategoryServices } from '../services/eventCategoryServices';
import {
    IEventCategories,
    IEventCategoryAddNewPosition,
    IEventCategoryCreate,
    IEventCategoryDetails,
    IEventCategoryEdit,
    IEventCategoryNewPosition,
    IEventCategoryPosition,
} from '../interfaces/eventCategory';

interface IEventCategoryInfo {
    type: string;
    name: string;
    status: string;
}

interface ICreateEventCategory {
    submit: (data: IEventCategoryCreate) => Promise<void>;
}

interface IGetEventCategory {
    list: () => Promise<void>;
    details: (idStr: string) => Promise<void>;
    updateList?: () => Promise<void>;
    updateDetails?: () => Promise<void>;
}

interface IEditEventCategory {
    init: (idStr: string) => Promise<void>;
    submit: (data: IEventCategoryInfo) => Promise<void>;
    discard: () => void;
    position: {
        updateOld: (data: IEventCategoryPosition) => void;
        deleteOld: (id: number) => void;
        addNew: (data: IEventCategoryAddNewPosition) => void;
        updateNew: (data: IEventCategoryNewPosition) => void;
        deleteNew: (index: number) => void;
    };
}

interface IDeleteEventCategory {
    submit: (idStr: string) => Promise<void>;
}

interface IProps {
    eventCategories: IEventCategories[];
    eventCategoryDetails: IEventCategoryDetails | undefined;
    eventCategoryEditData: IEventCategoryEdit | undefined;
    createEventCategory: ICreateEventCategory;
    getEventCategory: IGetEventCategory;
    editEventCategory: IEditEventCategory;
    deleteEventCategory: IDeleteEventCategory;
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

    const createEventCategory: ICreateEventCategory = {
        submit: async (data: IEventCategoryCreate) => {
            try {
                await eventCategoryServices.create(data);
                const getRes = await eventCategoryServices.getList();
                setEventCategories(getRes);
            } catch (err) {
                console.error(err);
            }
        },
    };

    const getEventCategory: IGetEventCategory = {
        list: async () => {
            try {
                if (eventCategories.length) return;

                const res = await eventCategoryServices.getList();
                setEventCategories(res);
            } catch (err) {
                console.error(err);
            }
        },
        details: async (idStr: string) => {
            setEventCategoryDetails(undefined);

            if (!idStr) return;
            const id = parseInt(idStr);
            const findEventCategoryDetails = eventCategoriesDetails.find((item) => item.id === id);

            if (findEventCategoryDetails) {
                setEventCategoryDetails(findEventCategoryDetails);
            } else {
                try {
                    const res = await eventCategoryServices.getById({ id });
                    setEventCategoriesDetails((prev) => [...prev, res]);
                    setEventCategoryDetails(res);
                } catch (err) {
                    console.error(err);
                }
            }
        },
        updateList: async () => {},
        updateDetails: async () => {},
    };

    const editEventCategory: IEditEventCategory = {
        init: async (idStr: string) => {
            setEventCategoryEditData(undefined);

            if (!idStr) return;
            const id = parseInt(idStr);
            const findEventCategoryDetails = eventCategoriesDetails.find((item) => item.id === id);

            if (findEventCategoryDetails) {
                setEventCategoryEditData({ ...findEventCategoryDetails, newPositions: [] });
            } else {
                const res = await eventCategoryServices.getById({ id });
                setEventCategoriesDetails((prev) => [...prev, res]);
                setEventCategoryEditData({ ...res, newPositions: [] });
            }
        },
        submit: async (data: IEventCategoryInfo) => {
            try {
                if (!eventCategoryEditData) return;

                const updateRes = await eventCategoryServices.update({ ...eventCategoryEditData, ...data });
                setEventCategoriesDetails((prev) => prev.filter((item) => item.id !== updateRes.id));

                const getRes = await eventCategoryServices.getById({ id: updateRes.id });
                setEventCategoriesDetails((prev) => [...prev, getRes]);
                setEventCategoryDetails(getRes);
            } catch (err) {
                console.error(err);
            }
        },
        discard: () => {
            setEventCategoryEditData(undefined);
        },
        position: {
            updateOld: (data: IEventCategoryPosition) => {
                if (!eventCategoryEditData) return;
                setEventCategoryEditData({
                    ...eventCategoryEditData,
                    positions: eventCategoryEditData.positions.map((item) => {
                        if (item.id !== data.id) return item;
                        return data;
                    }),
                });
            },
            deleteOld: (id: number) => {
                if (!eventCategoryEditData) return;
                setEventCategoryEditData({
                    ...eventCategoryEditData,
                    positions: eventCategoryEditData.positions.filter((item) => item.id !== id),
                });
            },
            addNew: (data: IEventCategoryAddNewPosition) => {
                if (!eventCategoryEditData) return;
                setEventCategoryEditData({
                    ...eventCategoryEditData,
                    newPositions: [...eventCategoryEditData.newPositions, data],
                });
            },
            updateNew: (data: IEventCategoryNewPosition) => {
                if (!eventCategoryEditData) return;
                setEventCategoryEditData({
                    ...eventCategoryEditData,
                    newPositions: eventCategoryEditData.newPositions.map((item, i) => {
                        if (data.index !== i) return item;
                        return data;
                    }),
                });
            },
            deleteNew: (index: number) => {
                if (!eventCategoryEditData) return;
                setEventCategoryEditData({
                    ...eventCategoryEditData,
                    newPositions: eventCategoryEditData.newPositions.filter((item, i) => i !== index),
                });
            },
        },
    };

    const deleteEventCategory: IDeleteEventCategory = {
        submit: async (idStr: string) => {
            try {
                if (!idStr) return;
                const id = parseInt(idStr);

                const deleteRes = await eventCategoryServices.delete({ id });
                setEventCategoriesDetails((prev) => prev.filter((item) => item.id !== deleteRes.id));
                const getRes = await eventCategoryServices.getList();
                setEventCategories(getRes);
                setEventCategoryDetails(undefined);
                setEventCategoryEditData(undefined);
            } catch (err) {
                console.error(err);
            }
        },
    };

    return (
        <EventCategoryContext.Provider
            value={{
                eventCategories,
                eventCategoryDetails,
                eventCategoryEditData,
                createEventCategory,
                getEventCategory,
                editEventCategory,
                deleteEventCategory,
            }}
        >
            {props.children}
        </EventCategoryContext.Provider>
    );
};

export const useEventCategoryContext = () => useContext(EventCategoryContext);
