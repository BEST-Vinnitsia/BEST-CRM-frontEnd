export interface IToken {
    refreshTokenId: string;
    memberId: string;
    membershipName: string;
    fullName: string;
    surname: string;
    claims: string[];
    exp: number;
}
