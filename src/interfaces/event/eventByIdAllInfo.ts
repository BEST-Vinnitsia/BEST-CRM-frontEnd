export interface IEventAllInfo {
    id: string;
    name: string;
    isActive: boolean;

    newEvent: IEventAllInfoNewEvent[] | [];
}

interface IEventAllInfoNewEvent {
    id: string;
    cadence: IEventAllInfoCadence;
    memberToEvent: IEventAllInfoMemberToEvent[] | [];
}

interface IEventAllInfoCadence {
    id: string;
    number: number;
    isEnd: boolean;
}

interface IEventAllInfoMemberToEvent {
    id: string;
    excluded: string;
    excludedDate: Date | null;
    member: IEventAllInfoMember;
    responsible: IEventAllInfoResponsible;
}

interface IEventAllInfoMember {
    id: string;
    name: string;
    surname: string;
}

interface IEventAllInfoResponsible {
    id: string;
    name: string;
    role: string;
}
