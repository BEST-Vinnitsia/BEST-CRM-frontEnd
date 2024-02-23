import { IMemberPrisma } from '../prisma';

export interface IMemberGetListReq {}
export interface IMemberGetByIdReq  {id: string}
export interface IMemberCreateReq extends Omit<IMemberPrisma, 'id' | 'createdAt' | 'updatedAt'> {}
export interface IMemberUpdateReq extends Omit<IMemberPrisma, 'login' | 'password' | 'createdAt' | 'updatedAt'> {}
export interface IMemberDeleteReq  {id: string}
export interface IMemberDeleteArrayReq {
    id: number[];
}
