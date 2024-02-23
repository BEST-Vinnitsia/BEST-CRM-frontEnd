export interface INewEventToMemberPrisma {
    id: number;
    newEventId: number;
    responsibleId: number;
    memberId: number;
    excluded: boolean;
    excludedDate: Date | null;
    createdAt: Date;
    updatedAt: Date;
}
