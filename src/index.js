import express from 'express';
import cors from 'cors';
import { Neo4jGraphQL } from '@neo4j/graphql';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginLandingPageGraphQLPlayground } from '@apollo/server-plugin-landing-page-graphql-playground';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { createServer } from 'http';
import { typeDefs } from './types';
import { resolvers } from './resolvers';
import { driver } from './clients/neo4j';

const app = express();

const neo4jGraphQL = new Neo4jGraphQL({
  typeDefs,
  resolvers,
  driver,
});

(async () => {
  const schema = await neo4jGraphQL.getSchema();
  const httpServer = createServer(app);

  const server = new ApolloServer({
    schema,
    introspection: true,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
  });

  // Express Server

  await server.start();
  app.use(
    '/graphql',
    express.json(),
    cors(),
    expressMiddleware(server, {
      context: async ({ req }) => ({
        token: req.headers.token,
        neo4jDatabase: process.env.NEO4J_DATABASE,
        req,
        cypherParams: {
          currentUserId: req?.user?.sub,
        },
      }),
    })
  );

  httpServer.listen({ port: 3001 }, () =>
    console.log(
      `⚛ GraphQL server is ready at http://localhost:${
        httpServer.address().port
      }/graphql`
    )
  );
})();
