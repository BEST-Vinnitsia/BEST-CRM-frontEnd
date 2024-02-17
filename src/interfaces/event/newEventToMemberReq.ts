import { INewEventToMemberPrisma } from '../prisma';

export interface INewEventToMemberGetListReq {}
export interface INewEventToMemberGetByIdReq extends Pick<INewEventToMemberPrisma, 'id'> {}
export interface INewEventToMemberGetByNewEventIdReq extends Pick<INewEventToMemberPrisma, 'newEventId'> {}
export interface INewEventToMemberGetByResponsibleIdReq extends Pick<INewEventToMemberPrisma, 'responsibleId'> {}
export interface INewEventToMemberGetByMemberIdReq extends Pick<INewEventToMemberPrisma, 'memberId'> {}
export interface INewEventToMemberCreateReq extends Omit<INewEventToMemberPrisma, 'id' | 'createdAt' | 'updatedAt'> {}
export interface INewEventToMemberUpdateReq extends Omit<INewEventToMemberPrisma, 'createdAt' | 'updatedAt'> {}
export interface INewEventToMemberDeleteReq extends Pick<INewEventToMemberPrisma, 'id'> {}
export interface INewEventToMemberDeleteArrayReq {
    id: number[];
}
