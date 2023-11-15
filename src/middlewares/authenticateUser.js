import bcrypt from "bcrypt";
import { getUserFromRedis } from "../clients/redis";
export async function authenticateUser(req, res, next) {
  const { email } = req.body;
  const { password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Email or password is invalid" });
  const user = await getUserFromRedis(email);
  if (!user) return res.status(404).json({ error: "User not found" });
  const userPassword = user.password;
  const passwordMatch = await bcrypt.compare(password, userPassword);
  if (!passwordMatch)
    return res.status(401).json({ error: "Email or password is invalid" });
  req.user = user;
  next();
}
