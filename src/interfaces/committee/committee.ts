export interface ICommittee {
    id: string;
    name: string;
    // fullName: string;
    // description: string;
    isActive: boolean;

    createdAt: Date;
    updatedAt: Date;
}

/* ----------------  extends  ---------------- */

export interface ICommitteeGetById extends Pick<ICommittee, 'id'> {}

export interface ICommitteeCreate extends Omit<ICommittee, 'id' | 'createdAt' | 'updatedAt'> {}

export interface ICommitteeUpdate extends Omit<ICommittee, 'name' | 'createdAt' | 'updatedAt'> {}

export interface ICommitteeDeleteArray {
    committeesId: string[];
}
