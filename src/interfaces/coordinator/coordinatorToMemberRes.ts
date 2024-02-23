import { ICoordinatorToMemberPrisma } from '../prisma';

export interface ICoordinatorToMemberGetListRes extends Omit<ICoordinatorToMemberPrisma, 'createdAt' | 'updatedAt'> {}
export interface ICoordinatorToMemberGetByIdRes extends ICoordinatorToMemberPrisma {}
export interface ICoordinatorToMemberGetByCoordinatorIdRes extends ICoordinatorToMemberPrisma {}
export interface ICoordinatorToMemberGetByCadenceIdRes extends ICoordinatorToMemberPrisma {}
export interface ICoordinatorToMemberGetByMemberIdRes extends ICoordinatorToMemberPrisma {}
export interface ICoordinatorToMemberCreateRes extends Pick<ICoordinatorToMemberPrisma, 'id'> {}
export interface ICoordinatorToMemberUpdateRes extends Pick<ICoordinatorToMemberPrisma, 'id'> {}
export interface ICoordinatorToMemberDeleteRes extends Pick<ICoordinatorToMemberPrisma, 'id'> {}
export interface ICoordinatorToMemberDeleteArrayRes {
    count: number;
}
