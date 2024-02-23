import { ICommitteeToMemberPrisma } from '../prisma';

export interface ICommitteeToMemberGetListReq {}

export interface ICommitteeToMemberGetByIdReq {
    id: string;
}

export interface ICommitteeToMemberGetByCommitteeIdReq {
    committeeId: string;
}

export interface ICommitteeToMemberGetByCadenceIdReq {
    cadenceId: string;
}

export interface ICommitteeToMemberGetByMemberIdReq {
    memberId: string;
}

export interface ICommitteeToMemberCreateReq extends Omit<ICommitteeToMemberPrisma, 'id' | 'createdAt' | 'updatedAt'> {}

export interface ICommitteeToMemberUpdateReq extends Omit<ICommitteeToMemberPrisma, 'createdAt' | 'updatedAt'> {}

export interface ICommitteeToMemberDeleteReq {
    id: string;
}

export interface ICommitteeToMemberDeleteArrayReq {
    id: number[];
}
