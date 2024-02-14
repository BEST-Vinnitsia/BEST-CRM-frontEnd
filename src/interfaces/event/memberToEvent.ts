export interface IMemberToEvent {
    id: string;
    newEventId: string;
    responsibleId: string;
    memberId: string;
    excluded: boolean;
    excludedDate: Date | null;

    createdAt: Date;
    updatedAt: Date;
}

/* ----------------  extends  ---------------- */

export interface IMemberToEventGetById extends Pick<IMemberToEvent, 'id'> {}

export interface IMemberToEventGetByNewEventId extends Pick<IMemberToEvent, 'newEventId'> {}

export interface IMemberToEventGetByResponsibleId extends Pick<IMemberToEvent, 'responsibleId'> {}

export interface IMemberToEventGetByMemberId extends Pick<IMemberToEvent, 'memberId'> {}

export interface IMemberToEventCreate extends Omit<IMemberToEvent, 'id' | 'createdAt' | 'updatedAt'> {}

export interface IMemberToEventUpdate extends Omit<IMemberToEvent, 'createdAt' | 'updatedAt'> {}

export interface IMemberToEventDeleteArray {
    membersToEventsId: string[];
}
