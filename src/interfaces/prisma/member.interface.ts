export interface IMemberPrisma {
    id: number;
    membership: string;
    login: string;
    password: string;
    bestEmail: string | null;
    email: string;
    phone: string;
    socialNetwork: string;
    name: string;
    surname: string;
    middleName: string;
    birthday: Date;
    group: string;
    faculty: string;
    clothingSize: string | null;
    homeAddress: string | null;
    createdAt: Date;
    updatedAt: Date;
}
