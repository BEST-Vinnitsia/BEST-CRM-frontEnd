import { INewEventPrisma } from '../prisma';

export interface INewEventGetListRes extends Omit<INewEventPrisma, 'createdAt' | 'updatedAt'> {}

export interface INewEventGetByIdRes extends INewEventPrisma {}

export interface INewEventGetByEventIdRes extends INewEventPrisma {}

export interface INewEventGetByCadenceIdRes extends INewEventPrisma {}

export interface INewEventCreateRes extends Pick<INewEventPrisma, 'id'> {}

export interface INewEventUpdateRes extends Pick<INewEventPrisma, 'id'> {}

export interface INewEventDeleteRes extends Pick<INewEventPrisma, 'id'> {}

export interface INewEventDeleteArrayRes {
    count: number;
}
