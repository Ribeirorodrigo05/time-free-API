import bcrypt from 'bcrypt';
import { error } from 'neo4j-driver';

export async function register(args, context) {
  const session = context.driver.session();
  const { email } = args;
  console.log(email);
  let res;
  try {
    const user = await session.readTransaction((tx) =>
      tx.run(`MATCH (u:User {email: $email}) RETURN u`, { email })
    );

    if (user)
      return {
        status: 'User already exists',
      };
  } catch (e) {
    console.error(e);
  } finally {
    await session.close();
  }

  return res;
}

// const hash = async () => {
//   const password = '1234';
//   const hashpassword = await bcrypt.hash(password, 12);
//   console.log(hashpassword);
//   const validator = await bcrypt.compare(password, hashpassword);
//   console.log(validator);
// };
// hash();
