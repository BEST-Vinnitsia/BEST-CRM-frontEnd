import { ICadencePrisma } from '../prisma';

export interface ICadenceGetListReq {}

export interface ICadenceGetByIdReq extends Pick<ICadencePrisma, 'id'> {}

export interface ICadenceCreateReq extends Omit<ICadencePrisma, 'id' | 'createdAt' | 'updatedAt'> {}

export interface ICadenceUpdateReq extends Omit<ICadencePrisma, 'createdAt' | 'updatedAt'> {}

export interface ICadenceDeleteReq extends Pick<ICadencePrisma, 'id'> {}

export interface ICadenceDeleteArrayReq {
    id: number[];
}
