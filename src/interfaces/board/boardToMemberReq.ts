import { IBoardToMemberPrisma } from '../prisma';

export interface IBoardToMemberGetListReq {}
export interface IBoardToMemberGetByIdReq extends Pick<IBoardToMemberPrisma, 'id'> {}
export interface IBoardToMemberGetByBoardIdReq extends Pick<IBoardToMemberPrisma, 'boardId'> {}
export interface IBoardToMemberGetByCadenceIdReq extends Pick<IBoardToMemberPrisma, 'cadenceId'> {}
export interface IBoardToMemberGetByMemberIdReq extends Pick<IBoardToMemberPrisma, 'memberId'> {}
export interface IBoardToMemberCreateReq extends Omit<IBoardToMemberPrisma, 'id' | 'createdAt' | 'updatedAt'> {}
export interface IBoardToMemberUpdateReq extends Omit<IBoardToMemberPrisma, 'createdAt' | 'updatedAt'> {}
export interface IBoardToMemberDeleteReq extends Pick<IBoardToMemberPrisma, 'id'> {}
export interface IBoardToMemberDeleteArrayReq {
    id: number[];
}
