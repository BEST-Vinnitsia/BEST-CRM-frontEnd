import { IEventPrisma } from '../prisma';

export interface IEventGetListReq {}

export interface IEventGetByIdReq {
    id: string;
}

export interface IEventCreateReq extends Omit<IEventPrisma, 'id' | 'createdAt' | 'updatedAt'> {}

export interface IEventUpdateReq extends Omit<IEventPrisma, 'createdAt' | 'updatedAt'> {}

export interface IEventDeleteReq {
    id: string;
}

export interface IEventDeleteArrayReq {
    id: number[];
}
