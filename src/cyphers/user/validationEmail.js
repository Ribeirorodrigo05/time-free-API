export const emailAlreadyExists = `MATCH (user:User {email: $email}) RETURN user.email`;
