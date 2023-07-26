import {
    GraphQLFloat,
    GraphQLInputObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString
} from "graphql";
import { UUIDType } from "./uuid.js";
import { post } from "./post.js";
import { profile } from "./profile.js";
import { ContextModel } from "../models/context.model.js";
import { UserModel } from "../models/user.model.js";

export const createUserInput = new GraphQLInputObjectType({
    name: 'CreateUserInput',
    fields: {
        name: {
            type: new GraphQLNonNull(GraphQLString),
        },
        balance: {
            type: new GraphQLNonNull(GraphQLFloat),
        },
    },
});

export const changeUserInput = new GraphQLInputObjectType({
    name: 'ChangeUserInput',
    fields: {
        name: {
            type: GraphQLString,
        },
        balance: {
            type: GraphQLFloat,
        },
    },
});

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
                        where: { userId: id },
                    });
                },
            },
            posts: {
                type: new GraphQLList(post),
                resolve: async ({ id }, _args, { prisma }) => {
                    return await prisma.post.findMany({
                        where: { authorId: id },
                    });
                },
            },
            userSubscribedTo: {
                type: new GraphQLList(user),
                resolve: async ({ id }, _args, { prisma }) => {
                    return await prisma.user.findMany(
                        { where: { subscribedToUser: { some: { subscriberId: id } } } }
                    );
                }
            },
            subscribedToUser: {
                type: new GraphQLList(user),
                resolve: async ({ id }, _args, { prisma }) => {
                    return await prisma.user.findMany(
                        { where: { userSubscribedTo: { some: { authorId: id } } } }
                    );
                }
            },
        }),
    },
);
