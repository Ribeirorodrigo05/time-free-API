export async function checkUserLogin(args, context) {
  const session = context.driver.session();
  const { email } = args;
  let res;
  try {
    const result = await session.readTransaction((tx) =>
      tx.run(`MATCH (u:User {email: $email }) RETURN u`, { email })
    );
    res = result.records[0].get(0).properties;
    if (!res || res.password !== args.password) {
      res = 'user not found';
    }
  } catch (error) {
    console.error(error);
  } finally {
    await session.close();
  }
  return res;
}
