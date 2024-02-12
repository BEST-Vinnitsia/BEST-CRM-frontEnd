export interface IBoardToMember {
    id: string;
    cadenceId: string;
    boardId: string;
    memberId: string;
    excluded: boolean;
    excludedDate: Date | null;

    createdAt: Date;
    updatedAt: Date;
}

/* ----------------  extends  ---------------- */

export interface IBoardToMemberGetById extends Pick<IBoardToMember, 'id'> {}

export interface IBoardToMemberGetByMemberId extends Pick<IBoardToMember, 'memberId'> {}

export interface IBoardToMemberGetByCadenceId extends Pick<IBoardToMember, 'cadenceId'> {}

export interface IBoardToMemberGetByBoardId extends Pick<IBoardToMember, 'boardId'> {}

export interface IBoardToMemberCreate extends Omit<IBoardToMember, 'id' | 'excluded' | 'excludedDate' | 'createdAt' | 'updatedAt'> {}

export interface IBoardToMemberUpdate extends Omit<IBoardToMember, 'createdAt' | 'excluded' | 'excludedDate' | 'updatedAt'> {}

export interface IBoardToMemberDeleteArray {
    boardToMemberId: string[];
}
