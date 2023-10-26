import neo4j from 'neo4j-driver';

import dotenv from 'dotenv';

dotenv.config();

export const driver = neo4j.driver(
  process.env.NEO4J_URI,
  neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
);
