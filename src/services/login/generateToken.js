import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export async function generateToken(payload) {
  const secret = process.env.SECRET_KEY;
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, { expiresIn: "1h" }, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
}
