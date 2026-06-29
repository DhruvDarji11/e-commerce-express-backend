import dotenv from "dotenv";
import { StringValue } from "ms";
dotenv.config();

export const env = {
  PORT: process.env.PORT || 3000,

  NODE_ENV: process.env.NODE_ENV || "development",

  MONGO_URI: process.env.MONGO_URI || "",

  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET! as string,

  JWT_ACCESS_EXPIRE:
    (process.env.JWT_ACCESS_EXPIRE as StringValue) || ("15m" as StringValue),

  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "",

  JWT_REFRESH_EXPIRE:
    (process.env.JWT_REFRESH_EXPIRE as StringValue) || ("7d" as StringValue),
};
