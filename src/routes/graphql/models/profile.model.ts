import { MemberTypeId } from "../../member-types/schemas.js";

export interface ProfileModel {
    id: string,
    isMale: boolean,
    yearOfBirth: number,
    memberTypeId: MemberTypeId,
    userId: string,
}
