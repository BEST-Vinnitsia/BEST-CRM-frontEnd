import { IBoardToMemberPrisma } from '../prisma';

export interface IBoardToMemberGetListRes extends Omit<IBoardToMemberPrisma, 'createdAt' | 'updatedAt'> {}
export interface IBoardToMemberGetByIdRes extends IBoardToMemberPrisma {}
export interface IBoardToMemberGetByBoardIdRes extends IBoardToMemberPrisma {}
export interface IBoardToMemberGetByCadenceIdRes extends IBoardToMemberPrisma {}
export interface IBoardToMemberGetByMemberIdRes extends IBoardToMemberPrisma {}
export interface IBoardToMemberCreateRes extends Pick<IBoardToMemberPrisma, 'id'> {}
export interface IBoardToMemberUpdateRes extends Pick<IBoardToMemberPrisma, 'id'> {}
export interface IBoardToMemberDeleteRes extends Pick<IBoardToMemberPrisma, 'id'> {}
export interface IBoardToMemberDeleteArrayRes {
    count: number;
}
