import { IMemberPrisma } from '../prisma';

export interface IMemberGetListRes
    extends Omit<IMemberPrisma, 'login' | 'password' | 'createdAt' | 'updatedAt' | 'homeAddress' | 'clothingSize'> {}

export interface IMemberGetByIdRes extends Omit<IMemberPrisma, 'login' | 'password'> {}

export interface IMemberCreateRes extends Pick<IMemberPrisma, 'id'> {}

export interface IMemberUpdateRes extends Pick<IMemberPrisma, 'id'> {}

export interface IMemberDeleteRes extends Pick<IMemberPrisma, 'id'> {}

export interface IMemberDeleteArrayRes {
    count: number;
}
