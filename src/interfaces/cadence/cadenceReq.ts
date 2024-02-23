import { ICadencePrisma } from '../prisma';

export interface ICadenceGetListReq {}

export interface ICadenceGetByIdReq {
    id: string;
}

export interface ICadenceCreateReq extends Omit<ICadencePrisma, 'id' | 'createdAt' | 'updatedAt' | 'startDate' | 'endDate'> {
    startDate: string | null;
    endDate: string | null;
}

export interface ICadenceUpdateReq extends Omit<ICadencePrisma, 'createdAt' | 'updatedAt' | 'startDate' | 'endDate'> {
    startDate: string | null;
    endDate: string | null;
}

export interface ICadenceDeleteReq {
    id: string;
}

export interface ICadenceDeleteArrayReq {
    id: number[];
}
