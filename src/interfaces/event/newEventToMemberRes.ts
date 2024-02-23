import { INewEventToMemberPrisma } from '../prisma';

export interface INewEventToMemberGetListRes extends Omit<INewEventToMemberPrisma, 'createdAt' | 'updatedAt'> {}
export interface INewEventToMemberGetByIdRes extends INewEventToMemberPrisma {}
export interface INewEventToMemberGetByNewEventIdRes extends INewEventToMemberPrisma {}
export interface INewEventToMemberGetByResponsibleIdRes extends INewEventToMemberPrisma {}
export interface INewEventToMemberGetByMemberIdRes extends INewEventToMemberPrisma {}
export interface INewEventToMemberCreateRes extends Pick<INewEventToMemberPrisma, 'id'> {}
export interface INewEventToMemberUpdateRes extends Pick<INewEventToMemberPrisma, 'id'> {}
export interface INewEventToMemberDeleteRes extends Pick<INewEventToMemberPrisma, 'id'> {}
export interface INewEventToMemberDeleteArrayRes {
    count: number;
}
