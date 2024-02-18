import { ICoordinatorToMemberPrisma } from '../prisma';

export interface ICoordinatorToMemberGetListReq {}

export interface ICoordinatorToMemberGetByIdReq {
    id: string;
}

export interface ICoordinatorToMemberGetByCoordinatorIdReq {
    coordinatorId: string;
}

export interface ICoordinatorToMemberGetByCadenceIdReq {
    cadenceId: string;
}

export interface ICoordinatorToMemberGetByMemberIdReq {
    memberId: string;
}

export interface ICoordinatorToMemberCreateReq
    extends Omit<ICoordinatorToMemberPrisma, 'id' | 'createdAt' | 'updatedAt'> {}

export interface ICoordinatorToMemberUpdateReq extends Omit<ICoordinatorToMemberPrisma, 'createdAt' | 'updatedAt'> {}

export interface ICoordinatorToMemberDeleteReq {
    id: string;
}

export interface ICoordinatorToMemberDeleteArrayReq {
    id: number[];
}
