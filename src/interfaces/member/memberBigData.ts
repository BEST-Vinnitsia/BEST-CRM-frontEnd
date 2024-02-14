export interface IMemberListAllInfo {
    id: string;
    membership: string;

    bestEmail: string | null;
    email: string;
    phone: string;
    socialNetwork: string;

    name: string;
    surname: string;
    birthday: string;

    group: string;
    faculty: string;

    boardToMember: IMemberListAllInfoBoardToMember[] | [];
    coordinatorToMember: IMemberListAllInfoCoordinatorToMember[] | [];
    committeeToMember: IMemberListAllInfoCommitteeToMember[] | [];
    memberToEvent: IMemberListAllInfoEventToMember[] | [];
}

// board
interface IMemberListAllInfoBoardToMember {
    id: string;
    cadence: IMemberListAllInfoCadence;
    board: IMemberListAllInfoBoard;
}

interface IMemberListAllInfoCadence {
    id: string;
    number: number;
    isEnd: boolean;
}

interface IMemberListAllInfoBoard {
    id: string;
    name: string;
    isActive: boolean;
}

// coordinator
interface IMemberListAllInfoCoordinatorToMember {
    id: string;
    cadence: IMemberListAllInfoCadence;
    coordinator: IMemberListAllInfoCoordinator;
}

interface IMemberListAllInfoCoordinator {
    id: string;
    name: string;
    isActive: boolean;
}

// committee
interface IMemberListAllInfoCommitteeToMember {
    id: string;
    cadence: IMemberListAllInfoCadence;
    committee: IMemberListAllInfoCommittee;
}

interface IMemberListAllInfoCommittee {
    id: string;
    name: string;
    isActive: boolean;
}

// event
interface IMemberListAllInfoEventToMember {
    id: string;
    newEvent: IMemberListAllInfoNewEvent;
    responsible: IMemberListAllInfoResponsible;
}

interface IMemberListAllInfoNewEvent {
    id: string;
    event: IMemberListAllInfoEvent;
    cadence: IMemberListAllInfoCadence;
}

interface IMemberListAllInfoEvent {
    id: string;
    name: string;
    isActive: boolean;
}

interface IMemberListAllInfoResponsible {
    id: string;
    name: string;
    isActive: boolean;
    role: string;
}
