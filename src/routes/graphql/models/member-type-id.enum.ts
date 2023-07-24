import { GraphQLEnumType } from "graphql";

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
