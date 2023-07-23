import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema, schema } from './schemas.js';
import { graphql, validate, parse } from 'graphql';
import * as depthLimit from 'graphql-depth-limit';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
    const { prisma } = fastify;
    fastify.route({
        url: '/',
        method: 'POST',
        schema: {
          ...createGqlResponseSchema,
          response: {
            200: gqlResponseSchema,
          },
        },
        async handler(req, res) {
          const { query, variables } = req.body;

          const validationErrors = validate(schema, parse(query), [depthLimit(5)]);

          if (validationErrors.length > 0) {
            void res.send({ data: null, errors: validationErrors });
            return;
          }

          return await graphql({
            schema,
            source: query,
            variableValues: variables,
            contextValue: {
              prisma,
            },
          });
        }
      }
    );
};

export default plugin;
