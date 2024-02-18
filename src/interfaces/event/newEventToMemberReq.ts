import { INewEventToMemberPrisma } from '../prisma';

export interface INewEventToMemberGetListReq {}

export interface INewEventToMemberGetByIdReq {
    id: string;
}

export interface INewEventToMemberGetByNewEventIdReq {
    newEventId: string;
}

export interface INewEventToMemberGetByResponsibleIdReq {
    responsibleId: string;
}

export interface INewEventToMemberGetByMemberIdReq {
    memberId: string;
}

export interface INewEventToMemberCreateReq extends Omit<INewEventToMemberPrisma, 'id' | 'createdAt' | 'updatedAt'> {}

export interface INewEventToMemberUpdateReq extends Omit<INewEventToMemberPrisma, 'createdAt' | 'updatedAt'> {}

export interface INewEventToMemberDeleteReq {
    id: string;
}

export interface INewEventToMemberDeleteArrayReq {
    id: number[];
}
