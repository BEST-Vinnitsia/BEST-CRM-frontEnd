import { EventStatusType, EventTypesType } from './event';

export interface IEventCategoryCreate {
    type: string;
    name: string;
    status: string;
}

export interface IEventCategories {
    id: number;
    type: EventTypesType | string;
    name: string;
    status: EventStatusType | string;
}

export interface IEventCategoryPosition {
    id: number;
    name: string;
    role: string;
    status: boolean;
}

export interface IEventCategoryAddNewPosition extends Omit<IEventCategoryPosition, 'id'> {}

export interface IEventCategoryNewPosition extends Omit<IEventCategoryPosition, 'id'> {
    index: number;
}

export interface IEventCategoryDetails {
    id: number;
    type: EventTypesType;
    name: string;
    status: EventStatusType;
    positions: IEventCategoryPosition[];
}

export interface IEventCategoryEdit {
    id: number;
    type: EventTypesType;
    name: string;
    status: EventStatusType;
    positions: IEventCategoryPosition[];
    newPositions: IEventCategoryAddNewPosition[];
}
