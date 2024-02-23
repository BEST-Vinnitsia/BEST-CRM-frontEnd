import { ICoordinatorPrisma } from '../prisma';

export interface ICoordinatorGetListRes extends Omit<ICoordinatorPrisma, 'createdAt' | 'updatedAt'> {}
export interface ICoordinatorGetByIdRes extends ICoordinatorPrisma {}
export interface ICoordinatorCreateRes extends Pick<ICoordinatorPrisma, 'id'> {}
export interface ICoordinatorUpdateRes extends Pick<ICoordinatorPrisma, 'id'> {}
export interface ICoordinatorDeleteRes extends Pick<ICoordinatorPrisma, 'id'> {}
export interface ICoordinatorDeleteArrayRes {
    count: number;
}
