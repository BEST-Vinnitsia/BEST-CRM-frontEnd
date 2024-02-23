export interface IToken {
    refreshTokenId: number;
    memberId: number;
    membershipName: string;
    fullName: string;
    surname: string;
    claims: string[];
    exp: number;
}
