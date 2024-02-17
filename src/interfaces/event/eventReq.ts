import { IEventPrisma } from '../prisma';

export interface IEventGetListReq {}
export interface IEventGetByIdReq extends Pick<IEventPrisma, 'id'> {}
export interface IEventCreateReq extends Omit<IEventPrisma, 'id' | 'createdAt' | 'updatedAt'> {}
export interface IEventUpdateReq extends Omit<IEventPrisma, 'createdAt' | 'updatedAt'> {}
export interface IEventDeleteReq extends Pick<IEventPrisma, 'id'> {}
export interface IEventDeleteArrayReq {
    id: number[];
}
