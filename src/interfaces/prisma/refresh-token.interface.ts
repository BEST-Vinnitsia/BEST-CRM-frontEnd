export interface IRefreshTokenPrisma {
    id: number;
    memberId: number;
    needUpdate: boolean;
    userData: string | null;
    createdAt: Date;
    updatedAt: Date;
}
