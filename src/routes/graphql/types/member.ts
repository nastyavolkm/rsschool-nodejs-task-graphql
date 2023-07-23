import { GraphQLEnumType, GraphQLFloat, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { profile } from "./profile.js";

export const memberTypeIdEnum = new GraphQLEnumType({
    name: 'MemberTypeId',
    values: {
        'BASIC': {
            value: 'BASIC',
        },
        'BUSINESS': {
            value: 'BUSINESS',
        },
    },
});

export const member = new GraphQLObjectType({
    name: 'Member',
    fields: () => ({
            id: { type: memberTypeIdEnum },
            discount: { type: new GraphQLNonNull(GraphQLFloat) },
            postsLimitPerMonth: { type: new GraphQLNonNull(GraphQLInt) },
            profiles: {
                type: new GraphQLList(profile),
            },
    }),
});
