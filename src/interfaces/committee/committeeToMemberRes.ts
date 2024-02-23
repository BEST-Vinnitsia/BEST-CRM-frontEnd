import { ICommitteeToMemberPrisma } from '../prisma';

export interface ICommitteeToMemberGetListRes extends Omit<ICommitteeToMemberPrisma, 'createdAt' | 'updatedAt'> {}
export interface ICommitteeToMemberGetByIdRes extends ICommitteeToMemberPrisma {}
export interface ICommitteeToMemberGetByCommitteeIdRes extends ICommitteeToMemberPrisma {}
export interface ICommitteeToMemberGetByCadenceIdRes extends ICommitteeToMemberPrisma {}
export interface ICommitteeToMemberGetByMemberIdRes extends ICommitteeToMemberPrisma {}
export interface ICommitteeToMemberCreateRes extends Pick<ICommitteeToMemberPrisma, 'id'> {}
export interface ICommitteeToMemberUpdateRes extends Pick<ICommitteeToMemberPrisma, 'id'> {}
export interface ICommitteeToMemberDeleteRes extends Pick<ICommitteeToMemberPrisma, 'id'> {}
export interface ICommitteeToMemberDeleteArrayRes {
    count: number;
}
