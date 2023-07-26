import { GraphQLFloat, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { profile } from "./profile.js";
import { ContextModel } from "../models/context.model.js";
import { MemberModel } from "../models/member.model.js";
import { memberTypeIdEnum } from "../models/member-type-id.enum.js";

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
