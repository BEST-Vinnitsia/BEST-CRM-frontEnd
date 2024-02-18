import { ICommitteePrisma } from '../prisma';

export interface ICommitteeGetListReq {}

export interface ICommitteeGetByIdReq {
    id: string;
}

export interface ICommitteeCreateReq extends Omit<ICommitteePrisma, 'id' | 'createdAt' | 'updatedAt'> {}

export interface ICommitteeUpdateReq extends Omit<ICommitteePrisma, 'createdAt' | 'updatedAt'> {}

export interface ICommitteeDeleteReq {
    id: string;
}

export interface ICommitteeDeleteArrayReq {
    id: number[];
}
