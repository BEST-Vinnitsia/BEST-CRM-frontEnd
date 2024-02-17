import { IResponsiblePrisma } from '../prisma';

export interface IResponsibleGetListReq {}
export interface IResponsibleGetByIdReq extends Pick<IResponsiblePrisma, 'id'> {}
export interface IResponsibleGetByEventIdReq extends Pick<IResponsiblePrisma, 'eventId'> {}
export interface IResponsibleCreateReq extends Omit<IResponsiblePrisma, 'id' | 'createdAt' | 'updatedAt'> {}
export interface IResponsibleUpdateReq extends Omit<IResponsiblePrisma, 'createdAt' | 'updatedAt'> {}
export interface IResponsibleDeleteReq extends Pick<IResponsiblePrisma, 'id'> {}
export interface IResponsibleDeleteArrayReq {
    id: number[];
}
