export interface ICadencePrisma {
    id: number;
    number: number;
    isEnd: boolean;
    startDate: Date | null;
    endDate: Date | null;
    createdAt: Date;
    updatedAt: Date;
}
