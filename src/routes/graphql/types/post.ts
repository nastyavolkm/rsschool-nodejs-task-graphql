import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { UUIDType } from "./uuid";
import { user } from "./user";

export const post = new GraphQLObjectType({
        name: 'Post',
        fields: () => ({
            id: { type: new GraphQLNonNull(UUIDType)},
            title: { type: new GraphQLNonNull(GraphQLString)},
            content: { type: new GraphQLNonNull(GraphQLString)},
            author: { type: user as GraphQLObjectType },
        }),
    }
);
