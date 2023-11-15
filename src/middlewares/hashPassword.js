const bcrypt = require("bcrypt");

export async function hashPassword(Request, Response, next) {
  const { password } = Request.body.user;
  const saltRounds = 10;
  const hashPassword = await bcrypt.hash(password, saltRounds);
  Request.body.user.password = hashPassword;
  next();
}
