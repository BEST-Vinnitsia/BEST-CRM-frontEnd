import { INewEventPrisma } from '../prisma';

export interface INewEventGetListReq {}
export interface INewEventGetByIdReq extends Pick<INewEventPrisma, 'id'> {}
export interface INewEventGetByEventIdReq extends Pick<INewEventPrisma, 'eventId'> {}
export interface INewEventGetByCadenceIdReq extends Pick<INewEventPrisma, 'cadenceId'> {}
export interface INewEventCreateReq extends Omit<INewEventPrisma, 'id' | 'createdAt' | 'updatedAt'> {}
export interface INewEventUpdateReq extends Omit<INewEventPrisma, 'createdAt' | 'updatedAt'> {}
export interface INewEventDeleteReq extends Pick<INewEventPrisma, 'id'> {}
export interface INewEventDeleteArrayReq {
    id: number[];
}
