import { executeQuery } from "../clients/neo4j.js";
import { emailAlreadyExists } from "../cyphers/user/validationEmail.js";

export async function ensureEmailNotExists(req, res, next) {
  const { email } = req.body.user;
  const error = "Error verifying email";
  const result = await executeQuery(emailAlreadyExists, { email }, error);
  if (result?.records[0]?.get("user.email")) {
    return res.status(400).json({ error: "Email already exists" });
  }
  return next();
}
