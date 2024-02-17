export interface IBoardToMemberPrisma {
    id: number;
    memberId: number;
    boardId: number;
    cadenceId: number;
    excluded: boolean;
    excludedDate: Date | null;
    createdAt: Date;
    updatedAt: Date;
}
