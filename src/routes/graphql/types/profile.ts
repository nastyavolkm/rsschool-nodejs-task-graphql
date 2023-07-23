import { GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { UUIDType } from "./uuid.js";
import { user } from "./user.js";
import { member } from "./member.js";

export const profile = new GraphQLObjectType({
    name: 'Profile',
    fields: () => ({
        id: { type: new GraphQLNonNull(UUIDType) },
        isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
        yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
        memberType: {
            type: new GraphQLNonNull(member),
        },
        user: {
            type: user as GraphQLObjectType,
        },
    }),
});
