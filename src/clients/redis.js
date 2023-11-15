import { Redis } from "ioredis";

import dotenv from "dotenv";
dotenv.config();

export const redis = new Redis({
  host: process.env.REDIS_URI,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});

export async function registerUserInRedis(userData) {
  const redisKey = `user:${userData.email}`;
  const redisValue = JSON.stringify({
    ...userData,
  });
  try {
    await redis.set(redisKey, redisValue);
  } catch (e) {
    console.error(`Cannot possible register user in redis ${e}`);
  }
  return;
}

export async function getUserFromRedis(email) {
  const redisKey = `user:${email}`;
  try {
    const result = await redis.get(redisKey);
    return JSON.parse(result);
  } catch (error) {
    console.error(`Cannot possible get user from redis ${error}`);
  }
}
