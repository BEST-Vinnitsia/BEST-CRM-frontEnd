export interface ICoordinatorToMember {
    id: string;
    cadenceId: string;
    coordinatorId: string;
    memberId: string;
    excluded: boolean;
    excludedDate: Date | null;

    createdAt: Date;
    updatedAt: Date;
}

/* ----------------  extends  ---------------- */

export interface ICoordinatorToMemberGetById extends Pick<ICoordinatorToMember, 'id'> {}

export interface ICoordinatorToMemberGetByMemberId extends Pick<ICoordinatorToMember, 'memberId'> {}

export interface ICoordinatorToMemberGetByCadenceId extends Pick<ICoordinatorToMember, 'cadenceId'> {}

export interface ICoordinatorToMemberGetByBoardId extends Pick<ICoordinatorToMember, 'coordinatorId'> {}

export interface ICoordinatorToMemberCreate extends Omit<ICoordinatorToMember, 'id' | 'excluded' | 'excludedDate' | 'createdAt' | 'updatedAt'> {}

export interface ICoordinatorToMemberUpdate extends Omit<ICoordinatorToMember, 'createdAt' | 'excluded' | 'excludedDate' | 'updatedAt'> {}

export interface ICoordinatorToMemberDeleteArray {
    coordinatorToMemberId: string[];
}
