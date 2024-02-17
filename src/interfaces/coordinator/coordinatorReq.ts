import { ICoordinatorPrisma } from '../prisma';

export interface ICoordinatorGetListReq {}
export interface ICoordinatorGetByIdReq extends Pick<ICoordinatorPrisma, 'id'> {}
export interface ICoordinatorCreateReq extends Omit<ICoordinatorPrisma, 'id' | 'createdAt' | 'updatedAt'> {}
export interface ICoordinatorUpdateReq extends Omit<ICoordinatorPrisma, 'createdAt' | 'updatedAt'> {}
export interface ICoordinatorDeleteReq extends Pick<ICoordinatorPrisma, 'id'> {}
export interface ICoordinatorDeleteArrayReq {
    id: number[];
}
