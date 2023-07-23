import { GraphQLFloat, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { UUIDType } from "./uuid";
import { post } from "./post";
import { profile } from "./profile";

export const user = new GraphQLObjectType({
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
                type: profile as GraphQLObjectType
            },
            posts: {
                type: new GraphQLList(post)
            },
            userSubscribedTo: {
                type: new GraphQLList(user),
            },
            subscribedToUser: {
                type: new GraphQLList(user),
            },
        }),
    },
);
