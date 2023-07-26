import { PostModel } from "./post.model.js";
import { ProfileModel } from "./profile.model.js";

export interface UserModel {
    id: string,
    name: string,
    balance: number,
    profile: ProfileModel,
    posts: PostModel[],
    userSubscribedTo: UserModel[],
    subscribedToUser: UserModel[],
}

export interface UserInputModel {
    name: string,
    balance: number,
}
