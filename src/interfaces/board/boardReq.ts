import { IBoardPrisma } from '../prisma';

export interface IBoardGetListReq {}

export interface IBoardGetByIdReq extends Pick<IBoardPrisma, 'id'> {}

export interface IBoardCreateReq extends Omit<IBoardPrisma, 'id' | 'createdAt' | 'updatedAt'> {}

export interface IBoardUpdateReq extends Omit<IBoardPrisma, 'createdAt' | 'updatedAt'> {}

export interface IBoardDeleteReq extends Pick<IBoardPrisma, 'id'> {}

export interface IBoardDeleteArrayReq {
    id: number[];
}
