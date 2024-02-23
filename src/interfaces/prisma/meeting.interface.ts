export interface IMeetingPrisma {
    id: number;
    cadenceId: number;
    name: string;
    type: string; //LGA, GM, QR
    date: Date;
    createdAt: Date;
    updatedAt: Date;
}
