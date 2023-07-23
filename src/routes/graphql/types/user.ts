import { GraphQLFloat, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { UUIDType } from "./uuid.js";
import { post } from "./post.js";
import { profile } from "./profile.js";
import { ContextModel } from "../models/context.model.js";
import { UserModel } from "../models/user.model.js";

export const user = new GraphQLObjectType<UserModel, ContextModel>({
        name: 'User',
        fields: () => ({
            id: {
                type: new GraphQLNonNull(UUIDType)
            },
            name: {
                type: new GraphQLNonNull(GraphQLString)
            },
            balance: {
                type: new GraphQLNonNull(GraphQLFloat)
            },
            profile: {
                type: profile as GraphQLObjectType,
                resolve: async ({ id }, _args, { prisma }) => {
                    return await prisma.profile.findUnique({
                        where: { id }
                    });
                },
            },
            posts: {
                type: new GraphQLList(post),
                resolve: async ({ id }, _args, { prisma }) => {
                    return await prisma.post.findUnique({
                        where: { id }
                    });
                },
            },
            userSubscribedTo: {
                type: new GraphQLList(user),
                resolve: async ({ id }, args, { prisma }) => {
                    const result = await prisma.user.findUnique({
                        where: { id },
                        include: {
                            userSubscribedTo: true,
                            subscribedToUser: true,
                        },
                    });

                    return result ? [result] : [];
                }
            },
            subscribedToUser: {
                type: new GraphQLList(user),
            },
        }),
    },
);
