import { IResponsiblePrisma } from '../prisma';

export interface IResponsibleGetListReq {}

export interface IResponsibleGetByIdReq {
    id: string;
}

export interface IResponsibleGetByEventIdReq {
    eventId: string;
}

export interface IResponsibleCreateReq extends Omit<IResponsiblePrisma, 'id' | 'createdAt' | 'updatedAt'> {}

export interface IResponsibleUpdateReq extends Omit<IResponsiblePrisma, 'createdAt' | 'updatedAt'> {}

export interface IResponsibleDeleteReq {
    id: string;
}

export interface IResponsibleDeleteArrayReq {
    id: number[];
}
