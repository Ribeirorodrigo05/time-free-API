import validator from "validator";

export function validateUserData(req, res, next) {
  const { name, email, password, is_active } = req.body.user;
  if (!validator.isEmail(email))
    return res.status(400).json({ error: "Invalid email" });
  if (!validator.isAlpha(name, ["pt-BR"]))
    return res.status(400).json({ error: "Invalid name" });
  if (!password.length)
    return res.status(400).json({ error: "Invalid password" });
  if (typeof is_active !== "boolean")
    return res.status(400).json({ error: "Invalid is_active" });
  next();
}
