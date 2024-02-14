export interface INewEvent {
    id: string;
    eventId: string;
    cadenceId: string;
    // endDate
    // isDone

    createdAt: Date;
    updatedAt: Date;
}

/* ----------------  extends  ---------------- */

export interface INewEventGetById extends Pick<INewEvent, 'id'> {}

export interface INewEventGetByCadenceId extends Pick<INewEvent, 'cadenceId'> {}

export interface INewEventGetByEventId extends Pick<INewEvent, 'eventId'> {}

export interface INewEventCreate extends Omit<INewEvent, 'id' | 'createdAt' | 'updatedAt'> {}

export interface INewEventUpdate extends Omit<INewEvent, 'createdAt' | 'updatedAt'> {}

export interface INewEventDeleteArray {
    newEventsId: string[];
}
