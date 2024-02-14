export interface ICommitteeToMember {
    id: string;
    cadenceId: string;
    committeeId: string;
    memberId: string;
    excluded: boolean;
    excludedDate: Date | null;

    createdAt: Date;
    updatedAt: Date;
}

/* ----------------  extends  ---------------- */

export interface ICommitteeToMemberGetById extends Pick<ICommitteeToMember, 'id'> {}

export interface ICommitteeToMemberGetByMemberId extends Pick<ICommitteeToMember, 'memberId'> {}

export interface ICommitteeToMemberGetByCadenceId extends Pick<ICommitteeToMember, 'cadenceId'> {}

export interface ICommitteeToMemberGetByBoardId extends Pick<ICommitteeToMember, 'committeeId'> {}

export interface ICommitteeToMemberCreate extends Omit<ICommitteeToMember, 'id' | 'excluded' | 'excludedDate' | 'createdAt' | 'updatedAt'> {}

export interface ICommitteeToMemberUpdate extends Omit<ICommitteeToMember, 'createdAt' | 'excluded' | 'excludedDate' | 'updatedAt'> {}

export interface ICommitteeToMemberDeleteArray {
    committeeToMemberId: string[];
}
