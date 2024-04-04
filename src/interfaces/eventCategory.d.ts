interface IEventCategoryCreate {
    type: string;
    name: string;
    status: string;
}

interface IEventCategories {
    id: number;
    type: EventTypesType | string;
    name: string;
    status: EventStatusType | string;
}

interface IEventCategoryPosition {
    id: number;
    name: string;
    role: string;
    status: boolean;
}

interface IEventCategoryAddNewPosition extends Omit<IEventCategoryPosition, 'id'> {}

interface IEventCategoryNewPosition extends Omit<IEventCategoryPosition, 'id'> {
    index: number;
}

interface IEventCategoryDetails {
    id: number;
    type: EventTypesType;
    name: string;
    status: EventStatusType;
    positions: IEventCategoryPosition[];
}

interface IEventCategoryEdit {
    id: number;
    type: EventTypesType;
    name: string;
    status: EventStatusType;
    positions: IEventCategoryPosition[];
    newPositions: IEventCategoryAddNewPosition[];
}
