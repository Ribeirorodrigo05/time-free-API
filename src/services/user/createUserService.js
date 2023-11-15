import { createUser } from "../../cyphers/user/create";
import { User } from "../../models/user";
import { executeWrite } from "../../clients/neo4j";
import { registerUserInRedis } from "../../clients/redis";
class CreateUserService {
  async create(data) {
    const user = new User(data);
    const error = "Error creating user";
    const result = await executeWrite(
      createUser,
      {
        ...user,
      },
      error
    );
    return result.records[0].get(0).properties;
  }
  async createUserInRedis(data) {
    registerUserInRedis(data);
  }
}

export const createUserService = new CreateUserService();
