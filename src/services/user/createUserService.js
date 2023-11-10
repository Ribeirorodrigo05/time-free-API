import { createUser } from "../../cyphers/user/create";
import { User } from "../../models/user";
import { executeWrite } from "../../clients/neo4j";
class CreateUserService {
  async create(data) {
    try {
      const user = new User(data);
      const error = "Error creating user";
      const result = await executeWrite(
        createUser,
        {
          ...user,
        },
        error
      );
      console.log(result);
      return result.records[0].get("user.id");
    } catch (error) {
      console.error(error);
    }
  }
}

export const createUserService = new CreateUserService();
