import { GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { UUIDType } from "./uuid.js";
import { user } from "./user.js";
import { member } from "./member.js";
import { ProfileModel } from "../models/profile.model.js";
import { ContextModel } from "../models/context.model.js";

export const profile = new GraphQLObjectType<ProfileModel, ContextModel>({
    name: 'Profile',
    fields: () => ({
        id: { type: new GraphQLNonNull(UUIDType) },
        isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
        yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
        memberType: {
            type: new GraphQLNonNull(member),
            resolve: async ({ memberTypeId }, _args, { prisma }) => {
                return await prisma.memberType.findUnique({
                    where: { id: memberTypeId },
                });
            },
        },
        user: {
            type: user as GraphQLObjectType,
        },
    }),
});
