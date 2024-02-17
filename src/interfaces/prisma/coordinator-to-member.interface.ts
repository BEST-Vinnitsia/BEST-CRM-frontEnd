export interface ICoordinatorToMemberPrisma {
    id: number;
    memberId: number;
    coordinatorId: number;
    cadenceId: number;
    excluded: boolean;
    excludedDate: Date | null;
    createdAt: Date;
    updatedAt: Date;
}
