export interface ICadence {
    id: string;
    number: number;
    isEnd: boolean;
    startDate: Date;
    endDate: Date | null;

    createdAt: Date;
    updatedAt: Date;
}

/* ----------------  extends  ---------------- */

export interface ICadenceGetById extends Pick<ICadence, 'id'> {}

export interface ICadenceCreate extends Omit<ICadence, 'id' | 'createdAt' | 'updatedAt'> {}

export interface ICadenceUpdate extends Omit<ICadence, 'createdAt' | 'updatedAt'> {}

export interface ICadenceDeleteArray {
    cadencesId: string[];
}
