import { IBoardToMemberPrisma } from '../prisma';

export interface IBoardToMemberGetListReq {}

export interface IBoardToMemberGetByIdReq {
    id: string;
}

export interface IBoardToMemberGetByBoardIdReq {
    boardId: string;
}

export interface IBoardToMemberGetByCadenceIdReq {
    cadenceId: string;
}

export interface IBoardToMemberGetByMemberIdReq {
    memberId: string;
}

export interface IBoardToMemberCreateReq extends Omit<IBoardToMemberPrisma, 'id' | 'createdAt' | 'updatedAt'> {}

export interface IBoardToMemberUpdateReq extends Omit<IBoardToMemberPrisma, 'createdAt' | 'updatedAt'> {}

export interface IBoardToMemberDeleteReq {
    id: string;
}

export interface IBoardToMemberDeleteArrayReq {
    id: number[];
}
