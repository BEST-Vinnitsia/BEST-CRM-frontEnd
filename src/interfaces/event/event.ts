export interface IEvent {
    id: string;
    name: string;
    // fullName: string;
    // description: string;
    isActive: boolean;

    createdAt: Date;
    updatedAt: Date;
}

/* ----------------  extends  ---------------- */

export interface IEventGetById extends Pick<IEvent, 'id'> {}

export interface IEventCreate extends Omit<IEvent, 'id' | 'createdAt' | 'updatedAt'> {}

export interface IEventUpdate extends Omit<IEvent, 'createdAt' | 'updatedAt'> {}

export interface IEventDeleteArray {
    eventsId: string[];
}
