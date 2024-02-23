import { IResponsiblePrisma } from '../prisma';

export interface IResponsibleGetListRes extends Omit<IResponsiblePrisma, 'createdAt' | 'updatedAt'> {}
export interface IResponsibleGetByIdRes extends IResponsiblePrisma {}
export interface IResponsibleGetByEventIdRes extends IResponsiblePrisma {}
export interface IResponsibleCreateRes extends Pick<IResponsiblePrisma, 'id'> {}
export interface IResponsibleUpdateRes extends Pick<IResponsiblePrisma, 'id'> {}
export interface IResponsibleDeleteRes extends Pick<IResponsiblePrisma, 'id'> {}
export interface IResponsibleDeleteArrayRes {
    count: number;
}
