import { UserModel } from "./user.model.js";
import { MemberModel } from "./member.model.js";

export interface ProfileModel {
    id: string,
    isMale: boolean,
    yearOfBirth: number,
    memberType: MemberModel,
    user: UserModel,
}
