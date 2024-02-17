import { ICommitteePrisma } from '../prisma';

export interface ICommitteeGetListRes extends Omit<ICommitteePrisma, 'createdAt' | 'updatedAt'> {}
export interface ICommitteeGetByIdRes extends ICommitteePrisma {}
export interface ICommitteeCreateRes extends Pick<ICommitteePrisma, 'id'> {}
export interface ICommitteeUpdateRes extends Pick<ICommitteePrisma, 'id'> {}
export interface ICommitteeDeleteRes extends Pick<ICommitteePrisma, 'id'> {}
export interface ICommitteeDeleteArrayRes {
    count: number;
}
