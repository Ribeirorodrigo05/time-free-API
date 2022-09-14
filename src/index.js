import neo4j from 'neo4j-driver';
import { Neo4jGraphQL } from '@neo4j/graphql';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

import { createServer } from 'http';
import express from 'express';

import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { typeDefs } from './types';
import { getUser } from './middlewares/authHandler';
import { resolvers } from './resolvers';

const hash = async () => {
  const password = '1234';
  const hashpassword = await bcrypt.hash(password, 12);
  console.log(hashpassword);
  const validator = await bcrypt.compare(password, hashpassword);
  console.log(validator);
};
hash();

dotenv.config();

// config Server
const driver = neo4j.driver(
  process.env.NEO4J_URI,
  neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
);

// create new instance of
const neo4jGraphQL = new Neo4jGraphQL({ typeDefs, resolvers, driver });

(async () => {
  const schema = await neo4jGraphQL.getSchema();

  const server = new ApolloServer({
    schema,
    introspection: true,
    context: ({ req }) => ({
      driver,
      neo4jDatabase: process.env.NEO4J_DATABASE,
      req,
      cypherParams: {
        currentUserId: req?.user?.sub,
      },
    }),
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground({
        endpoint: '/graphql',
      }),
    ],
    // context: async ({ req }) => {
    //   // get the user token from the headers
    //   const token = req.headers.authorization || '';

    //   // try to retrieve a user with the token
    //   await getUser(token);

    //   // optionally block the user
    //   // we could also check user roles/permissions here
    //   // if (!user) throw new AuthenticationError('you must be logged in');

    //   // add the user to the context
    //   return { driver };
    // },
  });

  // Express Server
  const app = express();

  app.use(express.json());

  const httpServer = createServer(app);

  await server.start();

  server.applyMiddleware({ app, path: '/' });

  httpServer.listen({ port: 4001 });

  console.log(
    `⚛ GraphQL server is ready at http://localhost:${
      httpServer.address().port
    }${server.graphqlPath}`
  );
})();
