import { IBoardPrisma } from '../prisma';

export interface IBoardGetListReq {}

export interface IBoardGetByIdReq {
    id: string;
}

export interface IBoardCreateReq extends Omit<IBoardPrisma, 'id' | 'createdAt' | 'updatedAt'> {}

export interface IBoardUpdateReq extends Omit<IBoardPrisma, 'createdAt' | 'updatedAt'> {}

export interface IBoardDeleteReq {
    id: string;
}

export interface IBoardDeleteArrayReq {
    id: number[];
}
