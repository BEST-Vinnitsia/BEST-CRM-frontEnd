export interface IResponsible {
    id: string;
    eventId: string;
    name: string;
    // fullName: string;
    role: string /* Resp, WG, Day Resp */;
    description: string | null;
    isActive: boolean;

    createdAt: Date;
    updatedAt: Date;
}

/* ----------------  extends  ---------------- */

export interface IResponsibleGetById extends Pick<IResponsible, 'id'> {}

export interface IResponsibleGetByEventId extends Pick<IResponsible, 'eventId'> {}

export interface IResponsibleCreate extends Omit<IResponsible, 'id' | 'createdAt' | 'updatedAt'> {}

export interface IResponsibleUpdate extends Omit<IResponsible, 'createdAt' | 'updatedAt'> {}

export interface IResponsibleDeleteArray {
    responsibleId: string[];
}
