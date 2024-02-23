export interface ICommitteeToMemberPrisma {
    id: number;
    memberId: number;
    committeeId: number;
    cadenceId: number;
    isLeader: boolean;
    excluded: boolean;
    excludedDate: Date | null;
    createdAt: Date;
    updatedAt: Date;
}
