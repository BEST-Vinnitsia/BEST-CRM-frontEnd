import { ICadencePrisma } from '../prisma';

export interface ICadenceGetListRes extends Omit<ICadencePrisma, 'createdAt' | 'updatedAt'> {}

export interface ICadenceGetByIdRes extends ICadencePrisma {}

export interface ICadenceCreateRes extends Pick<ICadencePrisma, 'id'> {}

export interface ICadenceUpdateRes extends Pick<ICadencePrisma, 'id'> {}

export interface ICadenceDeleteRes extends Pick<ICadencePrisma, 'id'> {}

export interface ICadenceDeleteArrayRes {
    count: number;
}
