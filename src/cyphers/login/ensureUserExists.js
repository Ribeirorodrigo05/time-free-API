export const verifyUserExists = `MATCH (user:User {email: $email}) RETURN user`;
