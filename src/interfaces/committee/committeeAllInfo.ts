export interface ICommitteeAllInfo {
    id: string;
    name: string;
    isActive: boolean;

    committeeToMember: ICommitteeAllInfoCommitteeToMember[] | [];
}

interface ICommitteeAllInfoCommitteeToMember {
    id: string;
    isLeader: boolean;
    excluded: boolean;
    excludedDate: Date | null;
    cadence: ICommitteeAllInfoCadence;
    member: ICommitteeAllInfoMember;
}

interface ICommitteeAllInfoCadence {
    id: string;
    number: number;
    isEnd: boolean;
}

interface ICommitteeAllInfoMember {
    id: string;
    name: string;
    surname: string;
}
