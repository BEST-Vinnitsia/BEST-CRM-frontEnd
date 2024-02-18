import { INewEventPrisma } from '../prisma';

export interface INewEventGetListReq {}

export interface INewEventGetByIdReq {
    id: string;
}

export interface INewEventGetByEventIdReq {
    eventId: string;
}

export interface INewEventGetByCadenceIdReq {
    cadenceId: string;
}

export interface INewEventCreateReq extends Omit<INewEventPrisma, 'id' | 'createdAt' | 'updatedAt'> {}

export interface INewEventUpdateReq extends Omit<INewEventPrisma, 'createdAt' | 'updatedAt'> {}

export interface INewEventDeleteReq {
    id: string;
}

export interface INewEventDeleteArrayReq {
    id: number[];
}
