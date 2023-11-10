export const createUser = `CREATE (user:User {id:$id, name: $name, email: $email, password: $password, full_name: $full_name, age: $age, is_active: $is_active}) RETURN user.id`;
