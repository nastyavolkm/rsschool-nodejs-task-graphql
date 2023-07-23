import { GraphQLEnumType, GraphQLFloat, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { profile } from "./profile.js";
import { ContextModel } from "../models/context.model.js";
import { MemberModel } from "../models/member.model.js";

export const memberTypeIdEnum = new GraphQLEnumType({
    name: 'MemberTypeId',
    values: {
        'basic': {
            value: 'basic',
        },
        'business': {
            value: 'business',
        },
    },
});

export const member = new GraphQLObjectType<MemberModel, ContextModel>({
    name: 'Member',
    fields: () => ({
        id: {
            type: memberTypeIdEnum,
        },
        discount: { type: new GraphQLNonNull(GraphQLFloat) },
        postsLimitPerMonth: { type: new GraphQLNonNull(GraphQLInt) },
        profiles: {
            type: new GraphQLList(profile),
            resolve: async({ id}, args, { prisma }) => {
                return await prisma.memberType.findMany({
                    where: { id },
                });
            },
        },
    }),
});
