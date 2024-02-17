import { IMemberPrisma } from '../prisma';

export interface IMemberGetListReq {}
export interface IMemberGetByIdReq extends Pick<IMemberPrisma, 'id'> {}
export interface IMemberCreateReq extends Omit<IMemberPrisma, 'id' | 'createdAt' | 'updatedAt'> {}
export interface IMemberUpdateReq extends Omit<IMemberPrisma, 'login' | 'password' | 'createdAt' | 'updatedAt'> {}
export interface IMemberDeleteReq extends Pick<IMemberPrisma, 'id'> {}
export interface IMemberDeleteArrayReq {
    id: number[];
}
