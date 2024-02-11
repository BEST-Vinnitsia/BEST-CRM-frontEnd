export interface IMember {
    id: string;
    membership: string /* Observer, Baby, Full, Alumni, Excluded */;

    login: string;
    password: string;

    bestEmail: string | null;

    name: string; //
    surname: string;
    middleName: string;
    birthday: string;

    group: string;
    faculty: string;

    clothingSize: string | null;
    homeAddress: string | null;

    createdAt: Date;
    updatedAt: Date;
}

/* ----------------  extends  ---------------- */

export interface IMemberGetListRes extends IMember {}

export interface IMemberGetId extends Pick<IMember, 'id'> {}

export interface IMemberGetIdRes extends IMember {}

export interface IMemberCreate extends Omit<IMember, 'id' | 'createdAt' | 'updatedAt'> {}

export interface IMemberCreateRes extends IMember {}

export interface IMemberUpdate extends Omit<IMember, 'login' | 'password' | 'createdAt' | 'updatedAt'> {}

export interface IMemberUpdateMembership extends Pick<IMember, 'id' | 'membership'> {}

export interface IMemberDeleteArray {
    membersId: string[];
}
