export interface IResponsiblePrisma {
    id: number;
    eventId: number;
    name: string;
    fullName: string;
    isActive: boolean;
    role: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}
