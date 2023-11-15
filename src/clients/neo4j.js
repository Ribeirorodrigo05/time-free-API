import neo4j from "neo4j-driver";
import dotenv from "dotenv";

dotenv.config();
const driver = neo4j.driver(
  process.env.NEO4J_URI,
  neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
);

export const executeQuery = async (cypher, variables, error) => {
  const session = driver.session();
  let result;
  try {
    result = await session.executeRead((tx) =>
      tx.run(`${cypher}`, { ...variables })
    );
  } catch (e) {
    console.error(`${error} ${e}`);
  } finally {
    await session.close();
  }
  return result;
};

export const executeWrite = async (cypher, variables, error) => {
  const session = driver.session();
  let result;
  try {
    result = await session.executeWrite((tx) =>
      tx.run(cypher, { ...variables })
    );
  } catch (e) {
    console.error(`${error} ${e}`);
  } finally {
    await session.close();
  }

  return result;
};
