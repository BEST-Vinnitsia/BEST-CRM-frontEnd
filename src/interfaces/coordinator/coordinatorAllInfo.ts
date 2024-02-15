export interface ICoordinatorAllInfo {
    id: string;
    name: string;
    isActive: boolean;
    excluded: boolean;
    excludedDate: Date | null;

    coordinatorToMember: ICoordinatorAllInfoCoordinatorToMember[] | [];
}

interface ICoordinatorAllInfoCoordinatorToMember {
    id: string;
    excluded: boolean;
    excludedDate: Date | null;
    cadence: ICoordinatorAllInfoCadence;
    member: ICoordinatorAllInfoMember;
}

interface ICoordinatorAllInfoCadence {
    id: string;
    number: number;
    isEnd: boolean;
}

interface ICoordinatorAllInfoMember {
    id: string;
    name: string;
    surname: string;
}
