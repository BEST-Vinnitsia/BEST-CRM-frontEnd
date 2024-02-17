import { ICommitteePrisma } from '../prisma';

export interface ICommitteeGetListReq {}
export interface ICommitteeGetByIdReq extends Pick<ICommitteePrisma, 'id'> {}
export interface ICommitteeCreateReq extends Omit<ICommitteePrisma, 'id' | 'createdAt' | 'updatedAt'> {}
export interface ICommitteeUpdateReq extends Omit<ICommitteePrisma, 'createdAt' | 'updatedAt'> {}
export interface ICommitteeDeleteReq extends Pick<ICommitteePrisma, 'id'> {}
export interface ICommitteeDeleteArrayReq {
    id: number[];
}
