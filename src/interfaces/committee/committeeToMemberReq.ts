import { ICommitteeToMemberPrisma } from '../prisma';

export interface ICommitteeToMemberGetListReq {}
export interface ICommitteeToMemberGetByIdReq extends Pick<ICommitteeToMemberPrisma, 'id'> {}
export interface ICommitteeToMemberGetByCommitteeIdReq extends Pick<ICommitteeToMemberPrisma, 'committeeId'> {}
export interface ICommitteeToMemberGetByCadenceIdReq extends Pick<ICommitteeToMemberPrisma, 'cadenceId'> {}
export interface ICommitteeToMemberGetByMemberIdReq extends Pick<ICommitteeToMemberPrisma, 'memberId'> {}
export interface ICommitteeToMemberCreateReq extends Omit<ICommitteeToMemberPrisma, 'id' | 'createdAt' | 'updatedAt'> {}
export interface ICommitteeToMemberUpdateReq extends Omit<ICommitteeToMemberPrisma, 'createdAt' | 'updatedAt'> {}
export interface ICommitteeToMemberDeleteReq extends Pick<ICommitteeToMemberPrisma, 'id'> {}
export interface ICommitteeToMemberDeleteArrayReq {
    id: number[];
}
