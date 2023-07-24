import { Type } from '@fastify/type-provider-typebox';
import { GraphQLObjectType, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLString, GraphQLBoolean } from "graphql";
import { member } from "./types/member.js";
import { changePostInput, createPostInput, post } from "./types/post.js";
import { changeUserInput, createUserInput, user } from "./types/user.js";
import { UUIDType } from "./types/uuid.js";
import { changeProfileInput, createProfileInput, profile } from "./types/profile.js";
import { ContextModel } from "./models/context.model.js";
import { UserInputModel, UserModel } from "./models/user.model.js";
import { ProfileInputModel, ProfileModel } from "./models/profile.model.js";
import { MemberModel } from "./models/member.model.js";
import { PostInputModel, PostModel } from "./models/post.model.js";
import { memberTypeIdEnum } from "./models/member-type-id.enum.js";

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

const mutationSchema = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createUser: {
            type: user as GraphQLObjectType,
            args: {
                dto: { type: createUserInput }
            },
            resolve: async (root, args: { dto: UserInputModel }, { prisma }) => {
                return await prisma.user.create({ data: args.dto });
            },
        },
        createPost: {
            type: post as GraphQLObjectType,
            args: {
                dto: { type: createPostInput }
            },
            resolve: async (root, args: { dto: PostInputModel }, { prisma }) => {
                return await prisma.post.create({ data: args.dto });
            },
        },
        createProfile: {
            type: profile as GraphQLObjectType,
            args: {
                dto: { type: createProfileInput }
            },
            resolve: async (root, args: { dto: ProfileInputModel }, { prisma }) => {
                return await prisma.profile.create({ data: args.dto });
            },
        },
        deleteUser: {
            type: GraphQLBoolean,
            args: {
                id: { type: new GraphQLNonNull(UUIDType) },
            },
            resolve: async (root, { id }: { id: string }, { prisma }) => {
                try {
                    await prisma.user.delete({
                        where: { id }
                    });
                    return true;
                }
                catch {
                    return false;
                }
            },
        },
        deletePost: {
            type: GraphQLBoolean,
            args: {
                id: { type: new GraphQLNonNull(UUIDType) },
            },
            resolve: async (root, { id }: { id: string }, { prisma }) => {
                try {
                    await prisma.post.delete({
                        where: { id }
                    });
                    return true;
                }
                catch {
                    return false;
                }
            },
        },
        deleteProfile: {
            type: GraphQLBoolean,
            args: {
                id: { type: new GraphQLNonNull(UUIDType) },
            },
            resolve: async (root, { id }: { id: string }, { prisma }) => {
                try {
                    await prisma.profile.delete({
                        where: { id }
                    });
                    return true;
                }
                catch {
                    return false;
                }
            },
        },
        changeUser: {
            type: user,
            args: {
                id: { type: new GraphQLNonNull(UUIDType) },
                dto: { type: changeUserInput }
            },
            resolve: async(root, args: { id: string, dto: UserInputModel}, { prisma }) => {
                return await prisma.user.update({
                    where: { id: args.id },
                    data: args.dto,
                });
            },
        },
        changePost: {
            type: post as GraphQLObjectType,
            args: {
                id: { type: new GraphQLNonNull(UUIDType) },
                dto: { type: changePostInput }
            },
            resolve: async(root, args: { id: string, dto: PostInputModel}, { prisma }) => {
                return await prisma.post.update({
                    where: { id: args.id },
                    data: args.dto,
                });
            },
        },
        changeProfile: {
            type: profile as GraphQLObjectType,
            args: {
                id: { type: new GraphQLNonNull(UUIDType) },
                dto: { type: changeProfileInput }
            },
            resolve: async(root, args: { id: string, dto: ProfileInputModel}, { prisma }) => {
                return await prisma.profile.update({
                    where: { id: args.id },
                    data: args.dto,
                });
            },
        },
        subscribeTo: {
            type: user as GraphQLObjectType,
            args: {
                userId: { type: new GraphQLNonNull(UUIDType) },
                authorId: { type: UUIDType },
            }
        },
        unsubscribeFrom: {
            type: GraphQLString,
            args: {
                userId: { type: new GraphQLNonNull(UUIDType) },
                authorId: { type: UUIDType },
            }
        }
    },
});

export const schema = new GraphQLSchema({
    query: querySchema,
    mutation: mutationSchema,
});
