import { IEventPrisma } from '../prisma';

export interface IEventGetListRes extends Omit<IEventPrisma, 'createdAt' | 'updatedAt'> {}
export interface IEventGetByIdRes extends IEventPrisma {}
export interface IEventCreateRes extends Pick<IEventPrisma, 'id'> {}
export interface IEventUpdateRes extends Pick<IEventPrisma, 'id'> {}
export interface IEventDeleteRes extends Pick<IEventPrisma, 'id'> {}
export interface IEventDeleteArrayRes {
    count: number;
}
