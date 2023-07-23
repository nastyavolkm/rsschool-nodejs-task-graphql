import { Type } from '@fastify/type-provider-typebox';
import { GraphQLObjectType, GraphQLSchema, GraphQLList, GraphQLNonNull } from "graphql";
import { member, memberTypeIdEnum } from "./types/member.js";
import { post } from "./types/post.js";
import { user } from "./types/user.js";
import { UUIDType } from "./types/uuid.js";
import { profile } from "./types/profile.js";
import { ContextModel } from "./models/context.model.js";
import { UserModel } from "./models/user.model.js";
import { ProfileModel } from "./models/profile.model.js";
import { MemberModel } from "./models/member.model.js";
import { PostModel } from "./models/post.model.js";

export const gqlResponseSchema = Type.Partial(
    Type.Object({
        data: Type.Any(),
        errors: Type.Any(),
    }),
);

export const createGqlResponseSchema = {
    body: Type.Object(
        {
            query: Type.String(),
            variables: Type.Optional(Type.Record(Type.String(), Type.Any())),
        },
        {
            additionalProperties: false,
        },
    ),
};

const querySchema = new GraphQLObjectType<UserModel, ContextModel>({
    name: 'Query',
    fields: {
        users: {
            type: new GraphQLList(user),
            resolve: async (root, args, { prisma }) => {
                return await prisma.user.findMany();
            }
        },
        user: {
            type: user as GraphQLObjectType,
            args: {
                id: { type: new GraphQLNonNull(UUIDType) },
            },
            resolve: async (root, { id }: UserModel, { prisma }) => {
                return await prisma.user.findUnique({
                    where: { id }
                })
            }
        },
        memberTypes: {
            type: new GraphQLList(member),
            resolve: async (root, args, { prisma }) => {
                return await prisma.memberType.findMany();
            }
        },
        memberType: {
            type: member as GraphQLObjectType,
            args: {
                id: { type: new GraphQLNonNull(memberTypeIdEnum) },
            },
            resolve: async (root, { id }: MemberModel, { prisma }) => {
                return await prisma.memberType.findUnique({
                    where: { id }
                });
            },
        },
        posts: {
            type: new GraphQLList(post),
            resolve: async (root, args, { prisma }) => {
                return await prisma.post.findMany();
            }
        },
        post: {
            type: post as GraphQLObjectType,
            args: {
                id: { type: new GraphQLNonNull(UUIDType) },
            },
            resolve: async (root, { id }: PostModel, { prisma }) => {
                return await prisma.post.findUnique({
                    where: { id },
                });
            }
        },
        profiles: {
            type: new GraphQLList(profile),
            resolve: async (root, args, { prisma }) => {
                return await prisma.profile.findMany();
            }
        },
        profile: {
            type: profile as GraphQLObjectType,
            args: {
                id: { type: new GraphQLNonNull(UUIDType) },
            },
            resolve: async (root, { id }: ProfileModel, { prisma }) => {
                return await prisma.profile.findUnique({
                    where: { id },
                });
            },
        },
    },
});

export const schema = new GraphQLSchema({
    query: querySchema,
});
