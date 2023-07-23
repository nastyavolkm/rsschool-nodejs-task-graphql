import { Type } from '@fastify/type-provider-typebox';
import { GraphQLObjectType, GraphQLSchema, GraphQLList, GraphQLNonNull } from "graphql";
import { member, memberTypeIdEnum } from "./types/member";
import { post } from "./types/post";
import { user } from "./types/user";
import { UUIDType } from "./types/uuid";
import { profile } from "./types/profile";

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

const querySchema = new GraphQLObjectType({
    name: 'Query',
    fields: {
        users: {
            type: new GraphQLList(user),
        },
        user: {
            type: user as GraphQLObjectType,
            args: {
                id: { type: new GraphQLNonNull(UUIDType) },
            },
        },
        memberTypes: {
            type: new GraphQLList(member),
        },
        memberType: {
            type: member as GraphQLObjectType,
            args: {
                id: { type: new GraphQLNonNull(memberTypeIdEnum) },
            },
        },
        posts: {
            type: new GraphQLList(post),
        },
        post: {
            type: post as GraphQLObjectType,
            args: {
                id: { type: new GraphQLNonNull(UUIDType) },
            },
        },
        profiles: {
            type: new GraphQLList(profile),
        },
        profile: {
            type: profile as GraphQLObjectType,
            args: {
                id: { type: new GraphQLNonNull(UUIDType) },
            },
        },
    },
});

export const schema = new GraphQLSchema({
    query: querySchema,
});
