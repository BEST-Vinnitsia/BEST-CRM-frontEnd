import { ICadencePrisma } from '../prisma';

export interface ICadenceGetListReq {}

export interface ICadenceGetByIdReq {
    id: string;
}

export interface ICadenceCreateReq extends Omit<ICadencePrisma, 'id' | 'createdAt' | 'updatedAt'> {}

export interface ICadenceUpdateReq extends Omit<ICadencePrisma, 'createdAt' | 'updatedAt'> {}

export interface ICadenceDeleteReq {
    id: string;
}

export interface ICadenceDeleteArrayReq {
    id: number[];
}
