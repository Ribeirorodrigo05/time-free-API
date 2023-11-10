import { Request, Response } from "express";
import { createUserService } from "../../services/user/createUserService";

class CreateUserController {
  async handle(Request, Response) {
    const { user } = Request.body;
    const result = await createUserService.create(user);
    return Response.json(result);
  }
}

export const createUser = new CreateUserController();
