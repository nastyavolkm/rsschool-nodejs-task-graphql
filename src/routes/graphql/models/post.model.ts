import { UserModel } from "./user.model.js";

export interface PostModel {
    id: string,
    title: string,
    content: string,
    author: UserModel,
}

export interface PostInputModel {
    title: string,
    content: string,
    authorId: string,
}
