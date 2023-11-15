import { generateToken } from "../../services/login/generateToken";
class LoginController {
  async handle(Request, Response) {
    const { user } = Request;
    const token = await generateToken({ id: user.id });
    return Response.json({ token });
  }
}

export const loginController = new LoginController();
