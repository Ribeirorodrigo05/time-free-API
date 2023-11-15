import { createUserService } from "../../services/user/createUserService";

class CreateUserController {
  async handle(Request, Response) {
    const { user } = Request.body;
    const result = await createUserService.create(user);
    createUserService.createUserInRedis(result);
    return Response.status(200).send({ message: "User created successfully" });
  }
}

export const createUser = new CreateUserController();
