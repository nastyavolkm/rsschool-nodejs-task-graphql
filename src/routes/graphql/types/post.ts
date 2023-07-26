import { GraphQLInputObjectType, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { UUIDType } from "./uuid.js";
import { user } from "./user.js";

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

export const createPostInput = new GraphQLInputObjectType({
    name: 'CreatePostInput',
    fields: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        content: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(UUIDType) },
    },
});

export const changePostInput = new GraphQLInputObjectType({
    name: 'ChangePostInput',
    fields: {
        title: { type: GraphQLString },
        content: { type: GraphQLString },
    },
});
