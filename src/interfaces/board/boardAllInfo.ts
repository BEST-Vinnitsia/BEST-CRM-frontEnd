export interface IBoardAllInfo {
    id: string;
    name: string;
    isActive: boolean;

    boardToMember: IBoardAllInfoBoardToMember[] | [];
}

interface IBoardAllInfoBoardToMember {
    id: string;
    excluded: boolean;
    excludedDate: Date | null;
    cadence: IBoardAllInfoCadence;
    member: IBoardAllInfoMember;
}

interface IBoardAllInfoCadence {
    id: string;
    number: number;
    isEnd: boolean;
}

interface IBoardAllInfoMember {
    id: string;
    name: string;
    surname: string;
}
