import { IBoardPrisma } from '../prisma';

export interface IBoardGetListRes extends Omit<IBoardPrisma, 'createdAt' | 'updatedAt'> {}

export interface IBoardGetByIdRes extends IBoardPrisma {}

export interface IBoardCreateRes extends Pick<IBoardPrisma, 'id'> {}

export interface IBoardUpdateRes extends Pick<IBoardPrisma, 'id'> {}

export interface IBoardDeleteRes extends Pick<IBoardPrisma, 'id'> {}

export interface IBoardDeleteArrayRes {
    count: number;
}
