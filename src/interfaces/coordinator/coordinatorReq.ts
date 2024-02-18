import { ICoordinatorPrisma } from '../prisma';

export interface ICoordinatorGetListReq {}

export interface ICoordinatorGetByIdReq {
    id: string;
}

export interface ICoordinatorCreateReq extends Omit<ICoordinatorPrisma, 'id' | 'createdAt' | 'updatedAt'> {}

export interface ICoordinatorUpdateReq extends Omit<ICoordinatorPrisma, 'createdAt' | 'updatedAt'> {}

export interface ICoordinatorDeleteReq {
    id: string;
}

export interface ICoordinatorDeleteArrayReq {
    id: number[];
}
