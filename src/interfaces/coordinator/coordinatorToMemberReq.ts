import { ICoordinatorToMemberPrisma } from '../prisma';

export interface ICoordinatorToMemberGetListReq {}
export interface ICoordinatorToMemberGetByIdReq extends Pick<ICoordinatorToMemberPrisma, 'id'> {}
export interface ICoordinatorToMemberGetByCoordinatorIdReq extends Pick<ICoordinatorToMemberPrisma, 'coordinatorId'> {}
export interface ICoordinatorToMemberGetByCadenceIdReq extends Pick<ICoordinatorToMemberPrisma, 'cadenceId'> {}
export interface ICoordinatorToMemberGetByMemberIdReq extends Pick<ICoordinatorToMemberPrisma, 'memberId'> {}
export interface ICoordinatorToMemberCreateReq extends Omit<ICoordinatorToMemberPrisma, 'id' | 'createdAt' | 'updatedAt'> {}
export interface ICoordinatorToMemberUpdateReq extends Omit<ICoordinatorToMemberPrisma, 'createdAt' | 'updatedAt'> {}
export interface ICoordinatorToMemberDeleteReq extends Pick<ICoordinatorToMemberPrisma, 'id'> {}
export interface ICoordinatorToMemberDeleteArrayReq {
    id: number[];
}
