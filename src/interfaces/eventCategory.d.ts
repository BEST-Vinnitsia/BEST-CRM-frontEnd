import { EventStatusType, EventTypesType } from './event';

export interface IEventCategories {
    id: number;
    type: EventTypesType;
    name: string;
    status: EventStatusType;
}

export interface IEventCategoryPosition {
    id: number;
    name: string;
    role: string;
    status: boolean
}

export interface IEventCategoryNewPosition extends Omit<IEventCategoryPosition, 'id'> {}

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
    newPositions: IEventCategoryNewPosition[];
}
