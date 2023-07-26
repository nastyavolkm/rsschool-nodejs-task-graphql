import { MemberTypeId } from "../../member-types/schemas.js";
import { ProfileModel } from "./profile.model.js";

export interface MemberModel {
    id: MemberTypeId,
    discount: number,
    postsLimitPerMonth: number,
    profiles: ProfileModel[],
}
